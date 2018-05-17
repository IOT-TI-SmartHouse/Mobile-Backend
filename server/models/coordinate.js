module.exports = (sequelize, DataTypes) => {
    const Coordinate = sequelize.define('Coordinate', {
        latitude: DataTypes.DECIMAL,
        longitude: DataTypes.DECIMAL,
        departmentId: DataTypes.INTEGER,
        sort: DataTypes.INTEGER
    });
    Coordinate.associate = (models) => {
        Coordinate.belongsTo(models.Department, {
            foreignKey: 'departmentId',
            onDelete: 'SET NULL',
        });
    };
    return Coordinate;
};