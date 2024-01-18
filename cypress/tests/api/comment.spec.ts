import { Transaction } from 'models';
import users from '../../fixtures/users.json'
import { faker } from '@faker-js/faker';

describe('Transaction comment', () => {
  beforeEach(() => {
    cy.loginByApi(users.testuserEmily.username, users.testuserEmily.password);
  });
  context('given transaction id', () => {
    it('creates transaction comment', () => {
      const newComment = `${faker.lorem.sentence(64)} ${Date.now()}`;
      cy.database("find", "transactions", { receiverId: users.testuserEmily.id }).then((transactionDb: Transaction) => {
        cy.request({
          method: 'POST',
          body: {content: newComment},
          url: `${Cypress.env("apiUrl")}/comments/${transactionDb.id}`,
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.database("filter", "comments", { userId: users.testuserEmily.id, content: newComment, transactionId : transactionDb.id})
            .should('have.length', 1);
        });
      });
    });
  });
});