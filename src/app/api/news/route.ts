import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const sourceId = searchParams.get('sourceId')
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const skip = (page - 1) * limit

  const where: any = {}

  if (category) where.category = category
  if (sourceId) where.sourceId = sourceId
  if (type === 'regulasyon') {
    where.category = { in: ['KVKK', 'GDPR', 'SPK', 'BTK', 'ISO27001', 'NIST'] }
  } else if (type === 'teknoloji') {
    where.category = 'TEKNOLOJI'
  }

  try {
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: { source: { select: { name: true, url: true } } },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({ articles, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
