module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    tableName: 'categories'
  })

  return category;
};






























// const CategoryModel = (sequelize, DataTypes) => {
//   const Category = sequelize.define('Category', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: DataTypes.STRING,
//   }, {
//     tableName: 'categories',
//     timestamps: false,
//   });

//   // Category.associate = (models) => {
//   //   Category.belongsToMany(models.BlogPost,
//   //     { foreignKey: 'categoryId', through: 'post_categories', as: 'posts' }
//   //   );
//   // };
//   return Category;
// };

// module.exports = CategoryModel;