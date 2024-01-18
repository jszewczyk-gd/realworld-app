import { BankAccount } from 'models';
import users from '../../fixtures/users.json'

import { faker } from '@faker-js/faker';

describe('Bank accounts', () => {
  beforeEach(() => {
    cy.loginByApi(users.testuserMark.username, users.testuserMark.password);
  });
  context('given user id', () => {
    it('returns all bank accounts for the user', () => {
      cy.database("filter", "bankaccounts", { userId:  users.testuserMark.id }).then((bankAccountsDb: Array<BankAccount>) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env("apiUrl")}/bankAccounts`,
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('results');
          expect(response.body.results).to.have.length(bankAccountsDb.length)
          response.body.results.forEach((result: any, index: number) => {
            expect(result.id).eq(bankAccountsDb[index].id);
            expect(result.bankName).eq(bankAccountsDb[index].bankName);
            expect(result.routingNumber).eq(bankAccountsDb[index].routingNumber);
            expect(result.accountNumber).eq(bankAccountsDb[index].accountNumber);
          });
        });
      });
    });
  });
  context('given bank account id', () => {
    const bankAccount = {
      bankName: faker.company.name(),
      routingNumber: faker.string.numeric(9),
      accountNumber: faker.string.numeric(12),
    };
    it('deletes bank account', () => {
      cy.createBankAccountByApi(bankAccount.accountNumber, bankAccount.bankName, bankAccount.routingNumber)
      .then((data) => {
        let bankAccountId = data.body.data.createBankAccount.id;
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env("apiUrl")}/bankAccounts/${bankAccountId}`,
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.database("find", "bankaccounts", { id:  bankAccountId })
          .its('isDeleted')
          .should('be.true');
        });
      });
    });
  });
});