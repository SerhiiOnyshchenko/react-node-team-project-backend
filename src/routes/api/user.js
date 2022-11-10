const express = require('express');

const router = new express.Router();

router.route('/').get();

router.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: POST /user',
    data: 'Not found',
  });
});

module.exports = router;
