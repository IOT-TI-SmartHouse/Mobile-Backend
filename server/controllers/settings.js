const Setting = require('../models').Setting;

module.exports = {
    create(req, res) {
        return Setting
            .create({
                userId: req.body.userId,
                departmentId: req.body.departmentId,
                typeId: req.body.typeId,
                minimum: req.body.minimum,
                maximum: req.body.maximum,
            })
            .then(setting => res.status(201).send(setting))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Setting
            .all()
            .then(settings => res.status(200).send(settings))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Setting
            .findById(req.params.settingId)
            .then((setting) => {
            if (!setting) {
                return res.status(404).send({
                    message: 'Setting Not Found',
                });
            }
            return res.status(200).send(setting);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Setting
            .find({
                where: {
                    id: req.params.settingId
                },
            })
            .then(setting => {
                if (!setting) {
                    return res.status(404).send({
                        message: 'Setting Not Found',
                    });
                }

                return setting
                    .update({
                        userId: req.body.userId || sensornode.userId,
                        departmentId: req.body.departmentId || sensornode.departmentId,
                        typeId: req.body.typeId || sensornode.typeId,
                        minimum: req.body.minimum || sensornode.minimum,
                        maximum: req.body.maximum || sensornode.maximum
                    })
                    .then(updatedSetting => res.status(200).send(updatedSetting))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Setting
            .findById(req.params.settingId)
            .then(setting => {
                if (!setting) {
                    return res.status(400).send({
                        message: 'Setting Not Found',
                    });
                }
                return setting
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};