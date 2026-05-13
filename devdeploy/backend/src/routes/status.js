const express = require('express');
const store = require('../store/deploymentStore');

const router = express.Router();

router.get('/:id', (req, res) => {
  const deployment = store.get(req.params.id);
  if (!deployment) {
    return res.status(404).json({ error: 'Deployment not found' });
  }
  return res.json(deployment);
});

module.exports = router;
