import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchRSS, scrapeKVKK, scrapeBTK, scrapeSPK, scrapeEDPB } from '@/lib/rss-parser'
import { sendEmail, generateDigestHTML } from '@/lib/email'

export async function GET() {
  try {
    const sources = await prisma.source.findMany({ where: { isActive: true } })
    let totalNew = 0

    for (const source of sources) {
      let articles: any[] = []

      if (source.rssUrl) {
        articles = await fetchRSS(source.rssUrl)
      } else {
        switch (source.name) {
          case 'KVKK':
            articles = await scrapeKVKK()
            break
          case 'BTK':
            articles = await scrapeBTK()
            break
          case 'SPK':
            articles = await scrapeSPK()
            break
          case 'EDPB':
            articles = await scrapeEDPB()
            break
        }
      }

      for (const article of articles) {
        if (!article.url) continue
        try {
          await prisma.article.upsert({
            where: { url: article.url },
            update: {},
            create: {
              title: article.title,
              content: article.content,
              url: article.url,
              imageUrl: article.imageUrl,
              publishedAt: article.publishedAt,
              sourceId: source.id,
              category: source.category,
            },
          })
          totalNew++
        } catch (e) {
          // duplicate skip
        }
      }
    }

    return NextResponse.json({ success: true, totalNew })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}

// Newsletter gönderme endpoint'i (ayrı bir cron ile çalıştırılır)
export async function POST() {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const articles = await prisma.article.findMany({
      where: { createdAt: { gte: oneDayAgo } },
      include: { source: { select: { name: true } } },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    })

    const subscribers = await prisma.subscription.findMany({
      where: { isActive: true, frequency: 'daily' },
    })

    const digestItems = articles.map((a) => ({
      title: a.title,
      url: a.url,
      source: a.source.name,
      category: a.category,
    }))

    const html = generateDigestHTML(digestItems)

    for (const sub of subscribers) {
      await sendEmail({
        to: sub.email,
        subject: `RegNews Günlük Bülten - ${new Date().toLocaleDateString('tr-TR')}`,
        html,
      })
    }

    return NextResponse.json({ success: true, sent: subscribers.length })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Newsletter failed' }, { status: 500 })
  }
}
