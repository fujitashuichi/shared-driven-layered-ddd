export type ApiResult<T> = {
    ok: boolean;
    status: number;
    body: T;
};
