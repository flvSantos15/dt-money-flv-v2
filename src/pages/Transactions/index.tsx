import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SeachForm'

// eslint-disable-next-line import-helpers/order-imports
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles'

interface ITransactions {
	id: number
	description: string
	type: 'income' | 'outcome'
	category: string
	price: number
	createdAt: string
}

export function Transactions() {
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
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map(transaction => {
							return (
								<tr key={transaction.id}>
									<td width="50%">{transaction.description}</td>
									<td>
										<PriceHighlight variant={transaction.type}>
											{transaction.price}
										</PriceHighlight>
									</td>
									<td>{transaction.category}</td>
									<td>{transaction.createdAt}</td>
								</tr>
							)
						})}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	)
}
