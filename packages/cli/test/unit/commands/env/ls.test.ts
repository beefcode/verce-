import { describe, it, expect, beforeEach } from 'vitest';
import env from '../../../../src/commands/env';
import { setupUnitFixture } from '../../../helpers/setup-unit-fixture';
import { client } from '../../../mocks/client';
import { defaultProject } from '../../../mocks/project';
import { useTeams } from '../../../mocks/team';
import { useUser } from '../../../mocks/user';
import { useProject } from '../../../mocks/project';

describe('env ls', () => {
  beforeEach(() => {
    useUser();
    useTeams('team_dummy');
    useProject(
      {
        ...defaultProject,
        id: 'vercel-env-ls',
        name: 'vercel-env-ls',
      },
      []
    );
    const cwd = setupUnitFixture('commands/env/vercel-env-ls');
    client.cwd = cwd;
  });

  it('tracks `ls` subcommand', async () => {
    client.setArgv('env', 'ls');
    await env(client);
    expect(client.telemetryEventStore).toHaveTelemetryEvents([
      {
        key: 'subcommand:ls',
        value: 'ls',
      },
    ]);
  });

  describe('[environment]', () => {
    it('tracks `environment` argument', async () => {
      client.setArgv('env', 'ls', 'production');
      await env(client);
      expect(client.telemetryEventStore).toHaveTelemetryEvents([
        {
          key: 'subcommand:ls',
          value: 'ls',
        },
        {
          key: 'argument:environment',
          value: 'production',
        },
      ]);
    });

    it('tracks redacted `environment` argument', async () => {
      client.setArgv('env', 'ls', 'custom-env');
      await env(client);
      expect(client.telemetryEventStore).toHaveTelemetryEvents([
        {
          key: 'subcommand:ls',
          value: 'ls',
        },
        {
          key: 'argument:environment',
          value: '[REDACTED]',
        },
      ]);
    });

    describe('[git-branch]', () => {
      it('tracks `git-branch` argument', async () => {
        client.setArgv('env', 'ls', 'production', 'main');
        await env(client);
        expect(client.telemetryEventStore).toHaveTelemetryEvents([
          {
            key: 'subcommand:ls',
            value: 'ls',
          },
          {
            key: 'argument:environment',
            value: 'production',
          },
          {
            key: 'argument:git-branch',
            value: '[REDACTED]',
          },
        ]);
      });
    });
  });
});
