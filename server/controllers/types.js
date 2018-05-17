const Type = require('../models').Type;

module.exports = {
    create(req, res) {
        return Type
            .create({
                name: req.body.name,
                unit: req.body.unit,
                type: req.body.type,
            })
            .then(type => res.status(201).send(type))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Type
            .all()
            .then(types => res.status(200).send(types))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Type
            .findById(req.params.typeId)
            .then((type) => {
            if (!type) {
                return res.status(404).send({
                    message: 'Type Not Found',
                });
            }
            return res.status(200).send(type);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Type
            .find({
                where: {
                    id: req.params.typeId
                },
            })
            .then(type => {
                if (!type) {
                    return res.status(404).send({
                        message: 'Type Not Found',
                    });
                }

                return Type
                    .update({
                        name: req.body.name || sensornode.name,
                        unit: req.body.unit || sensornode.unit,
                        type: req.body.type || sensornode.type
                    })
                    .then(updatedType => res.status(200).send(updatedType))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Type
            .findById(req.params.typeId)
            .then(type => {
                if (!type) {
                    return res.status(400).send({
                        message: 'Type Not Found',
                    });
                }
                return type
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};