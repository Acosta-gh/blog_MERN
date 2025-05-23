const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Post = require('./post.model')
const Bookmark = require('./bookmark.model');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            len:[1,50],
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"avatar.png",
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'user',
    timestamps: true,
    underscored: true,
})

module.exports = User