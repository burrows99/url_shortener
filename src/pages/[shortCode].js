import { useEffect } from 'react'
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma'

export async function getServerSideProps({ params }) {
  const { shortCode } = params

  try {
    const url = await prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    })

    if (!url) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: url.url,
        permanent: false,
      },
    }
  } catch (error) {
    console.error('Error redirecting:', error)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default function RedirectPage() {
  return null
} 