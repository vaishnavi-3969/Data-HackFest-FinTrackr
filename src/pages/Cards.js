import React from 'react';

const Cards = ({ title, amount, description }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="mt-2">
        <p className="text-3xl font-semibold text-blue-500">${amount}</p>
      </div>
    </div>
  );
};

export default Cards;
