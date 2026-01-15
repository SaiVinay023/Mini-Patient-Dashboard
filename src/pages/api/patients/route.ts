import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const patients = await prisma.patient.findMany();
        return NextResponse.json(patients, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error retrieving patients', error },
            { status: 500 }
        );
    }      
}