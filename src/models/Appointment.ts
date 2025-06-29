// models/Appointment.ts
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default mongoose.models.Appointment ||
  mongoose.model('Appointment', AppointmentSchema);
