import { nanoid } from 'nanoid'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body
    const shortCode = nanoid(6)

    const shortenedUrl = await prisma.url.create({
      data: {
        url,
        shortCode,
      },
    })

    return res.status(200).json({ shortCode: shortenedUrl.shortCode })
  } catch (error) {
    console.error('Error shortening URL:', error)
    return res.status(500).json({ error: 'Error shortening URL' })
  }
} 