import React from 'react'

import { Header } from '../../../src/components/Header/index'

describe('<Header />', () => {
	it('should render', () => {
		// const label = 'Nova Transação'
		cy.mount(<Header />)
		// cy.contains(label)
	})
})
