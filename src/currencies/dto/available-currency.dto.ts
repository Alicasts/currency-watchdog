export class AvailableCurrencyDto {
    code: string;
    label: string;
  
    constructor(code: string, label: string) {
      this.code = code;
      this.label = label;
    }
}