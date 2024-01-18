// @ts-check
///<reference path="../../global.d.ts" />


Cypress.Commands.add("getDisplayedUsername", () => {
    return cy.getBySel("sidenav-username");
});

Cypress.Commands.add("getDisplayedBalance", () => {
    return cy.getBySel("sidenav-user-balance");
});

Cypress.Commands.add("getDisplayedFullname", () => {
    return cy.getBySel("sidenav-user-full-name");
});

Cypress.Commands.add("getDisplayedAvatar", () => {
    return cy.getBySel("sidenav").find("img").first();
});

Cypress.Commands.add("goToSettings", () => {
    cy.getBySel("sidenav-user-settings").click();
});

Cypress.Commands.add("goToBankAccounts", () => {
    cy.getBySel("sidenav-bankaccounts").click();
});