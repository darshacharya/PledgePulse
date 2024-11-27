import clientPromise from './mongodb'

export async function initializeMongoDB() {
  try {
    const client = await clientPromise
    const db = client.db('office-dashboard')

    // Check if collection exists, if not create it
    const collections = await db.listCollections().toArray()
    if (!collections.some(col => col.name === 'oaths')) {
      await db.createCollection('oaths')
      console.log('Created oaths collection')
    }

    // Insert a test document if collection is empty
    const count = await db.collection('oaths').countDocuments()
    if (count === 0) {
      await db.collection('oaths').insertOne({
        timestamp: new Date(),
        type: 'initial'
      })
      console.log('Inserted initial oath record')
    }

    return true
  } catch (error) {
    console.error('MongoDB initialization error:', error)
    return false
  }
}