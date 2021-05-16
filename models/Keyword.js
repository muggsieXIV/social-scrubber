module.exports = function (sequelize, DataTypes) {

    var Keyword = sequelize.define("Keyword", {

        word : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    Keyword.associate = function(models) {
        Keyword.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Keyword.hasMany(models.MessageTemplate, {onDelete: "cascade"})
        Keyword.hasMany(models.Tweet, {onDelete: "cascade"})
        Keyword.hasMany(models.Message, {onDelete: "no action"})
    }

    return Keyword;
}