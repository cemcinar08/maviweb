import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sources = await prisma.source.findMany()
    if (sources.length === 0) {
      return NextResponse.json({ error: 'Önce /api/setup adresini ziyaret edin' }, { status: 400 })
    }

    const dummyArticles = [
      { title: 'KVKK Yeni Veri İhlali Bildirimi Yayınladı', content: 'Kişisel Verileri Koruma Kurumu, yeni bir veri ihlali bildirimi yayınladı. Şirketlerin veri güvenliği önlemlerini artırması gerektiği vurgulandı.', sourceName: 'KVKK', daysAgo: 0 },
      { title: 'BTK\'dan 5G Genişleme Hamlesi', content: 'Bilgi Teknolojileri ve İletişim Kurumu, 5G altyapısının yaygınlaştırılması için yeni bir düzenleme paketi hazırladı.', sourceName: 'BTK', daysAgo: 1 },
      { title: 'SPK Sermaye Piyasalarında Yeni Düzenleme', content: 'Sermaye Piyasası Kurulu, halka arz süreçlerine ilişkin yeni düzenlemeler getirdi. Yeni kurallar önümüzdeki aydan itibaren yürürlüğe girecek.', sourceName: 'SPK', daysAgo: 2 },
      { title: 'GDPR Kapsamında 50 Milyon Euro Ceza', content: 'Avrupa Veri Koruma Kurulu, büyük bir teknoloji şirketine GDPR ihlali nedeniyle 50 milyon euro para cezası verdi.', sourceName: 'EDPB', daysAgo: 0 },
      { title: 'NIST Yeni Kuantum Güvenlik Standardı', content: 'NIST, kuantum bilgisayarlara karşı dirençli kriptografi algoritmaları için yeni bir standart yayınladı.', sourceName: 'NIST Cybersecurity', daysAgo: 3 },
      { title: 'ISO 27001 Belgelendirme Sürecinde Değişiklik', content: 'ISO 27001:2022 geçiş süreci için son tarih yaklaşıyor. Şirketlerin yeni standarda uyum sağlaması gerekiyor.', sourceName: 'ISO27001', daysAgo: 1 },
      { title: 'ShiftDelete: iPhone 17 Tanıtıldı', content: 'Apple, merakla beklenen iPhone 17 serisini resmen tanıttı. Yeni modelde yapay zeka odaklı özellikler öne çıkıyor.', sourceName: 'ShiftDelete.Net', daysAgo: 0 },
      { title: 'Webtekno: Google Pixel 9 İncelemesi', content: 'Google\'ın yeni amiral gemisi Pixel 9, kamera performansı ve yapay zeka özellikleriyle dikkat çekiyor.', sourceName: 'Webtekno', daysAgo: 1 },
      { title: 'DonanımHaber: RTX 5090 Performans Testi', content: 'NVIDIA\'nın yeni nesil ekran kartı RTX 5090, ilk performans testlerinde büyük bir sıçrama yaptı.', sourceName: 'DonanımHaber', daysAgo: 2 },
      { title: 'Technopat: Samsung Galaxy Ring İncelemesi', content: 'Samsung\'un akıllı yüzük formundaki yeni giyilebilir teknolojisi Galaxy Ring, sağlık takibinde yeni bir dönem başlatıyor.', sourceName: 'Technopat', daysAgo: 0 },
    ]

    let count = 0
    for (const dummy of dummyArticles) {
      const source = sources.find(s => s.name === dummy.sourceName)
      if (!source) continue

      const publishedAt = new Date()
      publishedAt.setDate(publishedAt.getDate() - dummy.daysAgo)

      const url = `https://example.com/test-${Date.now()}-${count}`

      await prisma.article.upsert({
        where: { url },
        update: {},
        create: {
          title: dummy.title,
          content: dummy.content,
          url,
          imageUrl: null,
          publishedAt,
          sourceId: source.id,
          category: source.category,
        },
      })
      count++
    }

    return NextResponse.json({ success: true, created: count })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
