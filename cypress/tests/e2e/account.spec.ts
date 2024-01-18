import users from '../../fixtures/users.json'
import { stripNonDigits } from '../../support/utils';

describe('User account', () => {
  beforeEach(() => {
    cy.loginByXstate(users.testuser.username, users.testuser.password);
    cy.database("find", "users", { username: users.testuser.username }).as('dbUserData');
  });
  context('given a logged in user account', () => {
    it('displays current account details', () => {
      cy.get('@dbUserData').then((dbUserData: any) => {
        cy.getDisplayedFullname()
          .should('contain.text', `${dbUserData.firstName} ${dbUserData.lastName[0]}`);
        cy.getDisplayedAvatar()
          .invoke('attr', 'src')
          .should('eq', dbUserData.avatar);
        cy.getDisplayedUsername()
          .contains(users.testuser.username);
      });
    });
    it('displays current account balance', () => {
      cy.get('@dbUserData').then((dbUserData: any) => {
        cy.getDisplayedBalance().then((balance) => {
          expect(stripNonDigits(balance.text())).to.contain(dbUserData.balance);
        });
      });
    });
  });
})