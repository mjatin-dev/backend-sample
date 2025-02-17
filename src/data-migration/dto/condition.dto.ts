import { FunctionValue } from './function-value.dto';

export class Condition {
  field: string | FunctionValue;
  operator: string;
  value: any;
}
