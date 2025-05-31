import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import Driver from '@/lib/models/driver';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
console.log('Received POST request to /api/drivers', req.body);
  await connectToDatabase();

  if (req.method === 'POST') {
    console.log('Received POST request to /api/drivers', req.body);
    const { first_name, last_name, suffix, car_number } = req.body;

    if (first_name !== undefined) {
      const entry = new Driver({ first_name, last_name, suffix, car_number });
      await entry.save();
      return res.status(201).json({ message: 'Driver saved' });
    }

    return res.status(400).json({ error: 'Missing first name' });
  }

  return res.status(405).end(); // Method Not Allowed
}