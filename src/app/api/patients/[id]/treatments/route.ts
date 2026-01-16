import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patientId = parseInt(id, 10);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: 'Invalid patient ID' },
        { status: 400 }
      );
    }
    const patient = await prisma.patient.findUnique({
  where: { id: patientId },
});

  if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
    );
}
    const treatments = await prisma.treatment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });
    
    return NextResponse.json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
}
