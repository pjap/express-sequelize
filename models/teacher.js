'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectsId: DataTypes.INTEGER
  });
    Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject,{foreignKey: 'subjectsId'})
  }
  return Teacher;
};
