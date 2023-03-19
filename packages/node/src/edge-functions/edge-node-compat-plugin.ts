import BufferImplementation from 'buffer';
import EventsImplementation from 'events';
import AsyncHooksImplementation from 'async_hooks';
import AssertImplementation from 'assert';
import UtilImplementation from 'util';
import type { Plugin } from 'esbuild';

const SUPPORTED_NODE_MODULES = [
  'buffer',
  'events',
  'assert',
  'util',
  'async_hooks',
] as const;

const getSupportedNodeModuleRegex = () =>
  new RegExp(`^(?:node:)?(?:${SUPPORTED_NODE_MODULES.join('|')})$`);

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: Partial<Pick<T, K>> = {};
  for (const key of keys) {
    res[key] = obj[key];
  }
  return res as Pick<T, K>;
}

const NativeModuleMap = () => {
  const mods: Record<`node:${typeof SUPPORTED_NODE_MODULES[number]}`, unknown> =
    {
      'node:buffer': pick(BufferImplementation, [
        'constants',
        'kMaxLength',
        'kStringMaxLength',
        'Buffer',
        'SlowBuffer',
      ]),
      'node:events': pick(EventsImplementation, [
        'EventEmitter',
        'captureRejectionSymbol',
        'defaultMaxListeners',
        'errorMonitor',
        'listenerCount',
        'on',
        'once',
      ]),
      'node:async_hooks': pick(AsyncHooksImplementation, [
        'AsyncLocalStorage',
        'AsyncResource',
      ]),
      'node:assert': pick(AssertImplementation, [
        'AssertionError',
        'deepEqual',
        'deepStrictEqual',
        'doesNotMatch',
        'doesNotReject',
        'doesNotThrow',
        'equal',
        'fail',
        'ifError',
        'match',
        'notDeepEqual',
        'notDeepStrictEqual',
        'notEqual',
        'notStrictEqual',
        'ok',
        'rejects',
        'strict',
        'strictEqual',
        'throws',
      ]),
      'node:util': pick(UtilImplementation, [
        '_extend' as any,
        'callbackify',
        'format',
        'inherits',
        'promisify',
        'types',
      ]),
    };
  return new Map(Object.entries(mods));
};

const NODE_COMPAT_NAMESPACE = 'vercel-node-compat';

/**
 * Allows to enable Node.js compatibility by detecting namespaced `node:`
 * imports and producing metadata to bind global variables for each.
 * It requires from the consumer to add the imports.
 */
export function createNodeCompatPlugin() {
  const bindings = new Map<
    string,
    { name: string; modulePath: string; value: unknown }
  >();
  const plugin: Plugin = {
    name: 'vc-node-compat',
    setup(b) {
      b.onResolve({ filter: getSupportedNodeModuleRegex() }, async args => {
        const importee = args.path.replace('node:', '');
        if (!SUPPORTED_NODE_MODULES.includes(importee as any)) {
          return;
        }

        return {
          namespace: NODE_COMPAT_NAMESPACE,
          path: args.path,
        };
      });

      b.onLoad(
        { filter: /.+/, namespace: NODE_COMPAT_NAMESPACE },
        async args => {
          const globalName = `__vc_node_${args.path.replace('node:', '')}__`;
          if (!bindings.has(args.path)) {
            const value = NativeModuleMap().get(args.path);
            if (value === undefined) {
              throw new Error(`Could not find module ${args.path}`);
            }

            bindings.set(args.path, {
              modulePath: args.path,
              name: globalName,
              value,
            });
          }

          return {
            contents: `module.exports = ${globalName};`,
            loader: 'js',
          };
        }
      );
    },
  };
  return {
    plugin,
    get bindings() {
      return Array.from(bindings.values());
    },
  };
}
