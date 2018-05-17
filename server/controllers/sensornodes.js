const SensorNode = require('../models').SensorNode;
const Sensor = require('../models').Sensor;

module.exports = {
    create(req, res) {
        return SensorNode
            .create({
                departmentId: req.body.departmentId,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                altitude: req.body.altitude,
            })
            .then(sensordata => res.status(201).send(sensordata))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return SensorNode
            .findAll({
                include: [{
                    model: Sensor,
                    as: 'sensors',
                }
                ],
            })
            .then(sensornode => res.status(200).send(sensornode))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return SensorNode
            .findById(req.params.sensorNodeId)
            .then((sensornode) => {
            if (!sensornode) {
                return res.status(404).send({
                    message: 'SensorNode Not Found',
                });
            }
            return res.status(200).send(sensornode);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return SensorNode
            .find({
                where: {
                    id: req.params.sensorNodeId
                },
            })
            .then(sensornode => {
                if (!sensornode) {
                    return res.status(404).send({
                        message: 'SensorNode Not Found',
                    });
                }

                return sensornode
                    .update({
                        departmentId: req.body.departmentId || sensornode.departmentId,
                        latitude: req.body.latitude || sensornode.latitude,
                        longitude: req.body.longitude || sensornode.longitude,
                        altitude: req.body.altitude || sensornode.altitude
                    })
                    .then(updatedGreenhouse => res.status(200).send(updatedGreenhouse))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return SensorNode
            .findById(req.params.sensorNodeId)
            .then(sensornode => {
                if (!sensornode) {
                    return res.status(400).send({
                        message: 'SensorNode Not Found',
                    });
                }
                return sensornode
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};