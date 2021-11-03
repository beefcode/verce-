import fs from 'fs-extra';
import { join, dirname } from 'path';
import glob from './fs/glob';
import { FILES_SYMBOL, Lambda } from './lambda';
import type FileBlob from './file-blob';
import type { BuildOptions, Files } from './types';

const OUTPUT_DIR = '.output';

/**
 *
 * @param buildRuntime a legacy build() function from a Runtime
 * @param ext the file extension, for example `.py`
 */
export async function convertRuntimeToPlugin(
  buildRuntime: (options: BuildOptions) => Promise<{ output: Lambda }>,
  ext: string
) {
  const cwd = process.cwd();
  const files = await glob('**', { cwd });
  const entrypoints = await glob(`api/**/*.${ext}`, { cwd });

  return async function build({ workPath }: { workPath: string }) {
    for (const entrypoint of Object.keys(entrypoints)) {
      const dir = join(cwd, OUTPUT_DIR, 'inputs', entrypoint);
      await fs.ensureDir(dir);

      const { output } = await buildRuntime({
        files,
        entrypoint,
        workPath,
        config: {}, // TODO: what should config be?
        meta: {}, // TODO: what should meta be?
      });

      // @ts-ignore This symbol is a private API
      const lambdaFiles: Files = output[FILES_SYMBOL];
      const newFiles: string[] = [];

      Object.entries(lambdaFiles).forEach(async ([relPath, file]) => {
        const newPath = join(dir, relPath);
        newFiles.push(newPath);
        await fs.ensureDir(dirname(newPath));
        switch (file.type) {
          case 'FileRef':
          case 'FileFsRef':
            if (!file.fsPath) {
              throw new Error(
                `File type "${file.type}" is missing fsPath property`
              );
            }
            await linkOrCopy(file.fsPath, newPath);
            break;
          case 'FileBlob': {
            const { data, mode } = file as FileBlob;
            await fs.writeFile(newPath, data, { mode });
            break;
          }
          default: {
            const type: never = file.type;
            throw new Error(`Unknown file type: ${type}`);
          }
        }
      });

      const json = JSON.stringify({ files: newFiles });
      const entry = join(
        cwd,
        OUTPUT_DIR,
        'server',
        'pages',
        entrypoint.replace(ext, '.nft.json')
      );
      await fs.ensureDir(dirname(entry));
      await fs.writeFile(entry, json);
    }
  };
}

async function linkOrCopy(existingPath: string, newPath: string) {
  try {
    await fs.createLink(existingPath, newPath);
  } catch (err: any) {
    if (err.code !== 'EEXIST') {
      await fs.copyFile(existingPath, newPath);
    }
  }
}
