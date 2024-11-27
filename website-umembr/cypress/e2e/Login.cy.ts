describe('The Login Page', () => {
  it('Render Login', () => {
    cy.visit('/app/login');
  });
  it('Login Failed ', () => {
    cy.visit('/app/login');
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('Test1234*');
    cy.get('.MuiGrid-container > :nth-child(4)').click();
  });
  it('Login Sucesss ', () => {
    cy.visit('/app/login');
    cy.get('#email').type('mauricemiot18@gmail.com');
    cy.get('#password').type('Test1234');
    cy.get('.MuiGrid-container > :nth-child(4)').click();
  });
});

export {};
