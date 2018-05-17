const SensorData = require('../models').SensorData;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models/index');

module.exports = {
    create(req, res) {
        return SensorData
            .create({
                sensorId: req.body.sensorId,
                value: req.body.value,
            })
            .then(sensordata => res.status(201).send(sensordata))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return SensorData
            .all()
            .then(sensordata => res.status(200).send(sensordata))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
            return SensorData
                .findById(req.params.sensordataId)
                .then((sensordata) => {
                    if (!sensordata) {
                        return res.status(404).send({
                            message: 'SensorData Not Found',
                        });
                    }
                    return res.status(200).send(sensordata);
                })
                .catch((error) => res.status(400).send(error))
    },
    retrieveavg(req, res){
        // steps voor day week month
        var steps = req.query.steps;
        var start =  req.query.start;
        var end = req.query.end;
        if (steps == "day") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg'],
                            [Sequelize.literal('DATE(`updatedAt`)'), 'date']]
                    ,
                    where: {
                        sensorId: req.params.sensorId,
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('date')// 500 5 min dus x00
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
        else if (steps == "week") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg']]
                    ,
                    where: {
                        sensorId: req.params.sensorId,
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('week(updatedAt)')
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
        //monthname
        else if (steps == "month") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg']]
                    ,
                    where: {
                        sensorId: req.params.sensorId,
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('monthname(updatedAt)')
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
        },
    retrievedepartmentavg(req, res){
        // steps voor day week month
        var departmentId = req.params.departmentId;
        var typeId = req.query.type;
        var steps = req.query.steps;
        var start =  req.query.start;
        var end = req.query.end;
        if (steps == "day") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg'],
                        [Sequelize.literal('DATE(`updatedAt`)'), 'date']]
                    ,
                    where: {
                        sensorId: {
                            [Op.in]: Sequelize.literal('(SELECT id FROM sensors WHERE typeId = ' + typeId + ' AND sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId = ' + departmentId + '))')
                        },
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('date')// 500 5 min dus x00
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
        else if (steps == "week") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg']]
                    ,
                    where: {
                        sensorId: {
                            [Op.in]: Sequelize.literal('(SELECT id FROM sensors WHERE typeId = ' + typeId + ' AND sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId = ' + departmentId + '))')
                        },
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('week(updatedAt)')
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
        //monthname
        else if (steps == "month") {
            return SensorData
                .findAll({
                    attributes:
                        [[db.sequelize.fn('AVG', db.sequelize.col('value')), 'avg']]
                    ,
                    where: {
                        sensorId: {
                            [Op.in]: Sequelize.literal('(SELECT id FROM sensors WHERE typeId = ' + typeId + ' AND sensorNodeId IN (SELECT id FROM sensornodes WHERE departmentId = ' + departmentId + '))')
                        },
                        updatedAt:{
                            [Op.between]: [start, end]
                        },
                    },
                    group: db.sequelize.literal('monthname(updatedAt)')
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => {console.log(error);res.status(400).send(error);});
        }
    }
};