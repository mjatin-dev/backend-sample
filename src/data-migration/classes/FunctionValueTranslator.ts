import { FunctionValue, FunctionValueEnum } from '../dto/function-value.dto';

export class FunctionValueTranslator {
  static translateFunctionValue(
    functionValue: FunctionValue,
  ): [string, string] {
    switch (functionValue.function) {
      case FunctionValueEnum.getYear:
        return [`EXTRACT(YEAR FROM "${functionValue.field}")`, 'year'];
      case FunctionValueEnum.getMonth:
        return [`EXTRACT(MONTH FROM "${functionValue.field}")`, 'month'];
      case FunctionValueEnum.getDay:
        return [`EXTRACT(DAY FROM "${functionValue.field}")`, 'day'];
      default:
        throw new Error('Invalid function');
    }
  }
}
