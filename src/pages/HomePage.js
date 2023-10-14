import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaMoneyBill, FaCreditCard, FaPlusCircle } from 'react-icons/fa';


function Homepage() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: 0,
  });
  const [bankName, setBankName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  const { user } = useAuth0();

  const fakeTransactions = [
    { id: 1, description: 'Groceries', amount: -50.00 },
    { id: 2, description: 'Paycheck', amount: 2500.00 },
    { id: 3, description: 'Dining out', amount: -30.00 },
    { id: 4, description: 'Online Shopping', amount: -100.00 },
    { id: 5, description: 'Clothes', amount: -75.00 },
  ];

  useEffect(() => {
    setTransactions(fakeTransactions);

    //  total spent and remaining balance
    const spent = fakeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalSpent(spent);
    setRemainingBalance(2500 - spent); // Assuming an initial balance of $2500
  }, []);

  const handleAddTransaction = () => {
    // adding a new transaction
    const newTransactionData = {
      id: transactions.length + 1,
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
    };

    setTransactions([...transactions, newTransactionData]);

    // update the total spent and remaining balance
    setTotalSpent(totalSpent + newTransactionData.amount);
    setRemainingBalance(2500 - (totalSpent + newTransactionData.amount));

    // clear the input fields
    setNewTransaction({ description: '', amount: 0 });
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
            <li key={transaction.id}>
              <div className="flex justify-between">
                <span>{transaction.description}</span>
                <span className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                  {transaction.amount < 0 ? '-$' : '+$'}
                  {Math.abs(transaction.amount).toFixed(2)}
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
          <button onClick={handleAddTransaction} className="p-2 bg-blue-500 text-white rounded-md flex"><FaPlusCircle /> Add</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
