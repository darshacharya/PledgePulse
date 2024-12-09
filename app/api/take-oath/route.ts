import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Extend the global object to declare io with the correct type
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
    // Use const for client and db
    const client = await clientPromise;
    const db = client.db('office-dashboard');

    // Insert a new oath record
    await db.collection('oaths').insertOne({
      timestamp: new Date(),
    });

    // Get the count of oaths
    const count = await db.collection('oaths').countDocuments();

    // Emit event if global.io exists
    if ((globalThis as any).io) {
      (globalThis as any).io.emit('newOath', { count });
    }
    

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Oath error:', error);

    // Improved error response with details for debugging
    return NextResponse.json(
      { error: 'Failed to record oath', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
