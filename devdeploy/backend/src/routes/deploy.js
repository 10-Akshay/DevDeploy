const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../store/deploymentStore');
const { runDeploy } = require('../services/deploymentService');

const router = express.Router();

router.post('/', (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl || typeof repoUrl !== 'string') {
    return res.status(400).json({ error: 'repoUrl is required' });
  }

  // Basic GitHub URL validation
  const githubPattern = /^https?:\/\/(www\.)?github\.com\/.+\/.+/;
  if (!githubPattern.test(repoUrl)) {
    return res.status(400).json({ error: 'Please provide a valid GitHub URL' });
  }

  const id = uuidv4();
  store.create(id, repoUrl);

  // Fire-and-forget — the pipeline runs async
  runDeploy(id, repoUrl);

  return res.status(202).json({
    message: 'Deployment started',
    deploymentId: id,
    statusUrl: `/status/${id}`,
  });
});

module.exports = router;
