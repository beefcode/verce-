import execa from 'execa';
import { join } from 'path';
import npa from 'npm-package-arg';
import mkdirp from 'mkdirp-promise';
import { readJSON, writeJSON, remove } from 'fs-extra';
import cacheDirectory from 'cache-or-tmp-directory';
import wait from '../../../util/output/wait';
import { NowError } from '../../../util/now-error';
import { devDependencies as nowCliDeps } from '../../../../package.json';
import { Builder } from './types';

import * as staticBuilder from './static-builder';

const localBuilders: { [key: string]: Builder } = {
  '@now/static': staticBuilder
};

export const cacheDirPromise = prepareCacheDir();
export const builderDirPromise = prepareBuilderDir();

/**
 * Prepare cache directory for installing now-builders
 */
export async function prepareCacheDir() {
  const designated = cacheDirectory('co.zeit.now');

  if (!designated) {
    throw new NowError({
      code: 'NO_BUILDER_CACHE_DIR',
      message: 'Could not find cache directory for now-builders.',
      meta: {}
    });
  }

  const cacheDir = join(designated, 'dev');
  await mkdirp(cacheDir);
  return cacheDir;
}

export async function prepareBuilderDir() {
  const builderDir = join(await cacheDirPromise, 'builders');
  await mkdirp(builderDir);

  // Create an empty private `package.json`,
  // but only if one does not already exist
  try {
    const buildersPkg = join(builderDir, 'package.json');
    await writeJSON(buildersPkg, { private: true }, { flag: 'wx' });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  return builderDir;
}

// Is responsible for cleaning the cache
export async function cleanCacheDir(): Promise<void> {
  try {
    const deleteCache = await cacheDirPromise;
    await remove(deleteCache);
  } catch (err) {
    throw new NowError({
      code: 'NO_CLEAN_CACHE',
      message: 'Error clearing the cache',
      meta: {}
    });
  }
}

/**
 * Install a list of builders to the cache directory.
 */
export async function installBuilders(packages: string[]): Promise<void> {
  const cacheDir = await builderDirPromise;
  const buildersPkg = join(cacheDir, 'package.json');
  const pkg = await readJSON(buildersPkg);
  const updatedPackages: string[] = [];

  if (!pkg.devDependencies) {
    pkg.devDependencies = {};
  }
  const deps = pkg.devDependencies;

  for (const builderPkg of packages) {
    const parsed = npa(builderPkg);
    const name = parsed.name || builderPkg;
    if (localBuilders.hasOwnProperty(name)) {
      continue;
    }
    const spec = parsed.rawSpec || parsed.fetchSpec || 'latest';
    const currentVersion = deps[name];
    if (currentVersion !== spec) {
      updatedPackages.push(builderPkg);
      deps[name] = spec;
    }
  }

  // Pull the same version of `@now/build-utils` that now-cli is using
  const buildUtils = '@now/build-utils';
  const buildUtilsVersion = nowCliDeps[buildUtils];
  if (deps[buildUtils] !== buildUtilsVersion) {
    updatedPackages.push(`${buildUtils}@${buildUtilsVersion}`);
    deps[buildUtils] = buildUtilsVersion;
  }

  if (updatedPackages.length > 0) {
    const stopSpinner = wait(
      `Installing builders: ${updatedPackages.join(', ')}`
    );
    try {
      await writeJSON(buildersPkg, pkg);
      await execa('npm', ['install', '--prefer-offline'], {
        cwd: cacheDir
      });
    } finally {
      stopSpinner();
    }
  }
}

/**
 * Get a builder from the cache directory.
 */
export async function getBuilder(builderPkg: string): Promise<Builder> {
  let builder: Builder = localBuilders[builderPkg];
  if (!builder) {
    const cacheDir = await builderDirPromise;
    const parsed = npa(builderPkg);
    const dest = join(cacheDir, 'node_modules', parsed.name || builderPkg);
    builder = require(dest);
  }
  return builder;
}
