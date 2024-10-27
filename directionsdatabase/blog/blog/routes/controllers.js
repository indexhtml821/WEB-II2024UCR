const express = require('express');
const router = express.Router();
const controllers = require('require.all')('../controllers'); // Asegúrate de que esta ruta sea correcta

// Middleware para manejar las solicitudes sin un controlador válido
const handleControllerNotFound = (req, res) => {
    res.status(404).send('Controller not found');
};

// Ruta para manejar solicitudes a un controlador específico
router.all('/:controller', (req, res, next) => {
    const ControllerClass = controllers[req.params.controller];

    // Verifica si el controlador existe
    if (ControllerClass) {
        const controllerInstance = new ControllerClass();
        // Verifica si el método 'index' existe
        if (typeof controllerInstance.index === 'function') {
            return controllerInstance.index(req, res, next);
        } else {
            return res.status(404).send('Method index not found');
        }
    } else {
        return handleControllerNotFound(req, res);
    }
});

// Ruta para manejar solicitudes a un controlador y una acción específica
router.all('/:controller/:action', (req, res, next) => {
    const ControllerClass = controllers[req.params.controller];

    // Verifica si el controlador existe
    if (ControllerClass) {
        const controllerInstance = new ControllerClass();
        // Verifica si la acción existe
        if (typeof controllerInstance[req.params.action] === 'function') {
            return controllerInstance[req.params.action](req, res, next);
        } else {
            return res.status(404).send('Method not found');
        }
    } else {
        return handleControllerNotFound(req, res);
    }
});

// Ruta para manejar solicitudes a un controlador, acción y un ID específico
router.all('/:controller/:action/:id', (req, res, next) => {
    const ControllerClass = controllers[req.params.controller];

    // Verifica si el controlador existe
    if (ControllerClass) {
        const controllerInstance = new ControllerClass();
        // Verifica si la acción existe
        if (typeof controllerInstance[req.params.action] === 'function') {
            return controllerInstance[req.params.action](req, res, next);
        } else {
            return res.status(404).send('Method not found');
        }
    } else {
        return handleControllerNotFound(req, res);
    }
});

module.exports = router;
