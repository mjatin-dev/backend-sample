type Data = any | null;
declare abstract class ResponseObject {
    success: boolean;
    message: string;
    data: Data;
    constructor(success: boolean, message: string, data?: Data);
}
export declare class PaginatedResponseObject extends ResponseObject {
    constructor(message: string, data: Data, total: number, perPage: number, page: number);
}
export declare class SuccessResponseObject extends ResponseObject {
    constructor(message: string, data?: Data);
}
export declare class ErrorResponseObject extends ResponseObject {
    constructor(message: string, data?: Data);
}
export {};
