import { describe, expect, it } from 'vitest';

import { client } from '../../../mocks/client';
import domains from '../../../../src/commands/domains';
import { useUser } from '../../../mocks/user';
import { useDomains } from '../../../mocks/domains';

describe('domains ls', () => {
  it('should list up to 20 domains by default', async () => {
    useUser();
    useDomains();
    client.setArgv('domains', 'ls');
    let exitCodePromise = domains(client);
    await expect(exitCodePromise).resolves.toEqual(0);
    await expect(client.stderr).toOutput('example-19.com');
  });

  it('tracks subcommand invocation', async () => {
    useUser();
    useDomains();
    client.setArgv('domains', 'ls');
    let exitCodePromise = domains(client);
    await expect(exitCodePromise).resolves.toEqual(0);

    expect(client.telemetryEventStore).toHaveTelemetryEvents([
      {
        key: 'subcommand:list',
        value: 'ls',
      },
    ]);
  });

  describe('--limit', () => {
    it('should list up to 2 domains if limit set to 2', async () => {
      useUser();
      useDomains();
      client.setArgv('domains', 'ls', '--limit', '2');
      const exitCodePromise = domains(client);
      await expect(exitCodePromise).resolves.toEqual(0);
      await expect(client.stderr).toOutput('example-1.com');
    });

    it('tracks telemetry data', async () => {
      useUser();
      useDomains();
      client.setArgv('domains', 'ls', '--limit', '2');
      const exitCodePromise = domains(client);
      await expect(exitCodePromise).resolves.toEqual(0);

      expect(client.telemetryEventStore).toHaveTelemetryEvents([
        {
          key: 'subcommand:list',
          value: 'ls',
        },
        {
          key: 'option:limit',
          value: '[REDACTED]',
        },
      ]);
    });
  });

  describe('--next', () => {
    it('tracks telemetry data', async () => {
      useUser();
      useDomains();
      client.setArgv('domains', 'ls', '--next', '1730124407638');
      const exitCodePromise = domains(client);
      await expect(exitCodePromise).resolves.toEqual(0);

      expect(client.telemetryEventStore).toHaveTelemetryEvents([
        {
          key: 'subcommand:list',
          value: 'ls',
        },
        {
          key: 'option:next',
          value: '[REDACTED]',
        },
      ]);
    });
  });
});
