export default class ThemedValue<T extends { [name: string]: string }> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public selectValue(theme: keyof T): string {
    return this.value[theme];
  }
}
