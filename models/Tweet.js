module.exports = function (sequelize, DataTypes) {

    var Tweet = sequelize.define("Tweet", {

        tweetId : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }, 
            primaryKey: true
        },
        tweetDate: {
            type: DataTypes.DATE
        },
        text : {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    Tweet.associate = function(models) {
        Tweet.hasOne(models.Message, {onDelete: "cascade", foreignKey: {name: "TweetId"}})
        Tweet.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Tweet.belongsTo(models.Contact, {foreignKey: {name: "AuthorId", allowNull: false}})
        Tweet.belongsTo(models.Keyword, {foreignKey: {allowNull: false}})

    }

    return Tweet
}