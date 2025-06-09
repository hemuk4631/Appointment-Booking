import React from 'react';

function Button({ type, onClick, btnType, btnName, className }) {
    const primaryClass= btnType === 'primary'? 'bg-blue-500 text-white': btnType === 'secondary'? 'bg-yellow-50 text-black border border-yellow-200': ''
  return (

      <button
        type={type || 'button'}
        onClick={onClick}
        className= {`${primaryClass} py-2 px-10 rounded-md ${className} cursor-pointer`}
      >
        {btnName || 'Button'}
      </button>
  );
}

export default Button;
