'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      fullName: function() {
        return this.first_name + this.last_name
      }
    }
  });
  return Student;
};
