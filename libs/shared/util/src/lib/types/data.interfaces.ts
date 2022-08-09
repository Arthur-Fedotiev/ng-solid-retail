export interface WithPayload<T> {
  payload: T;
}

export type WithId<T, P = string> = T & {
  id: P;
};

export interface Pagination {
  firstPage: boolean;
  pageSize: number;
}
