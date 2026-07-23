import type { BindingConfig } from './contracts/BindingConfig';
import { BindingNotFound } from './errors/BindingNotFound';
import { InitializableBindingConfig } from './contracts/InitializableBindingConfig';

export class SwellContainer<TRegistry extends Record<string, BindingConfig<any>>> {
  private readonly registry: TRegistry;
  private readonly instances = new Map<keyof TRegistry, any>();

  private constructor (registry: TRegistry) {
    this.registry = registry;
  }

  public static init<T extends Record<string, any>> (
    registry: { [K in keyof T]: InitializableBindingConfig<T[K]> }
  ): SwellContainer<{ [K in keyof T]: BindingConfig<T[K] extends { factory: () => infer R } ? R : never> }> {
    return new SwellContainer(registry as any);
  }

  public resolve<K extends keyof TRegistry> (
    alias: K
  ): ReturnType<TRegistry[K]['factory']> {
    const config = this.registry[alias];

    if (!config) {
      throw new BindingNotFound(`${String(alias)}`);
    }

    const isTransient = config.scope === 'transient';

    if (!isTransient && this.instances.has(alias)) {
      return this.instances.get(alias);
    }

    const instance = config.factory();

    if (!isTransient) {
      this.instances.set(alias, instance);
    }

    return instance;
  }
}
