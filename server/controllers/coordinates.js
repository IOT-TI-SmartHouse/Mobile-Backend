const Coordinate = require('../models').Coordinate;

module.exports = {
    create(req, res) {
        return Coordinate
            .create({
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                departmentId: req.body.departmentId,
                sort: req.body.sort,
            })
            .then(sensordata => res.status(201).send(sensordata))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Coordinate
            .all()
            .then(coordinates => res.status(200).send(coordinates))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Coordinate
            .findById(req.params.coordinateId)
            .then((coordinate) => {
            if (!coordinate) {
                return res.status(404).send({
                    message: 'Coordinate Not Found',
                });
            }
            return res.status(200).send(coordinate);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Coordinate
            .find({
                where: {
                    id: req.params.coordinateId
                },
            })
            .then(coordinate => {
                if (!coordinate) {
                    return res.status(404).send({
                        message: 'Coordinate Not Found',
                    });
                }

                return coordinate
                    .update({
                        latitude: req.body.latitude || sensornode.latitude,
                        longitude: req.body.longitude || sensornode.longitude,
                        departmentId: req.body.departmentId || sensornode.departmentId,
                        sort: req.body.sort || sensornode.sort
                    })
                    .then(updatedCoordinate => res.status(200).send(updatedCoordinate))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Coordinate
            .findById(req.params.coordinateId)
            .then(coordinate => {
                if (!coordinate) {
                    return res.status(400).send({
                        message: 'Coordinate Not Found',
                    });
                }
                return coordinate
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};