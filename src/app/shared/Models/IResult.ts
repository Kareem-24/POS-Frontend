export interface IResult<T> {
  Data: T[];
  ErrorMessage: string;
  IsSuccess: boolean;
}
