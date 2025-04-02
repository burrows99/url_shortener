import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Copy, Link } from 'lucide-react'

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
})

export default function Home() {
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(urlSchema),
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      setShortUrl(`${window.location.origin}/${result.shortCode}`)
      reset()
    } catch (error) {
      console.error('Error shortening URL:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">URL Shortener</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <input
              {...register('url')}
              type="url"
              placeholder="Enter your URL"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url.message}</p>
          )}
        </form>

        {shortUrl && (
          <div className="p-4 bg-gray-100 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {shortUrl}
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
