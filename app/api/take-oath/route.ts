import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// Add type declaration for global io
declare global {
  var io: any // You can replace 'any' with a more specific type if available
}

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db('office-dashboard')

    await db.collection('oaths').insertOne({
      timestamp: new Date()
    })

    const count = await db.collection('oaths').countDocuments()

    // Emit the event to all connected clients
    if (global.io) {
      global.io.emit('newOath', { count })
    }

    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error('Oath error:', error)
    return NextResponse.json(
      { error: 'Failed to record oath' },
      { status: 500 }
    )
  }
}