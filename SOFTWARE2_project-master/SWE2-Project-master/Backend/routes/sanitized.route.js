const express = require('express');
const router = express.Router();

router.post('/test', (req, res) => {
  res.json(req.body); // ستُرجع نسخة معقّمة من body
});

module.exports = router;
