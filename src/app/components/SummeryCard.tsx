'use client';
import React from 'react';
function SummeryCard({formData}) {
  return (
    <div className='bg-blue-400 text-white py-6 rounded-md px-10 text-start'>
      <h2>Appointment Summary</h2>
     <h5>Date: {formData.date.toLocaleDateString()}</h5>
     <h5>Time: {formData.time}</h5>
     <h5>Service: {formData.service}</h5>
    </div>
  );
}

export default SummeryCard;
