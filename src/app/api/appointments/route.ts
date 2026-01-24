import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AppointmentModel from '@/models/Appointment';
const Appointment = AppointmentModel;
import { auth } from '@/auth';

export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isAdmin = session.user.role?.toLowerCase() === 'admin';
  const query = isAdmin ? {} : { userId: session.user.id };
  const appointments = await Appointment.find(query);
  return NextResponse.json(appointments);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const newAppointment = await Appointment.create({
      ...body,
      userId: session.user.id,
    });
    return NextResponse.json(newAppointment, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
