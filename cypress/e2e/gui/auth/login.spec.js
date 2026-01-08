describe('Login Case', () => {
    beforeEach(() => {
        cy.visit('/client/#/auth/login');
    });

    context('Positive Scenarios', () => {
        it('Login successfully', () => {
            cy.get('#userEmail').type(Cypress.env('user_email'));
            cy.get('#userPassword').type(Cypress.env('user_password'));
            cy.get('[name="login"]').click();
            
            cy.url().should('contain', '/dashboard/dash');
        });
    });
});