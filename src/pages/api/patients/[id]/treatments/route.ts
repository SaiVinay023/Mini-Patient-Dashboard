import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const patientId = parseInt(id as string, 10);

    if (isNaN(patientId)) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    }

    const treatments = await prisma.treatment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });

    console.log(`Fetched treatments for patient ${patientId}:`, treatments);
    return res.status(200).json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return res.status(500).json({ error: 'Failed to fetch treatments' });
  }
}