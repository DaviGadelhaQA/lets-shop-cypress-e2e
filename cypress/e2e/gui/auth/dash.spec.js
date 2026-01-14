describe('Dashboard Case', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/client/#/dashboard/dash');
    });

    context('Positive Scenarios', () => {
        it('Select a product', () => {
            cy.get('.card').eq(1).contains('Add To Cart').click();
            cy.get('.toast-message')
                .should('be.visible')
                .and('contain', 'Product Added To Cart');
        });
    });
});