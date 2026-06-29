import Parser from 'rss-parser'
import * as cheerio from 'cheerio'

const parser = new Parser()

interface FetchResult {
  title: string
  content: string | null
  url: string
  imageUrl: string | null
  publishedAt: Date
}

export async function fetchRSS(url: string): Promise<FetchResult[]> {
  try {
    const feed = await parser.parseURL(url)
    return feed.items.map((item) => ({
      title: item.title || 'Başlıksız',
      content: item.contentSnippet || item.content || null,
      url: item.link || '',
      imageUrl: extractImageFromContent(item.content || '') || item.enclosure?.url || null,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    }))
  } catch (error) {
    console.error(`RSS fetch error for ${url}:`, error)
    return []
  }
}

function extractImageFromContent(content: string): string | null {
  const $ = cheerio.load(content)
  const img = $('img').first()
  return img.attr('src') || null
}

export async function scrapeKVKK(): Promise<FetchResult[]> {
  try {
    const res = await fetch('https://www.kvkk.gov.tr/Icerik/2015/Duyurular')
    const html = await res.text()
    const $ = cheerio.load(html)
    const results: FetchResult[] = []

    $('.duyuru-item, .haber-item, .card-item').each((_, el) => {
      const title = $(el).find('h3, h4, a').first().text().trim()
      const link = $(el).find('a').first().attr('href') || ''
      const dateText = $(el).find('.date, .tarih, time').first().text().trim()
      if (title && link) {
        results.push({
          title,
          content: $(el).find('p').first().text().trim() || null,
          url: link.startsWith('http') ? link : `https://www.kvkk.gov.tr${link}`,
          imageUrl: null,
          publishedAt: dateText ? new Date(dateText) : new Date(),
        })
      }
    })
    return results
  } catch (error) {
    console.error('KVKK scrape error:', error)
    return []
  }
}

export async function scrapeBTK(): Promise<FetchResult[]> {
  try {
    const res = await fetch('https://www.btk.gov.tr/')
    const html = await res.text()
    const $ = cheerio.load(html)
    const results: FetchResult[] = []

    $('.haber-item, .news-item, .card, .duyuru').each((_, el) => {
      const title = $(el).find('h3, h4, h5, a').first().text().trim()
      const link = $(el).find('a').first().attr('href') || ''
      const dateText = $(el).find('.date, .tarih, time').first().text().trim()
      if (title && link) {
        results.push({
          title,
          content: $(el).find('p').first().text().trim() || null,
          url: link.startsWith('http') ? link : `https://www.btk.gov.tr${link}`,
          imageUrl: $(el).find('img').first().attr('src') || null,
          publishedAt: dateText ? new Date(dateText) : new Date(),
        })
      }
    })
    return results
  } catch (error) {
    console.error('BTK scrape error:', error)
    return []
  }
}

export async function scrapeSPK(): Promise<FetchResult[]> {
  try {
    const res = await fetch('https://spk.gov.tr/')
    const html = await res.text()
    const $ = cheerio.load(html)
    const results: FetchResult[] = []

    $('.duyuru-item, .haber, .card-item, a[href*="duyuru"]').each((_, el) => {
      const title = $(el).find('h3, h4, h5, span').first().text().trim() || $(el).text().trim()
      const link = $(el).attr('href') || ''
      const dateText = $(el).find('.date, .tarih, time').first().text().trim()
      if (title && link && title.length > 5) {
        results.push({
          title,
          content: null,
          url: link.startsWith('http') ? link : `https://spk.gov.tr${link}`,
          imageUrl: null,
          publishedAt: dateText ? new Date(dateText) : new Date(),
        })
      }
    })
    return results
  } catch (error) {
    console.error('SPK scrape error:', error)
    return []
  }
}

export async function scrapeEDPB(): Promise<FetchResult[]> {
  try {
    const res = await fetch('https://www.edpb.europa.eu/news_en')
    const html = await res.text()
    const $ = cheerio.load(html)
    const results: FetchResult[] = []

    $('.news-item, .teaser, article, .node').each((_, el) => {
      const title = $(el).find('h2, h3, a').first().text().trim()
      const link = $(el).find('a').first().attr('href') || ''
      const dateText = $(el).find('time, .date').first().attr('datetime') || $(el).find('time, .date').first().text().trim()
      if (title && link) {
        results.push({
          title,
          content: $(el).find('p').first().text().trim() || null,
          url: link.startsWith('http') ? link : `https://www.edpb.europa.eu${link}`,
          imageUrl: null,
          publishedAt: dateText ? new Date(dateText) : new Date(),
        })
      }
    })
    return results
  } catch (error) {
    console.error('EDPB scrape error:', error)
    return []
  }
}
