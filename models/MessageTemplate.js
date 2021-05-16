module.exports = function (sequelize, DataTypes) {

    var MessageTemplate = sequelize.define("MessageTemplate", {

        shortTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        
        text : {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    MessageTemplate.associate = function(models) {
        MessageTemplate.belongsTo(models.User, {foreignKey: {allowNull: false}});
        MessageTemplate.belongsTo(models.Keyword, {foreignKey: {allowNull: true}})
    }

    return MessageTemplate;
}