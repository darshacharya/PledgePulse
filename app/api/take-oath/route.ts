import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Define the global io variable if needed
declare global {
  namespace NodeJS {
    interface Global {
      io?: {
        emit: (event: string, data: { count: number }) => void;
      };
    }
  }
}

export async function POST() {
  try {
    const client = await clientPromise; // Use const for client
    const db = client.db('office-dashboard'); // Use const for db

    await db.collection('oaths').insertOne({
      timestamp: new Date()
    });

    const count = await db.collection('oaths').countDocuments(); // Use const for count

    // Emit the event to all connected clients
    if (global.io) {
      global.io.emit('newOath', { count }); // Emit with specific data type
    }

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Oath error:', error);
    return NextResponse.json(
      { error: 'Failed to record oath' },
      { status: 500 }
    );
  }
}