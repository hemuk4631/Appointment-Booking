import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

function Stepper({ stepList }) {
  const { step } = useSelector((state) => state.booking);

  return (
    <div className="flex justify-between w-full items-center relative">
      {stepList?.map((item, i) => (
        <div key={i} className="relative flex-1 flex items-center w-full">
          {/* Circle and Label */}
          <div className="flex flex-col items-center z-10 w-full">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${
                item?.id <= step ? 'bg-blue-400' : 'bg-white'
              }`}
            >
              <Image src='/admin.svg' alt="user-icon" width={24} height={24} className={`${
                item?.id <= step ? 'invert-0' : 'invert'
              }`} />
            </div>
            <h4 className="text-sm text-gray-600 mt-2 whitespace-nowrap">{item?.title}</h4>
          </div>

          {/* Line (only if not last item) */}
          {i !== stepList.length - 1 && (
            <span
              className={`absolute top-[29%] left-1/2 h-1 w-full -translate-y-1/2 z-0 ${
                item?.id < step ? 'bg-blue-400' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
