import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const sources = [
    { name: 'NIST Cybersecurity', url: 'https://www.nist.gov/news-events/cybersecurity/rss.xml', rssUrl: 'https://www.nist.gov/news-events/cybersecurity/rss.xml', category: 'NIST' as const },
    { name: 'NIST IT', url: 'https://www.nist.gov/news-events/information%20technology/rss.xml', rssUrl: 'https://www.nist.gov/news-events/information%20technology/rss.xml', category: 'NIST' as const },
    { name: 'NIST News', url: 'https://www.nist.gov/news-events/news/rss.xml', rssUrl: 'https://www.nist.gov/news-events/news/rss.xml', category: 'NIST' as const },
    { name: 'KVKK', url: 'https://www.kvkk.gov.tr', rssUrl: null, category: 'KVKK' as const },
    { name: 'BTK', url: 'https://www.btk.gov.tr', rssUrl: null, category: 'BTK' as const },
    { name: 'SPK', url: 'https://spk.gov.tr', rssUrl: null, category: 'SPK' as const },
    { name: 'EDPB', url: 'https://www.edpb.europa.eu', rssUrl: null, category: 'GDPR' as const },
    { name: 'ISO27001', url: 'https://advisera.com/rss-feeds/iso-27001.xml', rssUrl: 'https://advisera.com/rss-feeds/iso-27001.xml', category: 'ISO27001' as const },
    { name: 'ShiftDelete.Net', url: 'https://shiftdelete.net/feed', rssUrl: 'https://shiftdelete.net/feed', category: 'TEKNOLOJI' as const },
    { name: 'Webtekno', url: 'http://www.webtekno.com/rss.xml', rssUrl: 'http://www.webtekno.com/rss.xml', category: 'TEKNOLOJI' as const },
    { name: 'DonanımHaber', url: 'https://www.donanimhaber.com/rss/tum/', rssUrl: 'https://www.donanimhaber.com/rss/tum/', category: 'TEKNOLOJI' as const },
    { name: 'Technopat', url: 'https://www.technopat.net/feed/', rssUrl: 'https://www.technopat.net/feed/', category: 'TEKNOLOJI' as const },
    { name: 'ÇözümPark', url: 'https://www.cozumpark.com/feed/', rssUrl: 'https://www.cozumpark.com/feed/', category: 'TEKNOLOJI' as const },
  ]

  for (const source of sources) {
    await prisma.source.upsert({
      where: { name: source.name },
      update: { rssUrl: source.rssUrl, url: source.url, category: source.category },
      create: source,
    })
    console.log(`✓ ${source.name}`)
  }

  console.log('Seed tamamlandı!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
