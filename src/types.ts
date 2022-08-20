export type allocationType = {
  name: string | undefined;
  id: number | undefined;
}

export type editType = {
  status: boolean;
  allocationId: number | undefined;
}

export type errorType = {
  status: boolean;
  message: string;
}
