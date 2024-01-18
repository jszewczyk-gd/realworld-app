import { faker } from '@faker-js/faker';
import { BankAccount } from "models";

describe('Bank account settings', () => {

  beforeEach(() => {
    const newUserData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: `user${Date.now()}`,
      password: faker.internet.password()
    };
    const bankAccount = {
      bankName: faker.company.name(),
      routingNumber: faker.string.numeric(9),
      accountNumber: faker.string.numeric(12),
    };
    cy.registerByApi(newUserData.firstName, newUserData.lastName, newUserData.username, newUserData.password, newUserData.password);
    cy.loginByApi(newUserData.username, newUserData.password);
    cy.createBankAccountByApi(bankAccount.accountNumber, bankAccount.bankName, bankAccount.routingNumber)
      .then((data) => {
        cy.wrap(data.body.data.createBankAccount.id).as('existingBankAccountId');
    });
    cy.loginByXstate(newUserData.username, newUserData.password);
    cy.goToBankAccounts();
  });
  context('given new bank account details', () => {
    const newBankAccount = {
      bankName: faker.company.name(),
      routingNumber: faker.string.numeric(9),
      accountNumber: faker.string.numeric(12),
    };
    it('adds new bank account', () => {
      cy.clickCreateBankAccount();
      cy.createBankAccount(newBankAccount.accountNumber, newBankAccount.bankName, newBankAccount.routingNumber).then((newBankAccountRequest) => {
        let newBankAccountId = newBankAccountRequest.response.body.data.createBankAccount.id;
        cy.getBankAccountEntry(newBankAccountId)
          .should('exist');
        cy.database("filter", "bankaccounts", { id: newBankAccountId, bankName: newBankAccount.bankName, routingNumber: newBankAccount.routingNumber, accountNumber: newBankAccount.accountNumber})
          .should('have.length', 1)
      });
    });
  });
  context('given existing bank account', () => {
    it('deletes existing bank account', () => {
      cy.get('@existingBankAccountId').then((existingBankAccountId: any) => {
        cy.deleteBankAccountEntry(existingBankAccountId);
        cy.getBankAccountEntry(existingBankAccountId)
          .should('contain.text', '(Deleted)');
        cy.database("find", "bankaccounts", { id: existingBankAccountId })
          .its('isDeleted')
          .should('be.true');
        });
      });
    });
  });