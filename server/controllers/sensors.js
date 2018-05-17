const Sensor = require('../models').Sensor;
const Type = require('../models').Type;
const SensorNode = require('../models').SensorNode;

module.exports = {
    create(req, res) {
        return Sensor
            .create({
                sensorNodeId: req.body.sensorNodeId,
                typeId: req.body.typeId,
            })
            .then(sensor => res.status(201).send(sensor))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Sensor
            .findAll({
                include: [
                    {
                        model: Type,
                        as: 'type',
                    }
                ]
            })
            .then(sensor => res.status(200).send(sensor))
            .catch(error => {console.log(error);res.status(400).send(error)});
    },
    retrieve(req, res) {
        return Sensor
            .findById(req.params.sensorId,{
                include: [
                    {
                        model: Type,
                        as: 'type',
                    }
                ]
            })
            .then((sensor) => {
            if (!sensor) {
                return res.status(404).send({
                    message: 'Sensor Not Found',
                });
            }
            return res.status(200).send(sensor);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Sensor
            .find({
                where: {
                    id: req.params.sensorId
                },
            })
            .then(sensor => {
                if (!sensor) {
                    return res.status(404).send({
                        message: 'Sensor Not Found',
                    });
                }

                return sensor
                    .update({
                        sensorNodeId: req.body.sensorNodeId || sensor.sensorNodeId,
                        typeId: req.body.typeId || sensor.typeId,
                    })
                    .then(updatedGreenhouse => res.status(200).send(updatedGreenhouse))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return SensorNode
            .findById(req.params.sensorId)
            .then(sensor => {
                if (!sensor) {
                    return res.status(400).send({
                        message: 'Sensor Not Found',
                    });
                }
                return sensor
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};