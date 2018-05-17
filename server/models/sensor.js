const Sequelize = require("sequelize");
var Global = require("../global");

module.exports = (sequelize, DataTypes) => {
  const Sensor = sequelize.define(
    "Sensor",
    {
      sensorNodeId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER
    },
    {
      hooks: {
        afterFind: instances => {
          if (Array.isArray(instances)) {
            const start = async () => {
              await asyncForEach(instances, async instance => {
                return getCurrentValue(instance, sequelize);
              });
            };
            return start();
          } else {
            return getCurrentValue(instances, sequelize);
          }
        }
      }
    }
  );
  Sensor.associate = models => {
    Sensor.belongsTo(models.SensorNode, {
      foreignKey: "sensorNodeId",
      onDelete: "SET NULL"
    });
    Sensor.hasMany(models.SensorData, {
      foreignKey: "sensorId",
      as: "sensordata"
    });
    Sensor.belongsTo(models.Type, {
      foreignKey: "typeId",
      as: "type"
    });
  };
  return Sensor;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getCurrentValue(instance, sequelize) {
  const SensorData = require("../models").SensorData;

  var settings = {};

  return SensorData.findOne({
    where: {
      sensorId: instance.dataValues.id
    },
    order: [["createdAt", "DESC"]],
    limit: 1
  })
    .then(sensordata => {
      if (sensordata) {
        instance.dataValues.latestValue = sensordata.dataValues.value;
        instance.dataValues.latestUpdate = sensordata.dataValues.createdAt;
      }
    })
    .then(function() {
      return sequelize.query(
        "SELECT settings.typeId, settings.minimum, settings.maximum FROM settings WHERE settings.typeId = " +
          instance.dataValues.typeId +
          " AND settings.userId = " +
          Global.userId +
          " AND settings.departmentId = (SELECT departmentId FROM sensornodes WHERE id = " +
          instance.dataValues.sensorNodeId +
          ");",
        { type: Sequelize.QueryTypes.SELECT }
      );
    })
    .then(function(results) {
      if (results.length) {
        var avg = instance.dataValues.latestValue;
        var min = results[0].minimum;
        var max = results[0].maximum;
        var range = 0.1 * (max - min);
        if (avg > min + range && avg < max - range) {
          instance.dataValues.indication = "good";
        } else if (
          (avg >= min && avg <= min + range) ||
          (avg >= max - range && avg <= max)
        ) {
          instance.dataValues.indication = "attention";
        } else {
          instance.dataValues.indication = "bad";
        }
      }
    })
    .catch(error => console.log(error));
}
