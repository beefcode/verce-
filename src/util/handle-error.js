import ms from 'ms';
import chalk from 'chalk';
import info from './output/info';
import errorOutput from './output/error';

export const error = errorOutput;

export default function handleError(err, { debug = false } = {}) {
  // Coerce Strings to Error instances
  if (typeof err === 'string') {
    err = new Error(err);
  }

  if (debug) {
    console.log(`> [debug] handling error: ${err.stack}`);
  }

  if (err.status === 403) {
    console.error(
      errorOutput('Authentication error. Run `now login` to log-in again.')
    );
  } else if (err.status === 429) {
    if (err.retryAfter === 'never') {
      console.error(errorOutput(err.message));
    } else if (err.retryAfter === null) {
      console.error(errorOutput('Rate limit exceeded error. Please try later.'));
    } else {
      console.error(
        errorOutput(
          `Rate limit exceeded error. Try again in ${
            ms(err.retryAfter * 1000, { long: true })
            }, or upgrade your account by running ` +
            `${chalk.gray('`')}${chalk.cyan('now upgrade')}${chalk.gray('`')}`
        )
      );
    }
  } else if (err.message) {
    console.error(errorOutput(err.message));
  } else if (err.status === 500) {
    console.error(errorOutput('Unexpected server error. Please retry.'));
  } else if (err.code === 'USER_ABORT') {
    info('Aborted');
  } else {
    console.error(
      error(`Unexpected error. Please try again later. (${err.message})`)
    );
  }
}
