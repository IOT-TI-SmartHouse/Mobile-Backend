const Department = require('../models').Department;
const SensorNode = require('../models').SensorNode;
const Sensor = require('../models').Sensor;
const Type = require('../models').Type;
const Coordinate = require('../models').Coordinate;

module.exports = {
    create(req, res) {
        return Department
            .create({
                name: req.body.name,
                greenhouseId: req.body.greenhouseId,
                sensorSpacingX: req.body.sensorSpacingX,
                sensorSpacingY: req.body.sensorSpacingY,
                sensorSpacingZ: req.body.sensorSpacingZ,
            })
            .then(department => res.status(201).send(department))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Department
            .findAll({
                include: [{
                    model: SensorNode,
                    as: 'sensornodes',
                }
                ],
            })
            .then(departments => res.status(200).send(departments))
            .catch(error => {console.log(error);res.status(400).send(error);});
    },
    retrieve(req, res) {
        return Department
            .findById(req.params.departmentId, {
                include: [{
                    model: SensorNode,
                    as: 'sensornodes',
                    include: [{
                        model: Sensor,
                        as: 'sensors',
                        separate: true,
                        include: [{
                            model: Type,
                            as: 'type'
                        }]
                    }]},
                    {
                        model: Coordinate,
                        as: 'coordinates',
                    }
                ],
                order: [
                    [{model: Coordinate, as: 'coordinates'}, 'sort', 'ASC'],
                ]
            })
            .then((department) => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }
                return res.status(200).send(department);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return Department
            .find({
                where: {
                    id: req.params.departmentId
                },
            })
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }

                return department
                    .update({
                        name: req.body.name || department.name
                    })
                    .then(updatedDepartment => res.status(200).send(updatedDepartment))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Department
            .findById(req.params.departmentId)
            .then(department => {
                if (!department) {
                    return res.status(400).send({
                        message: 'Department Not Found',
                    });
                }
                return department
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};