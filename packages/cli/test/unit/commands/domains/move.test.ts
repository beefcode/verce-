import { describe, expect, it } from 'vitest';

import { client } from '../../../mocks/client';
import domains from '../../../../src/commands/domains';
import { useUser } from '../../../mocks/user';
import { useTeams } from '../../../mocks/team';
import { useDomain } from '../../../mocks/domains';

describe('domains mv', () => {
  describe('[name]', () => {
    describe('[destination]', () => {
      describe('--yes', () => {
        it('tracks telemetry data', async () => {
          useUser();
          useTeams('team2');
          client.setArgv('domains', 'move', 'example.com', 'team2', '--yes');
          client.scenario.get('/:version/domains/example.com', (req, res) => {
            res.json({});
          });
          client.scenario.patch('/v4/domains/example.com', (req, res) => {
            res.json({ domain: { name: 'example.com' } });
          });
          const exitCodePromise = domains(client);
          await expect(exitCodePromise).resolves.toEqual(0);

          expect(client.telemetryEventStore).toHaveTelemetryEvents([
            {
              key: 'subcommand:move',
              value: 'move',
            },
            {
              key: 'flag:yes',
              value: 'TRUE',
            },
            {
              key: 'argument:domain',
              value: '[REDACTED]',
            },
            {
              key: 'argument:destination',
              value: '[REDACTED]',
            },
          ]);
        });
      });

      describe('northstar', () => {
        it('should prevent moving a domain to a user account', async () => {
          const { username } = useUser({ version: 'northstar' });
          useTeams();
          useDomain('northstar');
          client.setArgv('domains', 'move', 'example-northstar.com', username);
          const exitCodePromise = domains(client);
          await expect(client.stderr).toOutput(
            `Fetching domain example-northstar.com under ${username}
Error: You may not move your domain to your user account.`
          );
          await expect(exitCodePromise).resolves.toEqual(1);
        });
      });
    });
  });
});
