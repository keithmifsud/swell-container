import { Scope } from '../Scope';

export type InitializableBindingConfig<T> = {
  scope?: Scope;
  factory: T extends { factory: () => infer R }
    ? R extends void | undefined
      ? 'TypeError: Factory function must return a value'
      : () => R
    : 'TypeError: Factory must be a function';
} & {
  [P in Exclude<keyof T, 'scope' | 'factory'>]: never;
};
