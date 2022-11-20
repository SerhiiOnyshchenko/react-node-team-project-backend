const { Router } = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = new Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
