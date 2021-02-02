describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Superuser',
            username: 'root',
            password: 'sekret',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('Login:');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('root');
            cy.get('#password').type('sekret');
            cy.get('#login-btn').click();

            cy.contains('Superuser logged in');
        });

        it('fails with wrong credentials', function () {
            cy.get('#username').type('root');
            cy.get('#password').type('notsekret');
            cy.get('#login-btn').click();

            cy.contains('Wrong username/password');
            cy.get('.error')
                .should('contain', 'Wrong username/password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid');

            cy.get('html').should('not.contain', 'Superuser logged in');
        });
    });
});
