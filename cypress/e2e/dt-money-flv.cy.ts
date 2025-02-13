/// <reference types="cypress" />

describe('dt-money-flv', () => {
	it('should render', () => {
		cy.visit('/').wait(5000)
	})

	it('should exists a new transaction button', () => {
		cy.contains('Nova transação').wait(5000)
	})

	it('should open the transaction modal', () => {
		cy.get('.transaction-button').click()
		cy.contains('Cadastrar').wait(5000)
	})

	it('should close the transaction modal', () => {
		cy.contains('Cadastrar').wait(5000)
		cy.get('.transaction-close-button').click()
		cy.get('.transaction-close-button').should('not.exist').wait(5000)
	})
})
