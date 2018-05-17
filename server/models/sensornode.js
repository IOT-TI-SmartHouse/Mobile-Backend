module.exports = (sequelize, DataTypes) => {
    const SensorNode = sequelize.define('SensorNode', {
        departmentId: DataTypes.INTEGER,
        latitude: DataTypes.DECIMAL,
        longitude: DataTypes.DECIMAL,
        altitude: DataTypes.FLOAT
    });
    SensorNode.associate = (models) => {
        SensorNode.belongsTo(models.Department, {
            foreignKey: 'departmentId',
            onDelete: 'SET NULL',
        });
        SensorNode.hasMany(models.Sensor, {
            foreignKey: 'sensorNodeId',
            as: 'sensors',
        });
    };
    return SensorNode;
};