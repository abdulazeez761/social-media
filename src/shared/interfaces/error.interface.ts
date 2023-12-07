export interface Error  {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
  }
  