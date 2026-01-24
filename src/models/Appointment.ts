import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: Date;
  time: string;
  service: string;
  notes?: string;
  userId: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    notes: { type: String },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
