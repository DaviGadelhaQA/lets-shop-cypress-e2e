Cypress.Commands.add('login', (
    user = Cypress.env('user_email'),
    password = Cypress.env('user_password')
) => {
    cy.session(
        [user, password],
        () => {
            cy.request({
                method: 'POST',
                url: '/api/ecom/auth/login',
                body: {
                    userEmail: user,
                    userPassword: password
                }
            }).then((response) => {
                window.localStorage.setItem('token', response.body.token);
            });
        },
        {
            validade: () => {
                cy.window().then(win => {
                    expect(win.localStorage.getItem('token')).to.exist;
                })
            },
            cacheAcrossSpecs: true
        }
    )
});