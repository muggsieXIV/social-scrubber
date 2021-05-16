

module.exports = function (sequelize, DataTypes) {

    var Contact = sequelize.define("Contact", {

        authorId : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        responded: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        successful: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        imgUrl : {
            type: DataTypes.STRING
        }
    })

    Contact.associate = function(models) {
        Contact.hasMany(models.Tweet, {onDelete: "cascade", foreignKey: {name: "AuthorId"}})
        Contact.hasMany(models.Message, {onDelete: "cascade", foreignKey: {name: "AuthorId"}})
        Contact.belongsTo(models.User, {foreignKey: {allowNull: false} })
    }

    return Contact
}