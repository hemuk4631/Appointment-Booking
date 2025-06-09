'use client';
import Calender from '@/app/components/Calender';
import Stepper from '@/app/components/Stepper';
import Button from '@/app/components/Button';
import { useDispatch, useSelector } from 'react-redux';

import { InputType } from '@/types/enums';
import {
  setSelectedDate,
  incrementStep,
  decrementStep,
} from '@/store/slices/bookingSlice';
import TimeSlots from './components/TimeSlots';
import Form from './components/Form';
import DetailsCard from './components/detailsCard';
import BookedCard from './components/BookedCard';
const UserIcon = '/profile.svg';
const stepList = [
  {
    id: 1,
    title: 'Select Date',
    img: UserIcon,
  },
  {
    id: 2,
    title: 'Choose Time',
    img: UserIcon,
  },
  {
    id: 3,
    title: 'Your Details',
    img: UserIcon,
  },
  {
    id: 4,
    title: 'Confirmation',
    img: UserIcon,
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
      <div className="rounded-md bg-yellow-50 shadow-md p-10 mt-6 text-center w-2/3 flex items-center flex-col">
        {step === 1 && (
          <>
            <h2>Choose Your Date</h2>
            <h4>Select a date for your appointment</h4>
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
            <div className="mt-6 grid grid-cols-2 gap-4 text-left w-full">
              <Form
                formConst={formConst}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                stepList={stepList}
                span={2}
              />
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h2>Booking Confirmed! ✅</h2>
            <h4>Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.</h4>
            <div className="mt-6 grid grid-cols-2 gap-4 text-left w-full">
              <BookedCard span={2} />
            </div>
          </>
        )}
        {/* <div
          className={`flex ${
            step > 1 ? 'justify-between' : 'justify-end'
          }  w-full items-center mt-10`}
        >
          {step > 1 && step <= stepList?.length && (
            <Button
              btnName={`Back to ${
                stepList?.find((s) => s.id === step - 1)?.title
              }`}
              btnType={'secondary'}
              onClick={handlePrevStep}
            />
          )}
          {(step === 1
            ? selectedDate && step <= stepList?.length
            : selectedTime && step <= stepList?.length) && (
            <Button
              btnName={`Continue to ${
                stepList?.find((s) => s.id === step + 1)?.title
              }`}
              btnType={'primary'}
              onClick={handleNextStep}
            />
          )}
        </div> */}
      </div>
      {/* <div className="px-10 py-4 border border-amber-300 w-2/3 mt-6 rounded-md bg-amber-50 ">`Selected: `</div> */}
    </div>
  );
}
