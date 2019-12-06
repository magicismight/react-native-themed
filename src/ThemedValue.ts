export default class ThemedValue<T extends { [name: string]: S }, S> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public selectValue(theme: keyof T): S {
    return this.value[theme];
  }
}
