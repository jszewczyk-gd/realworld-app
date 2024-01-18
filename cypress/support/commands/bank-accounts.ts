// @ts-check
///<reference path="../../global.d.ts" />


Cypress.Commands.add("getBankAccountEntry", (id) => {
    return cy.getBySel(`bankaccount-list-item-${id}`);
});


Cypress.Commands.add("clickCreateBankAccount", () => {
    cy.getBySel(`bankaccount-new`)
      .click();
});


Cypress.Commands.add("deleteBankAccountEntry", (id) => {
    cy.getBySel(`bankaccount-list-item-${id}`)
      .find('[data-test="bankaccount-delete"]')
      .first()
      .click();
});


Cypress.Commands.add("createBankAccount", (accountNumber, bankName, routingNumber) => {
    cy.intercept("POST", "/graphql").as("bankAccount");
    
    cy.getBySel(`bankaccount-bankName-input`)
      .find("input")
      .first()
      .type(bankName);
    cy.getBySel(`bankaccount-routingNumber-input`)
      .find("input")
      .first()
      .type(routingNumber);
    cy.getBySel(`bankaccount-accountNumber-input`)
      .find("input")
      .first()
      .type(accountNumber);

    cy.getBySel("bankaccount-submit")
      .click();

    return cy.wait("@bankAccount");
});
