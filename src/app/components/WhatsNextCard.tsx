import { whatsNextConst } from '@/utils/constants';
import React from 'react';

function WhatsNextCard() {
  return (
    <ul className="p-6 bg-blue-300 text-white w-full col-span-2 rounded-xl">
      <header className="text-lg text-white font-semibold">{`What's next?`}</header>
      {whatsNextConst?.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  );
}

export default WhatsNextCard;
