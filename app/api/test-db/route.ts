import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    // Log the MongoDB URI (remove password for security)
    const uri = process.env.MONGODB_URI || ''
    console.log('MongoDB URI:', uri.replace(/:([^@]+)@/, ':****@'))

    // Try to connect
    console.log('Attempting to connect...')
    const client = await clientPromise
    console.log('Connected successfully')

    // Try to access the database
    const db = client.db('office-dashboard')
    console.log('Database accessed')

    // Try to access the collection
    const collection = db.collection('oaths')
    console.log('Collection accessed')

    // Try to count documents
    const count = await collection.countDocuments()
    console.log('Document count:', count)

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count
    })
  } catch (error: any) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, {
      status: 500
    })
  }
}