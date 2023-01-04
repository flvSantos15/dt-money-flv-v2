// import { memo } from 'react'
import { useForm } from 'react-hook-form'

import { TransactionsContext } from '@contexts/TransactionsContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { SearchFormContainer } from './styles'

const searchFormSchema = z.object({
	query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

// function SearchFormComponent() {
export function SearchForm() {
	const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
		return context.fetchTransactions
	})

	const {
		register,
		handleSubmit,
		formState: {
			isSubmitting
		}
	} = useForm<SearchFormInputs>({
		resolver: zodResolver(searchFormSchema)
	})

	async function handleSearchTransactions(data: SearchFormInputs) {
		await fetchTransactions(data.query)
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)} >
			<input
				type="text"
				placeholder="Busque por transações"
				{...register('query')}
			/>

			<button type="submit" disabled={isSubmitting}>
				<MagnifyingGlass size={20} />
			</button>
		</SearchFormContainer>
	)
}

// export const SerchForm = memo(SearchFormComponent)
