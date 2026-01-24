import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AppointmentModel from '@/models/Appointment';
const Appointment = AppointmentModel as any;
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const appointment = await Appointment.findById(params.id);
  if (!appointment) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

  if (session.user.role?.toLowerCase() !== 'admin' && appointment.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(appointment);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const appointment = await Appointment.findById(params.id);
  if (!appointment) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

  if (session.user.role?.toLowerCase() !== 'admin' && appointment.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const updated = await Appointment.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const appointment = await Appointment.findById(params.id);
  if (!appointment) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

  if (session.user.role?.toLowerCase() !== 'admin' && appointment.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await Appointment.findByIdAndDelete(params.id);
  return new NextResponse(null, { status: 204 });
}
