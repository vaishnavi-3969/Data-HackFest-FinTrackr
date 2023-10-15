import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push, remove, get } from 'firebase/database';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaMoneyBill, FaCreditCard, FaPlusCircle, FaTrash } from 'react-icons/fa';

const categoryIcons = {
  Groceries: '🛒',
  Salary: '💰',
  Food: '🍔',
  Shopping: '🛍️',
};

function Homepage() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: 0,
    category: '',
  });
  const [totalSpent, setTotalSpent] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(2500);

  const { user } = useAuth0();

  useEffect(() => {
    // Fetch transactions from Firebase based on the user's email
    const fetchUserTransactions = async () => {
      const db = getDatabase();
      const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_');
      const userTransactionsRef = ref(db, `users/${sanitizedEmail}/transactions`);

      try {
        const snapshot = await get(userTransactionsRef);
        if (snapshot.exists()) {
          const transactionsData = [];
          snapshot.forEach((childSnapshot) => {
            const transaction = childSnapshot.val();
            transactionsData.push(transaction);
          });
          setTransactions(transactionsData);
          updateFinancialOverview(transactionsData);
        }
      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    fetchUserTransactions();
  }, [user.email]);

  const handleAddTransaction = () => {
    const newTransactionData = {
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      timestamp: Date.now(),
    };

    // Send the transaction data to Firebase
    saveTransactionToFirebase(newTransactionData);
  };

  const saveTransactionToFirebase = (transaction) => {
    const db = getDatabase();
    const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_');
    const transactionsRef = ref(db, `users/${sanitizedEmail}/transactions`);

    push(transactionsRef, transaction)
      .then(() => {
        console.log('Transaction data saved to Firebase:', transaction);
        // Update the local state with the new transaction
        setTransactions([...transactions, transaction]);
        updateFinancialOverview([...transactions, transaction]);
        // Clear the input fields
        setNewTransaction({ description: '', amount: 0, category: '' });
      })
      .catch((error) => {
        console.error('Error saving transaction data to Firebase:', error);
      });
  };

  const handleDeleteTransaction = (timestamp) => {
    // Remove the transaction from Firebase and update the local state
    const db = getDatabase();
    const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_');
    const transactionRef = ref(db, `users/${sanitizedEmail}/transactions/${timestamp}`);

    remove(transactionRef)
      .then(() => {
        const updatedTransactions = transactions.filter((transaction) => transaction.timestamp !== timestamp);
        setTransactions(updatedTransactions);
        updateFinancialOverview(updatedTransactions);
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
      });
  };

  const updateFinancialOverview = (updatedTransactions) => {
    // Update the total spent and remaining balance based on the updated transactions
    const spent = updatedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalSpent(spent);
    setRemainingBalance(2500 - spent);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-blue-500 mb-4">Personal Dashboard</h1>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl text-black mb-2">Your Financial Overview</h2>
        <p className="text-gray-700">
          <FaMoneyBill /> Bank: Your Bank Name
          <br />
          <FaCreditCard /> Payment Method: Your Payment Method
          <br />
          <FaMoneyBill /> Total Spent: ${totalSpent.toFixed(2)}
          <br />
          <FaMoneyBill /> Remaining Balance: ${remainingBalance.toFixed(2)}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl text-gray-100 mb-2">Recent Transactions</h2>
        <ul className="divide-y divide-gray-300">
          {transactions.map((transaction) => (
            <li key={transaction.timestamp} className="py-3 flex justify-between items-center">
              <div>
                <span className="text-lg">
                  {categoryIcons[transaction.category]}
                </span>
                <span className="ml-3 text-gray-100">
                  {transaction.description}
                </span>
              </div>
              <div>
                <span className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                  {transaction.amount < 0 ? '-$' : '+$'}
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button onClick={() => handleDeleteTransaction(transaction.timestamp)} className="text-red-500 ml-2">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl text-blue-300 mb-2">Add a Transaction</h2>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className="px-3 py-2 rounded-md w-1/3 text-black border border-gray-300"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
            className="px-3 py-2 rounded-md w-1/4 border border-gray-300"
          />
          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
            className="px-3 py-2 text-black rounded-md w-1/4 border border-gray-300"
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Salary">Salary</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
          </select>
          <button onClick={handleAddTransaction} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            <FaPlusCircle /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
