
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET() {
  await connectDB();
  const appointments = await Appointment.find();
  return NextResponse.json(appointments);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newAppointment = await Appointment.create(body);
    return NextResponse.json(newAppointment, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
