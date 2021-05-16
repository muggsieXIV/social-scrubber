const bcrypt = require("bcryptjs")
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.prototype.validPassword = function (password) {
    console.log(password)
    console.log(this.password)
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function (models) {
    User.hasMany(models.Keyword, {onDelete: "cascade"});
    User.hasMany(models.Contact, {onDelete: "cascade"});
    User.hasMany(models.Blacklist, {onDelete: "cascade"});
    User.hasMany(models.Message, {onDelete: "cascade"});
    User.hasMany(models.MessageTemplate, {onDelete: "cascade"})
    User.hasMany(models.Tweet, {onDelete: "cascade"})
  };
  return User;
}