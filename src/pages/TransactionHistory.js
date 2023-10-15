import React from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const transactions = [
  { id: 1, description: 'Groceries', amount: -50 },
  { id: 2, description: 'Salary', amount: 2000 },
  { id: 3, description: 'Dinner', amount: -30 },
];

const TransactionHistory = () => {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.li
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-4 flex items-center space-x-2 ${
                transaction.amount > 0 ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <span className="text-xl flex items-center space-x-2">
                {transaction.amount > 0 ? (
                  <FaMoneyCheckAlt className="text-green-600" />
                ) : (
                  <FaMoneyCheckAlt className="text-red-600" />
                )}
                <span>{transaction.description}</span>
              </span>
              <span
                className={`text-xl ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ${Math.abs(transaction.amount)}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TransactionHistory;
