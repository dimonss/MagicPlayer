export enum API_RESPONSE_STATUS {
  OK = 'OK',
  ERROR = 'ERROR',
}

export type BaseResponseI<Data> = {
  data: Data;
  status: API_RESPONSE_STATUS;
  message: string;
};
