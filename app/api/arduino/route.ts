import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await clientPromise
    const db = client.db('office-dashboard')

    await db.collection('arduino_data').insertOne({
      ...data,
      timestamp: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Failed to record Arduino data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('office-dashboard')
    const data = await db.collection('arduino_data')
      .find()
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray()

    return NextResponse.json(data[0] || {})
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Arduino data' },
      { status: 500 }
    )
  }
}