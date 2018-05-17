module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: DataTypes.STRING,
        admin: DataTypes.INTEGER
    });
    User.associate = (models) => {
        User.belongsToMany(models.Greenhouse, {
            through: models.GreenhouseUser
        });
        User.hasMany(models.Setting, {
            foreignKey: 'userId',
            as: 'settings',
        });
    };
    return User;
};