const greenhousesController = require('../controllers').greenhouses;
const departmentsController = require('../controllers').departments;
const sensordataController = require('../controllers').sensordata;
const sensornodesController = require('../controllers').sensornodes;
const usersController = require('../controllers').users;
const sensorsController = require('../controllers').sensors;
const coordinatesController = require('../controllers').coordinates;
const settingsController = require('../controllers').settings;
const typesController = require('../controllers').types;

var auth =  require('../auth/authentication');
module.exports = (app) => {

    app.all(new RegExp("[^(\/login)]"), function (req, res, next) {

        console.log("VALIDATE TOKEN")

        var token = (req.header('X-Access-Token')) || '';

        auth.decodeToken(token, function (err, payload) {
            if (err) {
                console.log('Error handler: ' + err.message);
                res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
            } else {
                next();
            }
        });
    });

    app.post('/login', usersController.login);
    app.post('/user', usersController.create);
    app.get('/user', usersController.list);

    app.get('', (req, res) => res.status(200).send({
        message: 'Welcome to the Smart Gardening API!',
    }));

    app.post('/greenhouse', greenhousesController.create);
    app.get('/greenhouse', greenhousesController.list);
    app.get('/greenhouse/:greenhouseId', greenhousesController.retrieve);
    app.put('/greenhouse/:greenhouseId', greenhousesController.update);
    app.delete('/greenhouse/:greenhouseId', greenhousesController.destroy);

    app.post('/department', departmentsController.create);
    app.get('/department', departmentsController.list);
    app.get('/department/:departmentId', departmentsController.retrieve);
    app.put('/department/:departmentId', departmentsController.update);
    app.delete('/department/:departmentId', departmentsController.destroy);

    app.post('/sensordata', sensordataController.create);
    app.get('/sensordata', sensordataController.list);
    app.get('/sensordata/:sensordataId', sensordataController.retrieve);
    app.get('/sensordata/avg/:sensorId', sensordataController.retrieveavg);
    app.get('/sensordata/departmentavg/:departmentId', sensordataController.retrievedepartmentavg);

    app.post('/sensornode', sensornodesController.create);
    app.get('/sensornode', sensornodesController.list);
    app.get('/sensornode/:sensorNodeId', sensornodesController.retrieve);
    app.put('/sensornode/:sensorNodeId', sensornodesController.update);
    app.delete('/sensornode/:sensorNodeId', sensornodesController.destroy);

    app.post('/sensor', sensorsController.create);
    app.get('/sensor', sensorsController.list);
    app.get('/sensor/:sensorId', sensorsController.retrieve);
    app.put('/sensor/:sensorId', sensorsController.update);
    app.delete('/sensor/:sensorId', sensorsController.destroy);

    app.post('/coordinate', coordinatesController.create);
    app.get('/coordinate', coordinatesController.list);
    app.get('/coordinate/:coordinateId', coordinatesController.retrieve);
    app.put('/coordinate/:coordinateId', coordinatesController.update);
    app.delete('/coordinate/:coordinateId', coordinatesController.destroy);

    app.post('/setting', settingsController.create);
    app.get('/setting', settingsController.list);
    app.get('/setting/:settingId', settingsController.retrieve);
    app.put('/setting/:settingId', settingsController.update);
    app.delete('/setting/:settingId', settingsController.destroy);

    app.post('/type', typesController.create);
    app.get('/type', typesController.list);
    app.get('/type/:typeId', typesController.retrieve);
    app.put('/type/:typeId', typesController.update);
    app.delete('/type/:typeId', typesController.destroy);
};