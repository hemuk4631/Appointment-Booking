import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface StepperProps {
  stepList: any[];
}

function Stepper({ stepList }: StepperProps) {
  const { step } = useSelector((state: RootState) => state.booking);

  return (
    <div className="flex justify-between w-full items-center relative">
      {stepList?.map((item, i) => (
        <div key={i} className="relative flex-1 flex items-center gap-4 w-full">
          {/* Circle and Label */}
          <div className="flex flex-col  items-center z-10 w-full">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full  transition-all duration-300 ${item?.id <= step ? 'bg-blue-400' : 'bg-gray-200'
                }`}
            >
              <Image src={item?.img} alt="user-icon" width={24} height={24} className={`${item?.id <= step ? 'invert' : 'invert-0'
                }`} />
            </div>
            <h4 className="text-xs text-gray-600 mt-2 whitespace-nowrap md:block hidden">{item?.title}</h4>
          </div>

          {/* Line (only if not last item) */}
          {i !== stepList.length - 1 && (
            <span
              className={`absolute top-[29%] left-1/2 h-1 w-full -translate-y-1/2 z-0 ${item?.id < step ? 'bg-blue-400' : 'bg-gray-300'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
