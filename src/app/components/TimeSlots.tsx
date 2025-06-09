'use client';
import { setSelectedTime } from '@/store/slices/bookingSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
function TimeSlots({
  timeSlots,
  selectedTime,
  stepList,
  step,
  handleNextStep,
  handlePrevStep,
  span,
}) {
  const dispatch = useDispatch();
  const onSelectTime = (time) => {
    dispatch(setSelectedTime(time));
  };
  return (
    <>
      <div className="grid grid-cols-5 gap-5">
        {timeSlots?.map((t: string, i: number) => (
          <div
            key={i}
            className={`p-2 rounded-md bg-amber-100 cursor-pointer  ${
              t === selectedTime
                ? 'bg-blue-400 text-white'
                : 'hover:bg-blue-100'
            }`}
            onClick={() => onSelectTime(t)}
          >
            {t}
          </div>
        ))}
      </div>

      <div
        className={`flex justify-between w-full items-center mt-10 col-span-${span}`}
      >
        <Button
          btnName={`Back to ${stepList?.find((s) => s.id === step - 1)?.title}`}
          btnType={'secondary'}
          onClick={handlePrevStep}
        />

        <Button
          btnName={`Continue to ${
            stepList?.find((s) => s.id === step + 1)?.title
          }`}
          btnType={'primary'}
          onClick={handleNextStep}
        />
      </div>
    </>
  );
}

export default TimeSlots;
