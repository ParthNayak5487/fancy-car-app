import { RequestStatus } from './enum.enum';

export class ApiResponse {
    status: RequestStatus;
    data: any;
    message: any;
    statusCode: any;
    statusText: string;
    errorMessage: string;
}
