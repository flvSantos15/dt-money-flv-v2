import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

export interface ITransactions {
	id: number
	description: string
	type: 'income' | 'outcome'
	category: string
	price: number
	createdAt: string
}


interface TransactionContextData {
	transactions: ITransactions[]
}

interface TransactionProviderProps {
	children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<ITransactions[]>([])

	async function handleLoadTransactions() {
		const response = await fetch('http://localhost:3333/transactions')
		const data = await response.json()

		setTransactions(data)
	}

	useEffect(() => {
		handleLoadTransactions()
	}, [])
	return (
		<TransactionsContext.Provider value={{ transactions }}>
			{children}
		</TransactionsContext.Provider>
	)
}

export const useTransactions = () => {
	const context = useContext(TransactionsContext)

	return context
}
