'use client';
import { InputType } from '@/types/enums';
import React, { useState } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { setAppointment } from '@/store/slices/bookingSlice';
import { useDispatch } from 'react-redux';
import SummeryCard from './SummeryCard';
import { nanoid } from '@reduxjs/toolkit';
function Form({ formConst, stepList, handlePrevStep, handleNextStep }) {
  const dispatch = useDispatch();
  const { step, appointment, selectedDate, selectedTime } = useSelector(
    (state) => state.booking
  );
  const [formData, setFormData] = useState({
    id: nanoid(),
    date: selectedDate,
    time: selectedTime,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    notes: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAppointment(formData));
    await handleNextStep();
    setFormData({});
  };
  console.log(appointment);
  return (
    <>
      {formConst?.map((f, i) => (
        <form key={i} className={`flex flex-col gap-y-1 col-span-${f?.span}`}>
          <label>{f.label}</label>
          {f.type === InputType.select ? (
            <div className="border border-gray-200 rounded-md bg-white  py-2 px-2 w-full">
              <select
                id={f.id}
                className={`w-full  px-2 outline-none`}
                onChange={(e) => handleOnChange(e)}
              >
                {f?.options?.map((op, j) => (
                  <option
                    value={op?.value}
                    key={j}
                    // disabled={Boolean(!op?.value)}
                    defaultValue={''}
                  >
                    {op?.label}
                  </option>
                ))}
              </select>
            </div>
          ) : f.type === InputType.textarea ? (
            <textarea
              className={`border border-gray-200 rounded-md bg-white p-2 w-full`}
              placeholder={f?.placeholder}
              onChange={(e) => handleOnChange(e)}
              id={f.id}
            />
          ) : (
            <input
              type={f?.type}
              className={`border border-gray-200 rounded-md bg-white p-2 w-full`}
              placeholder={f?.placeholder}
              onChange={(e) => handleOnChange(e)}
              id={f.id}
            />
          )}
        </form>
      ))}

      <div className="col-span-2 my-6">
        <SummeryCard formData={formData} />
      </div>
      <div
        className={`flex justify-between w-full items-center mt-10 col-span-2`}
      >
        <Button
          btnName={`Back to ${stepList?.find((s) => s.id === step - 1)?.title}`}
          btnType={'secondary'}
          onClick={handlePrevStep}
        />

        <Button
          type="submit"
          btnName={`Continue to ${
            stepList?.find((s) => s.id === step + 1)?.title
          }`}
          btnType={'primary'}
          onClick={(e) => handleFormSubmit(e)}
        />
      </div>
    </>
  );
}

export default Form;
