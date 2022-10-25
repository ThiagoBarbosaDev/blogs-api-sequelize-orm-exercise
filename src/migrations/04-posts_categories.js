'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'post_id',
        references: {
          key: 'id',
          model: 'blog_posts'
        }
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'category_id',
        references: {
          key: 'id',
          model: 'categories'
        }
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('posts_categories');
  }
};
