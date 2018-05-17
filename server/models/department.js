const Sequelize = require('sequelize');
var Global = require('../global');

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        name: DataTypes.STRING,
        greenhouseId: DataTypes.INTEGER,
        sensorSpacingX: DataTypes.FLOAT,
        sensorSpacingY: DataTypes.FLOAT,
        sensorSpacingZ: DataTypes.FLOAT
        }, {
        hooks: {
            afterFind: instances => {
                if (Array.isArray(instances)) {
                    const start = async () => {
                        await asyncForEach(instances, async (instance) => {
                            return getStatus(instance, sequelize);
                        });
                    };
                    return start();
                } else {
                    return getStatus(instances, sequelize);
                }
            }
        }
    });
    Department.associate = (models) => {
        Department.belongsTo(models.Greenhouse, {
            foreignKey: 'greenhouseId',
            onDelete: 'SET NULL',
        });
        Department.hasMany(models.Coordinate, {
            foreignKey: 'departmentId',
            as: 'coordinates',
        });
        Department.hasMany(models.SensorNode, {
            foreignKey: 'departmentId',
            as: 'sensornodes',
        });
    };
    return Department;
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

function getStatus(instance, sequelize){

    var settings = {};

    return sequelize.query(`SELECT settings.typeId, settings.minimum, settings.maximum
        FROM settings, departments WHERE settings.departmentId = ` + instance.dataValues.id + ` AND settings.userId = ` + Global.userId, { type:Sequelize.QueryTypes.SELECT})
        .then(function(results) {
            for(result of results){
                settings[result.typeId] = result;
            }
        })
        .then(function(){
            // Vervangen als sensordata live binnenkomt
            // return sequelize.query(`SELECT s.typeId, t.type, t.name, t.unit, ROUND( AVG(value),2 ) AS average
            // FROM sensors s
            // LEFT JOIN types t ON t.id = s.typeId
            // LEFT JOIN sensordata sd ON sd.sensorId = s.id AND sd.updatedAt > NOW() - INTERVAL 15 MINUTE
            // WHERE s.sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId = ` + instance.dataValues.id + `)
            // GROUP BY s.typeId;`, { type:Sequelize.QueryTypes.SELECT});
            return sequelize.query(`SELECT s.typeId, t.type, t.name, t.unit, ROUND( AVG(value),2 ) AS average
            FROM sensors s
            LEFT JOIN types t ON t.id = s.typeId
            LEFT JOIN sensordata sd ON sd.sensorId = s.id
            WHERE s.sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId = ` + instance.dataValues.id + `)
            GROUP BY s.typeId;`, { type:Sequelize.QueryTypes.SELECT});
        })
        .then(function(results) {
            var status = [];
            for(let result of results){
                result.indication = "unknown";
                if(settings[result.typeId]){
                    var avg = result.average;
                    var min = settings[result.typeId].minimum;
                    var max = settings[result.typeId].maximum;
                    var range = 0.1 * (max - min);
                    if(avg > (min + range) && avg < (max - range)){
                        result.indication = "good";
                    }
                    else if((avg >= min && avg <= (min + range)) || (avg >= (max - range) && avg <= max)){
                        result.indication = "attention";
                    }
                    else{
                        result.indication = "bad";
                    }
                }
                if(result.average > 999){
                    result.average = Math.round(result.average);
                }
                status.push(result);
            }
            instance.dataValues.status = status;
        });
}