'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'display_name'
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
    });
  },

  // id	display_name	email	password	image
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
