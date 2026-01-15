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
                },
                log: false
            }).then((response) => {
                window.localStorage.setItem('token', response.body.token);
            });
        },
        {
            validate: () => {
                cy.window().then(win => {
                    expect(win.localStorage.getItem('token')).to.exist;
                })
            },
            cacheAcrossSpecs: true
        }
    )
});

Cypress.Commands.add('addProductToCart', (productId) => {
    cy.request({
        method: 'POST',
        url: '/api/ecom/user/add-to-cart',
        body: {
            productId: productId,
            quantity: 1
        }
    }).then((response) => {
        return response;
    });
});