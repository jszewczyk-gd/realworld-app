// @ts-check
///<reference path="../../global.d.ts" />


Cypress.Commands.add("updateUserSettings", (firstName, lastName, email, phoneNumber) => {
    cy.getBySel("user-settings-firstName-input")
      .clear()
      .type(firstName);
    cy.getBySel("user-settings-lastName-input")
      .clear()
      .type(lastName);
    cy.getBySel("user-settings-email-input")
      .clear()
      .type(email);
    cy.getBySel("user-settings-phoneNumber-input")
      .clear()
      .type(phoneNumber);

    cy.getBySel("user-settings-submit").click();
});

Cypress.Commands.add("userSettingsShouldBeDisplayed", (firstName, lastName, email, phoneNumber) => {
    cy.getBySel("user-settings-firstName-input")
      .should('contain.value', firstName);
    cy.getBySel("user-settings-lastName-input")
    .should('contain.value', lastName);
    cy.getBySel("user-settings-email-input")
      .should('contain.value', email);
    cy.getBySel("user-settings-phoneNumber-input")
      .should('contain.value', phoneNumber);
});