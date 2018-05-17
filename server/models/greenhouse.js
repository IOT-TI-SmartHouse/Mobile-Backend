const Sequelize = require('sequelize');
var Global = require('../global');

module.exports = (sequelize, DataTypes) => {
    const Greenhouse = sequelize.define('Greenhouse', {
        name: {
            type: DataTypes.STRING
        },
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
    Greenhouse.associate = (models) => {
        Greenhouse.hasMany(models.Department, {
            foreignKey: 'greenhouseId',
            as: 'departments',
        });
        Greenhouse.belongsToMany(models.User, {
            through: models.GreenhouseUser
        });
    };
    return Greenhouse;
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

function getStatus(instance, sequelize){

    var settings = {};
    var indication = {};

    return sequelize.query(`SELECT settings.typeId, settings.minimum, settings.maximum, settings.departmentId
        FROM settings WHERE settings.userId = ` + Global.userId + ` AND settings.departmentId IN (SELECT id FROM departments
        WHERE greenhouseId = ` + instance.dataValues.id + `);`, { type:Sequelize.QueryTypes.SELECT})
        .then(function(results) {
            for(result of results){
                if(!settings[result.departmentId]){
                    settings[result.departmentId] = {};
                }
                settings[result.departmentId][result.typeId] = result;
            }
        })
        .then(function(){
            // Vervangen als sensordata live binnenkomt
            // return sequelize.query(`SELECT s.typeId, t.type, t.name, t.unit, ROUND( AVG(value),2 ) AS average, d.id AS departmentId
            // FROM sensors s
            // LEFT JOIN types t ON t.id = s.typeId
            // LEFT JOIN sensordata sd ON sd.sensorId = s.id AND sd.updatedAt > NOW() - INTERVAL 15 MINUTE
            // LEFT JOIN sensornodes sn ON sn.id = s.sensorNodeId
            // LEFT JOIN departments d ON d.id = sn.departmentId
            // WHERE s.sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId IN (SELECT id FROM departments WHERE greenhouseID = ` + instance.dataValues.id + `))
            // GROUP BY sn.departmentId, s.typeId;`, { type:Sequelize.QueryTypes.SELECT});
            return sequelize.query(`SELECT s.typeId, t.type, t.name, t.unit, ROUND( AVG(value),2 ) AS average, d.id AS departmentId
            FROM sensors s
            LEFT JOIN types t ON t.id = s.typeId
            LEFT JOIN sensordata sd ON sd.sensorId = s.id
            LEFT JOIN sensornodes sn ON sn.id = s.sensorNodeId
            LEFT JOIN departments d ON d.id = sn.departmentId
            WHERE s.sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId IN (SELECT id FROM departments WHERE greenhouseID = ` + instance.dataValues.id + `))
            GROUP BY sn.departmentId, s.typeId;`, { type:Sequelize.QueryTypes.SELECT});
        })
        .then(function(results){
            for(let result of results) {
                if(settings[result.departmentId]){
                    var avg = result.average;
                    var min = settings[result.departmentId][result.typeId].minimum;
                    var max = settings[result.departmentId][result.typeId].maximum;
                    var range = 0.1 * (max - min);
                    if(avg > (min + range) && avg < (max - range)){
                        if(indication[result.typeId] !== "attention" && indication[result.typeId] !== "bad"){
                            indication[result.typeId] = "good";
                        }
                    }
                    else if((avg >= min && avg <= (min + range)) || (avg >= (max - range) && avg <= max)){
                        if(indication[result.typeId] !== "bad"){
                            indication[result.typeId] = "attention";
                        }
                    }
                    else{
                        indication[result.typeId] = "bad";
                    }
                }
            }
        })
        .then(function(){
            return sequelize.query(`SELECT s.typeId, t.type, t.name, t.unit, ROUND( AVG(value),2 ) AS average
            FROM sensors s
            LEFT JOIN types t ON t.id = s.typeId
            LEFT JOIN sensordata sd ON sd.sensorId = s.id
            WHERE s.sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId IN (SELECT id FROM departments WHERE greenhouseId = ` + instance.dataValues.id + `))
            GROUP BY s.typeId;`, { type:Sequelize.QueryTypes.SELECT});
        })
        .then(function(results) {
            var status = [];
            for(let result of results){
                if(indication[result.typeId]){
                    result.indication = indication[result.typeId];
                }
                else{
                    result.indication = "unknown";
                }
                if(result.average > 999){
                    result.average = Math.round(result.average);
                }
                status.push(result);
            }
            instance.dataValues.status = status;
        });
}