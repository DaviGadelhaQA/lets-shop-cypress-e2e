describe('Login Case', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Positive Scenarios', () => {
        beforeEach(() => {
            cy.api_register();
        });

        it('Login successfully', () => {
            cy.api_register();

            cy.get('#userEmail').type(Cypress.env('user_email'));
            cy.get('#userPassword').type(Cypress.env('user_password'));
            cy.get('[name="login"]').click();
            
            cy.url().should('contain', '/dashboard/dash');
        });
    });
});