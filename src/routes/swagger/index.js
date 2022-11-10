const { Router } = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const router = new Router();

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
