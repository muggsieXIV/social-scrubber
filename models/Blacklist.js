module.exports = function (sequelize, DataTypes) {

    var Blacklist = sequelize.define("Blacklist", {

        authorId : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    Blacklist.associate = function(models) {
        Blacklist.belongsTo(models.User, {foreignKey: {allowNull: false}})
    }

    return Blacklist;
}