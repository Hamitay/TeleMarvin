import { BaseError } from './BaseError';

export class ConstrainError extends BaseError {
  constructor() {
    super('Unique constrain violation');
  }
}
