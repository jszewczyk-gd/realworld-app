// @ts-check
///<reference path="../../global.d.ts" />

import { stripNonDigits } from "./../utils";

Cypress.Commands.add("transactionEntryShouldBeDisplayed", (id, amount, senderName?, receiverName?) => {
    cy.getBySel(`transaction-item-${id}`)
      .should('exist');
    cy.getBySel(`transaction-amount-${id}`)
      .should('exist')
      .then((displayedAmount) => {
        expect(stripNonDigits(displayedAmount.text())).to.contain(amount)
      });
    if(senderName){
        cy.getBySel(`transaction-sender-${id}`)
          .should('exist')
          .contains(senderName);
    }
    if(receiverName){
        cy.getBySel(`transaction-receiver-${id}`)
          .should('exist')
          .contains(receiverName);
    }
});

Cypress.Commands.add("openTransactionDetails", (id) => {
    cy.getBySel(`transaction-item-${id}`)
      .should('exist')
      .dblclick();
});

Cypress.Commands.add("transactionDetailsShouldBeDisplayed", (transaction, sender, receiver) => {
    cy.getBySel(`transaction-detail-header`)
      .should('exist');
    cy.getBySel(`transaction-sender-${transaction.id}`)
      .should('exist')
      .contains(sender.name);
    cy.getBySel(`transaction-receiver-${transaction.id}`)
      .should('exist')
      .contains(receiver.name);
    cy.getBySel(`transaction-description`)
      .should('exist')
      .contains(transaction.description);
    cy.getBySel(`transaction-amount-${transaction.id}`)
      .should('exist')
      .then((displayedAmount) => {
        expect(stripNonDigits(displayedAmount.text())).to.contain(transaction.amount)
      });
});