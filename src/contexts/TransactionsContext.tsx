import { createContext, useContext, ReactNode, useEffect, useState, useMemo } from 'react'

import { api } from '../lib/axios'

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
	fetchTransactions: (query?: string) => void
}

interface TransactionProviderProps {
	children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<ITransactions[]>([])

	async function fetchTransactions(query?: string) {
		const { data } = await api.get('/transactions', {
			params: {
				q: query
			}
		})

		setTransactions(data)
	}

	useEffect(() => {
		fetchTransactions()
	}, [])

	const contextValues = useMemo(() => ({
		transactions,
		fetchTransactions
	}), [transactions, fetchTransactions])

	return (
		<TransactionsContext.Provider value={contextValues}>
			{children}
		</TransactionsContext.Provider>
	)
}

export const useTransactions = () => {
	const context = useContext(TransactionsContext)

	return context
}
