
beforeEach('reset search', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.get('#order-option').select('rarasc')
    cy.get('#search-input').clear()
})

describe('Basic load', () => {
        it('successfully loads', () => {
          cy.visit('/') // change URL to match your dev URL
        })
})

describe('Gift displaying', () => {
    it('loads all gifts from the game', () => {
        cy.get('.prezzy-item-wrapper').should('have.length', 100)
    })
})

describe('Selecting a specific gift', () => {
    it('changes selected gift on icon click', () => {
        cy.get('.prezzy-item-wrapper:nth-child(10)').click()
        cy.get('.gift-id').should('have.text', 'N°10')
    })
})

describe('Sorting and filtering', () => {
    it('should be able to sort data', () => {
        cy.get('#order-option').select('Name ↑')
        cy.get('.prezzy-item-wrapper:first-child .prezzy-item').should('have.class', 'prezzy-item_58')
    })
    it('should be able to filter data', () => {
        cy.get('#search-input').type('can')
        cy.get('.prezzy-item-wrapper').should('have.length', 3)
    })
    it('should be able to select a specific gift on a filtered list', () => {
        cy.get('.prezzy-item-wrapper:first-child').click()
        cy.get('.gift-id').should('have.text', 'N°1')
    })
})

describe('Working with mobile devices', () => {
    it('should display correctly on mobile and dialog should work', () => {
        cy.viewport(360, 700)
        cy.get('#giftSheet-result').should('not.be.visible');
        cy.get('.prezzy-item-wrapper:nth-child(10)').click()
        cy.get('#giftSheet-dialog .gift-id').should('have.text', 'N°10')
        cy.get('#giftSheet-dialog').should('be.visible');
        cy.get('[data-cy=dialog-close]').click()
        cy.get('#giftSheet-result').should('not.be.visible');
    })
})