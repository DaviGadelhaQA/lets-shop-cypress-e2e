describe('Cart Case', () => {
    beforeEach(() => {
        cy.login();
        cy.addProductToCart('6964af52c941646b7a919472')
        cy.visit('/client/#/dashboard/cart');
    });

    context('Positive Scenarios', () => {
        it('should display added product in cart', () => {
            cy.get('.cartSection').should('have.length.at.least', 1);

            cy.get('.cartSection')
                .first()
                .within(() => {
                    cy.contains('Automation 8').should('be.visible');
                    cy.contains('1200').should('be.visible');
                });
        });
    });
});