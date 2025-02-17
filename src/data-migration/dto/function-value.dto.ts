export enum FunctionValueEnum {
  getYear = 'getYear',
  getMonth = 'getMonth',
  getDay = 'getDay',
}

export class FunctionValue {
  function: FunctionValueEnum;
  field: string;
}
