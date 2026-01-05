describe('Register Cases', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    context('Positive Scenario', () => {
        it('Register an user sucessfully', () => {
            const email = `qa_${Date.now()}@test.com`;
            Cypress.env('user_email', email);

            cy.get('#firstName').type('Super');
            cy.get('#lastName').type('QA_BR');

            cy.get('#userEmail').type(email);
            cy.get('#userMobile').type('1111111111');

            cy.get('select.custom-select').select('Student');
            cy.get('input[value="Male"]').click();

            cy.get('#userPassword').type(Cypress.env('user_password'), { log: false });
            cy.get('#confirmPassword').type(Cypress.env('user_password'), { log: false });
            
            cy.get('input[type="checkbox"]').click();
            cy.get('#login').click();
            cy.get('h1.headcolor').should('be.visible').and('contain', 'Account Created Successfully');
        });
    });
});