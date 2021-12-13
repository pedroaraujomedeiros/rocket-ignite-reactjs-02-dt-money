import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionContextData {
  transactions: Transaction[],
  createTransaction:  (transaction: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData);


export const TransactionsProvider = ({children}: TransactionsProviderProps) => {
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {

    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post('/transactions',{
      ...transactionInput,
      createdAt: new Date()
    });
    const {transaction} = response.data;
    console.log(transaction);
    setTransactions([...transactions, transaction]);
  }
  
  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {
        children
      }
    </TransactionsContext.Provider>
  )
}

export const useTransactions= () => {
  const context = useContext(TransactionsContext);

  return context;
}