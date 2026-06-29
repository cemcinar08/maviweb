import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email(),
  frequency: z.enum(['daily', 'weekly']).default('daily'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, frequency } = subscribeSchema.parse(body)

    const existing = await prisma.subscription.findUnique({ where: { email } })
    if (existing) {
      await prisma.subscription.update({
        where: { email },
        data: { isActive: true, frequency },
      })
      return NextResponse.json({ message: 'Abonelik güncellendi' })
    }

    await prisma.subscription.create({
      data: { email, frequency },
    })

    return NextResponse.json({ message: 'Abone olundu' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz email' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  await prisma.subscription.updateMany({
    where: { email },
    data: { isActive: false },
  })

  return NextResponse.json({ message: 'Abonelik iptal edildi' })
}
