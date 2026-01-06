Cypress.Commands.add('api_register', () => {
    const email = `qa_${Date.now()}@test.com`;
    const password = Cypress.env('user_password');
    return cy.fixture('userRegister').then((userData) => {
        return cy.request({
            method: 'POST',
            url: 'https://rahulshettyacademy.com/api/ecom/auth/register',
            body: {
                ...userData,
                userEmail: email,
                userPassword: password,
                confirmPassword: password
            }
        });
    }).then((response) => {
        expect(response.status).to.eq(200);
        Cypress.env('user_email', email);
        Cypress.env('user_password', password);

        return response;
    });
});