import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const appointment = await Appointment.findById(params.id);
  return NextResponse.json(appointment);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Appointment.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Appointment.findByIdAndDelete(params.id);
  return new NextResponse(null, { status: 204 });
}
