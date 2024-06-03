export type Result<T> = Success<T> | Failure;

export class Success<T> {
  public readonly success = true;
  public readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export class Failure {
  public readonly success = false;
  public readonly error: Error;

  constructor(error: Error | string) {
    this.error = error instanceof Error ? error : new Error(error);
  }
}
