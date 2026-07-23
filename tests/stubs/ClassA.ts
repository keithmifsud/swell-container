import { ContractA } from './ContractA';

export class ClassA implements ContractA {

  public constructor (private name: string) {}

  public getName (): string {
    return this.name;
  }

  public setName (name: string): void {
    this.name = name;
  }

}
