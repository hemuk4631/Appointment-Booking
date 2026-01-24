'use client';
import Calender from '@/app/components/Calender';
import Stepper from '@/app/components/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import CalenderIcon from '../../../public/stepper_icons/calendar-line-icon.svg'
import TimeIcon from '../../../public/stepper_icons/clock-timing-icon.svg'
import InfoIcon from '../../../public/stepper_icons/info-circle-line-icon.svg'
import ConfirmIcon from '../../../public/stepper_icons/check-mark-circle-line-icon.svg'

import { InputType } from '@/types/enums';
import {
  setSelectedDate,
  incrementStep,
  decrementStep,
} from '@/store/slices/bookingSlice';
import TimeSlots from './TimeSlots';
import Form from './Form';
import BookedCard from './BookedCard';

const stepList = [
  {
    id: 1,
    title: 'Select Date',
    img: CalenderIcon,
  },
  {
    id: 2,
    title: 'Choose Time',
    img: TimeIcon,
  },
  {
    id: 3,
    title: 'Your Details',
    img: InfoIcon,
  },
  {
    id: 4,
    title: 'Confirmation',
    img: ConfirmIcon,
  },
];
const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
];
const formConst = [
  {
    label: 'Full Name',
    id: 'clientName',
    type: InputType.text,
    placeholder: 'Enter your full name',
  },
  {
    label: 'Email Address',
    id: 'clientEmail',
    type: InputType.email,
    placeholder: 'Enter your email address',
  },
  {
    label: 'Mobile Number',
    id: 'clientPhone',
    type: InputType.number,
    placeholder: 'Enter your mobile number',
  },
  {
    label: 'Service Type',
    id: 'service',
    type: InputType.select,
    placeholder: 'Select',
    options: [
      { label: 'Select', value: '' },
      { label: 'Follow-up Appointment', value: 'Follow-up Appointment' },
      { label: 'Health Check-up', value: 'Health Check-up' },
      { label: 'Therapy Session', value: 'Therapy Session' },
      { label: 'Assessment', value: 'Assessment' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    label: 'Additional Notes (Optional)',
    id: 'notes',
    type: InputType.textarea,
    placeholder: 'Enter...',
    span: 2,
    height: 28,
  },
];

export default function Home() {
  const { step, selectedDate, selectedTime } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const onSelectDate = (date: string) => {
    dispatch(setSelectedDate(date));
  };
  const handleNextStep = () => {
    dispatch(incrementStep());
  };
  const handlePrevStep = () => {
    dispatch(decrementStep());
  };

  return (
    <>
      <div className="flex items-center  flex-col p-12 h-">
        <div className="text-center ">
          <h1>Book Your Appointment</h1>
          <h3>
            Schedule a convenient time that works for you. Our easy booking
            process takes just a few minutes.
          </h3>
        </div>

        <div className="flex  justify-center w-full my-10">
          <Stepper stepList={stepList} />
        </div>
        <div className="rounded-md bg-yellow-50 shadow-md p-10 mt-6 text-center md:w-2/3  flex items-center flex-col">
          {step === 1 && (
            <>
              <h2 className='whitespace-nowrap'>Choose Your Date</h2>
              <h4 className='whitespace-nowrap'>Select a date for your appointment</h4>
              <Calender
                onSelectDate={onSelectDate}
                selectedDate={selectedDate}
                stepList={stepList}
                step={step}
                handleNextStep={handleNextStep}
              />
            </>
          )}
          {step === 2 && (
            <>
              <h2>Select Time</h2>
              <h4>{`Choose an available time slot for ${selectedDate}`}</h4>
              <div className="mt-6">
                <TimeSlots
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  stepList={stepList}
                  step={step}
                  handleNextStep={handleNextStep}
                  handlePrevStep={handlePrevStep}
                  span={5}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Fill Details</h2>
              <div className="mt-6 md:grid md:grid-cols-2 gap-4 text-left w-full">
                <Form
                  formConst={formConst}
                  handleNextStep={handleNextStep}
                  handlePrevStep={handlePrevStep}
                  stepList={stepList}
                />
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h2>Booking Confirmed! ✅</h2>
              <h4>{`Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.`}</h4>
              <div className="mt-6 md:grid md:grid-cols-2 gap-4 text-left w-full">
                <BookedCard span={2} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
