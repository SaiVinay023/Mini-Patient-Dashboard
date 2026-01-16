import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patientId = parseInt(id, 10);

    console.log('Treatments API - Received ID:', id, 'Parsed:', patientId);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: 'Invalid patient ID' },
        { status: 400 }
      );
    }

    const treatments = await prisma.treatment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });

    console.log(`Fetched treatments for patient ${patientId}:`, treatments);
    return NextResponse.json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
}
