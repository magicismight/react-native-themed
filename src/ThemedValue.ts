export default class ThemedValue<
  T extends { [name: string]: string | undefined }
> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public selectValue(theme: keyof T): string | undefined {
    return this.value[theme];
  }
}
