import { TelemetryClient } from '../..';

export class ProjectListTelemetryClient extends TelemetryClient {
  trackCliFlagUpdateRequired(updateRequired: boolean) {
    if (updateRequired) {
      this.trackCliFlag('update-required');
    }
  }

  trackCliOptionNext(next: number | undefined) {
    if (next) {
      this.trackCliOption({
        option: 'next',
        value: this.redactedValue,
      });
    }
  }
}
