import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    console.log('Starting oath count fetch...')  // Debug log

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined')
    }

    console.log('Connecting to MongoDB...')  // Debug log
    const client = await clientPromise
    console.log('Connected to MongoDB')  // Debug log

    const db = client.db('office-dashboard')
    console.log('Accessing database...')  // Debug log

    const count = await db.collection('oaths').countDocuments()
    console.log('Count retrieved:', count)  // Debug log

    return NextResponse.json({ count })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Server Error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })

      return NextResponse.json(
        {
          error: 'Failed to fetch oath count',
          details: error.message,
          type: error.name
        },
        { status: 500 }
      )
    } else {
      console.error('Unexpected error:', error)
      return NextResponse.json(
        {
          error: 'Failed to fetch oath count',
          details: 'An unexpected error occurred'
        },
        { status: 500 }
      )
    }
  }
}