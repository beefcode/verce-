#!/usr/bin/env node

// This should only be used for the integration tests

const { join } = require('path');
const { spawnSync } = require('child_process');

const match = process.version.match(/^v(\d+)\.(\d+)/);
const major = match && parseInt(match[1], 10);
const minor = match && parseInt(match[2], 10);

// Must be above or equal to 10.10.0
const isVersion = major > 10 || (major === 10 && minor >= 10);

if (!isVersion || (major === 8 && process.platform === 'darwin')) {
  const [node, _, ...args] = process.argv;
  const script = join(__dirname, '../dist/index.js');

  const { status } = spawnSync(node, ['--no-warnings', script, ...args], {
    stdio: 'inherit'
  });

  process.exit(status);
} else {
  require('../dist/index.js');
}
