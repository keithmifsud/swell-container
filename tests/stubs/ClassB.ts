import { ContractB } from './ContractB';

export class ClassB implements ContractB {

  public constructor (
    private name: string,
  ) {}

  public getName (): string {
    return this.name;
  }

  public setName (name: string): void {
    this.name = name;
  }
}
