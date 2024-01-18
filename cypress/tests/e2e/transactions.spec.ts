import users from '../../fixtures/users.json';
import { Transaction } from "models";

describe('User transactions', () => {

  beforeEach(() => {
    cy.loginByXstate(users.testuserEmily.username, users.testuserEmily.password);
  });
  context('given a known user', () => {
    it('displays all user personal transactions', () => {
      cy.visit('/personal');
      cy.database("filter", "transactions", { senderId: users.testuserEmily.id })
        .each((transaction: Transaction) => {
          cy.transactionEntryShouldBeDisplayed(transaction.id, transaction.amount, users.testuserEmily.name, undefined)
      });
      cy.database("filter", "transactions", { receiverId: users.testuserEmily.id })
        .each((transaction: Transaction) => {
          cy.transactionEntryShouldBeDisplayed(transaction.id, transaction.amount, undefined, users.testuserEmily.name)
      });
    });
    it('displays user transaction details', () => {
      cy.visit('/personal');
      cy.database("find", "transactions", { senderId: users.testuserEmily.id, receiverId: users.testuserGreta.id })
      .then((transaction: Transaction) => {
        cy.openTransactionDetails(transaction.id);
        cy.transactionDetailsShouldBeDisplayed(transaction, users.testuserEmily, users.testuserGreta);
      });
    });
  });
})