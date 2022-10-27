module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts'
  })


BlogPost.associate = (models) => {
  BlogPost.hasMany(models.PostCategory, 
    { foreignKey: 'postId', as: 'posts' })
  BlogPost.belongsTo(models.User, 
    { foreignKey: 'userId', as: 'user' })
}

  return BlogPost;
}

// const { Post } = require('./src/models');
// const results = await Post.findAll();