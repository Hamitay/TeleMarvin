export class BaseError extends Error {
  message: string;
  constructor(message?: string) {
    super();
    this.message = message ?? 'An unknown error has ocurred';
  }
}
