module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
        name: DataTypes.STRING,
        unit: DataTypes.STRING,
        type: DataTypes.STRING
    });
    Type.associate = (models) => {
        // Type.hasMany(models.Sensor, {
        //     foreignKey: 'typeId',
        //     as: 'sensors',
        // });

        Type.hasMany(models.Setting, {
            foreignKey: 'typeId',
            as: 'settings',
        });
    };
    return Type;
};