import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push, remove, get, query, orderByChild, equalTo } from 'firebase/database';
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
  const [bankName, setBankName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(2500);

  const { user } = useAuth0();

  useEffect(() => {
    // fetch transactions from Firebase based on user's email
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

    // send the transaction data to Firebase
    saveTransactionToFirebase(newTransactionData);
  };

  const saveTransactionToFirebase = (transaction) => {
    const db = getDatabase();
    const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_'); // replace invalid characters
    const transactionsRef = ref(db, `users/${sanitizedEmail}/transactions`);

    push(transactionsRef, transaction)
      .then(() => {
        console.log('Transaction data saved to Firebase:', transaction);
        // update the local state with the new transaction
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
      <p className="text-white mb-4">
        Welcome, <FaUser /> {user.name} ({user.email}), to your personal finance tracker! Keep an eye on your financial health.
      </p>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl text-black mb-2">Your Financial Overview</h2>
        <p className="text-gray-700">
          <FaMoneyBill /> Bank: {bankName}
          <br />
          <FaCreditCard /> Payment Method: {paymentMethod}
          <br />
          <FaMoneyBill /> Total Spent: ${totalSpent.toFixed(2)}
          <br />
          <FaMoneyBill /> Remaining Balance: ${remainingBalance.toFixed(2)}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl text-white mb-2">Recent Transactions</h2>
        <ul className="text-white">
          {transactions.map((transaction) => (
            <li key={transaction.timestamp}>
              <div className="flex justify between">
                <span>
                  {categoryIcons[transaction.category]} {transaction.description}
                </span>
                <span className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                  {transaction.amount < 0 ? '-$' : '+$'}
                  {Math.abs(transaction.amount).toFixed(2)}
                  <button onClick={() => handleDeleteTransaction(transaction.timestamp)} className="text-red-500">
                    <FaTrash />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl text-white mb-2">Add a Transaction</h2>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className="p-2 mr-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
            className="p-2 mr-2 rounded-md"
          />
          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
            className="p-2 mr-2 rounded-md text-black"
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Salary">Salary</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
          </select>
          <button onClick={handleAddTransaction} className="p-2 bg-blue-500 text-white rounded-md flex">
            <FaPlusCircle /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
