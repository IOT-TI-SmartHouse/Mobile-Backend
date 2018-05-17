const Greenhouse = require('../models').Greenhouse;
const Department = require('../models').Department;
const Coordinate = require('../models').Coordinate;
const SensorNode = require('../models').SensorNode;
const Sensor = require('../models').Sensor;
const SensorData = require('../models').SensorData;
const User = require('../models').User;
var auth =  require('../auth/authentication');

module.exports = {
    create(req, res) {
        return Greenhouse
            .create({
                name: req.body.name,
            })
            .then(greenhouse => res.status(201).send(greenhouse))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        var token = (req.header('X-Access-Token')) || '';
        var userId = auth.getUserId(token);
        return Greenhouse
            .findAll({
                include: [{
                    model: User,
                    where: { id: userId },
                    attributes: []
                }]
            })
            .then(greenhouses => res.status(200).send(greenhouses))
            .catch(error => {console.log(error);res.status(400).send(error);});
    },
    retrieve(req, res) {
        return Greenhouse
            .findById(req.params.greenhouseId, {
                include: [{
                    model: Department,
                    as: 'departments',
                    separate: true,
                    include: [{
                        model: Coordinate,
                        as: 'coordinates'
                    }]
                }]
            })
            .then((greenhouse) => {
            if (!greenhouse) {
                return res.status(404).send({
                    message: 'Greenhouse Not Found',
                });
            }
            return res.status(200).send(greenhouse);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Greenhouse
            .find({
                where: {
                    id: req.params.greenhouseId
                },
            })
            .then(greenhouse => {
                if (!greenhouse) {
                    return res.status(404).send({
                        message: 'Greenhouse Not Found',
                    });
                }

                return greenhouse
                    .update({
                        name: req.body.name || greenhouse.name
                    })
                    .then(updatedGreenhouse => res.status(200).send(updatedGreenhouse))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Greenhouse
            .findById(req.params.greenhouseId)
            .then(greenhouse => {
                if (!greenhouse) {
                    return res.status(400).send({
                        message: 'Greenhouse Not Found',
                    });
                }
                return greenhouse
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};