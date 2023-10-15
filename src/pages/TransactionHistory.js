import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchTransactions = async () => {
      const db = getDatabase();
      const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_');
      const transactionsRef = ref(db, `users/${sanitizedEmail}/transactions`);

      try {
        const snapshot = await get(transactionsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const transactionArray = Object.values(data);
          setTransactions(transactionArray);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-8 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            transactions.map((transaction, index) => (
              <motion.li
                key={index}
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
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TransactionHistory;
