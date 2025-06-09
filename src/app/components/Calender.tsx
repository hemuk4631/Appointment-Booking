'use client';

import { DayPicker } from 'react-day-picker';

import 'react-day-picker/style.css';
import Button from './Button';
export default function Calender({
  onSelectDate,
  selectedDate,
  stepList,
  step,
  handleNextStep,
}) {
  return (
    <>
      <DayPicker
        animate
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        modifiersClassNames={{
          selected: 'bg-blue-500 text-white rounded-full border-none p-[1px]',
          today: 'border border-amber-500 rounded-full',
        }}
        footer={
          selectedDate
            ? `Selected: ${selectedDate.toLocaleDateString()}`
            : 'Pick a day.'
        }
      />
      {selectedDate && (
        <div className={`flex justify-center w-full items-center mt-10`}>
          <Button
            btnName={`Continue to ${
              stepList?.find((s) => s.id === step + 1)?.title
            }`}
            btnType={'primary'}
            onClick={handleNextStep}
          />
        </div>
      )}
    </>
  );
}
