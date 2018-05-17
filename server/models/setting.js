module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define('Setting', {
        userId: DataTypes.INTEGER,
        departmentId: DataTypes.INTEGER,
        typeId: DataTypes.INTEGER,
        minimum: DataTypes.FLOAT,
        maximum: DataTypes.FLOAT
    });
    Setting.associate = (models) => {
        Setting.hasOne(models.User, {
            foreignKey: 'id',
            as: 'SET NULL',
        });
        Setting.hasOne(models.Department, {
            foreignKey: 'id',
            onDelete: 'SET NULL',
        });
        Setting.hasOne(models.Type, {
            foreignKey: 'id',
            onDelete: 'SET NULL',
        });
    };
    return Setting;
};