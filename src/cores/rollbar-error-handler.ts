// module error handler
import * as Rollbar from 'rollbar';

import { Injectable, ErrorHandler, Injector, InjectionToken } from '@angular/core';
const rollbarConfig = {
  accessToken: '7aec55e0078f4ac3bcd653adcb993dea',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
