import users from '../../fixtures/users.json';
import { User } from "models";

import { faker } from '@faker-js/faker';


describe('User account settings', () => {

  beforeEach(() => {
    cy.loginByXstate(users.testuser.username, users.testuser.password);
  });
  context('given new user settings', () => {
    const newUserSettings = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.string.numeric(9)
    };
    it('updates user settings', () => {
      cy.goToSettings();
      cy.database("find", "users", { username: users.testuser.username }).then((user: User) => {
        cy.userSettingsShouldBeDisplayed(user.firstName, user.lastName, user.email, user.phoneNumber);
      });
      cy.updateUserSettings(newUserSettings.firstName, newUserSettings.lastName, newUserSettings.email, newUserSettings.phoneNumber);
      cy.userSettingsShouldBeDisplayed(newUserSettings.firstName, newUserSettings.lastName, newUserSettings.email, newUserSettings.phoneNumber);
      cy.database("find", "users", { username: users.testuser.username }).then((user: User) => {
        expect(user.firstName).eq(newUserSettings.firstName);
        expect(user.lastName).eq(newUserSettings.lastName);
        expect(user.email).eq(newUserSettings.email);
        expect(user.phoneNumber).eq(newUserSettings.phoneNumber);
      });
    });
  });
})