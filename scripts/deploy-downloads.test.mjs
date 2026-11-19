import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('page deployment preserves separately published versioned downloads', () => {
  const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  const mutableUpload = workflow.split('- name: Upload HTML & Mutable Files')[1]?.split('- name:')[0];
  assert.ok(mutableUpload, 'mutable page upload must be reviewed if renamed');
  assert.match(mutableUpload, /--exclude "downloads\/\*"/);
  assert.match(mutableUpload, /--exclude "assets\/\*"/);
  assert.match(mutableUpload, /--delete/);
});

test('beta branches validate without accessing production credentials or publishing', () => {
  const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  assert.match(workflow, /branches: \[main, 'beta\/\*\*'\]/);
  assert.ok(workflow.includes('group: production-deploy-${{ github.ref }}'), 'branch validation must not cancel a production deployment');
  for (const step of ['Configure AWS Credentials', 'Upload Immutable Assets', 'Upload HTML & Mutable Files', 'Invalidate CloudFront Edge Cache']) {
    const body = workflow.split(`- name: ${step}`)[1]?.split('- name:')[0];
    assert.ok(body, `missing production step: ${step}`);
    assert.match(body, /if: github\.ref == 'refs\/heads\/main'/);
  }
});
