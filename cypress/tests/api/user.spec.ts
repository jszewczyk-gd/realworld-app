import { User } from 'models';
import users from '../../fixtures/users.json'

describe('User account', () => {
  beforeEach(() => {
    cy.loginByApi(users.testuser.username, users.testuser.password);
  });
  context('given users username', () => {
    it('returns users profile', () => {
      cy.database("find", "users", { username: users.testuser.username }).then((userDb: User) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env("apiUrl")}/users/profile/${users.testuser.username}`,
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('user');
          expect(response.body.user.firstName).to.eq(userDb.firstName);
          expect(response.body.user.lastName).to.eq(userDb.lastName);
          expect(response.body.user.avatar).to.eq(userDb.avatar);
        });
      });
    });
  });
  context('given the currently logged in user', () => {
    it('returns all users expect the current one', () => {
      cy.database("filter", "users").then((usersDb: Array<User>) => {
        const filteredUsersDb = usersDb.filter((user: User) => user.username !== users.testuser.username);
        cy.request({
          method: 'GET',
          url: `${Cypress.env("apiUrl")}/users`,
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('results');
          expect(response.body.results).to.deep.eq(filteredUsersDb);
        });
      });
    });
  });
});