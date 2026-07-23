import type { Scope } from '../Scope';

export interface BindingConfig<T> {
  factory: () => T;
  scope?: Scope;
}
