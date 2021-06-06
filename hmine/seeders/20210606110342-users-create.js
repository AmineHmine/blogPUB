'use strict';

const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let all_roles =  Array.from(['admin', 'author', 'guest']);
     for (var iter=0; iter<20; iter++){
       let username = faker.internet.userName();
       let email = faker.internet.email();
       let password = faker.internet.password();
       let role = all_roles[Math.floor(Math.random() * all_roles.length)];
       let createdAt = faker.date.recent();
       let updatedAt = faker.date.future();
       await queryInterface.bulkInsert('Users', [{
          username: username,
          email: email,
          password: password,
          role: role,
          createdAt: createdAt,
          updatedAt: updatedAt,
        }], {});
     }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
