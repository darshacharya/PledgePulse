import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Extend the Window interface to include the io variable
declare global {
  interface Window {
    io?: {
      emit: (event: string, data: { count: number }) => void; // Specify a more specific type for data
    };
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
    if (window.io) {
      window.io.emit('newOath', { count }); // Emit with specific data type
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