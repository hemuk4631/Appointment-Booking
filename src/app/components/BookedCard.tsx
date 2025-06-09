import React from 'react'
import { useSelector } from 'react-redux'
import WhatsNextCard from './WhatsNextCard'
import  Button  from '@/app/components/Button'
function BookedCard({span}) {
const {appointment} = useSelector((state)=> state.booking)
  return (
    <>
       <div className={`col-span-${span} rounded-2xl z-50 border border-green-400`}>
        <h2 className='rounded-t-2xl text-center w-full p-4 bg-green-600 text-white'>Appointment Details</h2>
        <div className='grid grid-cols-2 gap-4 p-4'>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Date</h4>
            <h6>{appointment.date.toLocaleDateString()}</h6>
        </div>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Time</h4>
            <h6>{appointment.time}</h6>
        </div>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Name</h4>
            <h6>{appointment.clientName}</h6>
        </div>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Email</h4>
            <h6>{appointment.clientEmail}</h6>
        </div>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Phone</h4>
            <h6>{appointment.clientPhone}</h6>
        </div>
        <div className='p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Service</h4>
            <h6>{appointment.service}</h6>
        </div>
        <div className='col-span-2 p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Notes</h4>
            <h6>{appointment.notes}</h6>
        </div>
        <div className='col-span-2 p-4 text-start rounded-xl bg-white border border-gray-200'>
            <h4>Appointment Id</h4>
            <h6>{appointment.id}</h6>
        </div>
    </div>
    </div>
   <WhatsNextCard />
   <div
        className={`flex justify-between w-full items-center mt-10 col-span-2`}
      >
        <Button
          btnName={`Download Details`}
          btnType={'secondary'}
        //   onClick={handlePrevStep}
        />
        <Button
          btnName={`Share Details`}
          btnType={'secondary'}
        //   onClick={handlePrevStep}
        />

        <Button
          btnName={`Book Another Appointment`}
          btnType={'primary'}
        //   onClick={(e) => handleFormSubmit(e)}
        />
      </div>
    </>
 
  )
}
export default BookedCard