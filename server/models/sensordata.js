module.exports = (sequelize, DataTypes) => {
    const SensorData = sequelize.define('SensorData', {
        sensorId: DataTypes.STRING,
        value: DataTypes.DOUBLE
    });
    SensorData.associate = (models) => {
        SensorData.belongsTo(models.Sensor, {
            foreignKey: 'sensorId',
            onDelete: 'SET NULL',
        });
    };
    return SensorData;
};