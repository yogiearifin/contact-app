export interface ContactDataType {
  id: string,
  firstName: string,
  lastName: string,
  age: string,
  photo: string;
}

export interface ContactType {
  data: ContactDataType[],
  loading: boolean,
  error: string | undefined;
  message?:string
}

export interface DetailContactType {
  data: ContactDataType,
  loading: boolean,
  error: string | undefined;
}

export type IdParams = {
  id: string;
};

export type PostPutBodyType = {
  firstName:string,
  lastName:string,
  age:number,
  photo:string
}