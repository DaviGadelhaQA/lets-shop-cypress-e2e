Cypress.Commands.add('api_login', (
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
                window.localStorage.setItem('userId', response.body.userId);
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

Cypress.Commands.add('api_addProductToCart', (productId) => {
    cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        const userId = win.localStorage.getItem('userId');

        cy.request({
            method: 'POST',
            url: '/api/ecom/user/add-to-cart',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                productId: productId,
                quantity: 1,
                userId
            }
        }).then((response) => {
            return response;
        });
    });
});

Cypress.Commands.add('api_getCart', () => {
    return cy.window().then((win) => {
        const token = win.localStorage.getItem('token');

        return cy.request({
            method: 'GET',
            url: '/api/ecom/user/get-cart-products-by-id',
            headers: {
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    });
});

Cypress.Commands.add('api_clearCart', () => {
    cy.api_getCart().then((response) => {
        const products = response.body?.products || [];

        if (!products.length) {
            cy.log('🟢 Cart already empty');
            return;
        }

        products.forEach((product) => {
            cy.request({
                method: 'DELETE',
                url: '/api/ecom/user/remove-from-cart',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: {
                    productId: product.productId
                }
            });
        });
    });
});
