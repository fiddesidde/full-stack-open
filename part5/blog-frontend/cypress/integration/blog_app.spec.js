describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        let user = {
            name: 'Superuser',
            username: 'root',
            password: 'sekret',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);

        user = {
            name: 'Superduperuser',
            username: 'groot',
            password: 'asket',
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
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'sekret' });
        });

        it('A blog can be created', function () {
            cy.contains('new blog').click();
            cy.get('#title').type('Cypress blog title');
            cy.get('#author').type('Cypress Hill');
            cy.get('#url').type('www.cypress.com');
            cy.contains('create').click();
            cy.contains('Cypress blog title');
            cy.contains("'Cypress blog title' successfully added");
            cy.contains('show');
        });

        describe('and several blogs exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'first blog',
                    author: 'Kalle Ett',
                    url: 'www.1.com',
                    likes: 3,
                });
                cy.createBlog({
                    title: 'second blog',
                    author: 'Kalle Två',
                    url: 'www.2.com',
                    likes: 4,
                });
                cy.contains('Logout').click();
                cy.login({ username: 'groot', password: 'asket' });
                cy.createBlog({
                    title: 'third blog',
                    author: 'Kalle Tre',
                    url: 'www.3.com',
                    likes: 1,
                });
                cy.contains('Logout').click();
                cy.login({ username: 'root', password: 'sekret' });
            });

            it('A blog can be liked', function () {
                cy.contains('second blog').find('button').click();
                cy.contains('Likes: 4');
                cy.contains('like').click();
                cy.contains('Likes: 5');
            });

            it('A blog can be removed', function () {
                cy.contains('second blog').find('button').click();
                cy.contains('second blog').parent().contains('remove').click();
                cy.get('html').should('not.contain', 'second blog');
            });

            it('Another users blog can not be removed', function () {
                cy.contains('third blog').find('button').click();
                cy.contains('third blog')
                    .parent()
                    .find('.del-btn')
                    .should('have.css', 'display', 'none');
                cy.request('http://localhost:3003/api/blogs').then(res => {
                    const id = res.body[2].id;
                    cy.request({
                        method: 'DELETE',
                        url: `http://localhost:3003/api/blogs/${id}`,
                        failOnStatusCode: false,
                    }).should(res => {
                        expect(res.status).to.eq(401);
                    });
                });
            });
            it('Blogs are ordered by likes', function () {
                cy.get('.blog-likes-nr').then(likes => {
                    expect(likes[0]).to.contain(4);
                    expect(likes[1]).to.contain(3);
                    expect(likes[2]).to.contain(1);
                });
            });
        });
    });
});
