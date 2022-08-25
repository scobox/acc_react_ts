import { Dispatch, SetStateAction } from 'react';

export type AllocationType = {
  name: string | undefined;
  id: number | undefined;
};

export type EditType = {
  status: boolean;
  allocationId: number | undefined;
};

export type ErrorType = {
  status: boolean;
  message: string;
};

export type CredentialsInputs = {
  email: string;
  password: string;
};

export type AllocationItemProps = {
  allocation: AllocationType;
  setEdit: Dispatch<SetStateAction<EditType>>;
  setReRender: Dispatch<SetStateAction<number>>;
};

export type handleSaveAllocationProps = {
  event: React.FormEvent<HTMLFormElement>;
  allocationName: string;
};

export enum RoutePath {
  Login = 'login',
  SignUp = 'signup',
}
