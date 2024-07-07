import { ResponsMessage, ResponseCode } from 'utils/TypeUtil/enums';

export default interface ResponseDto{
    code: ResponseCode;
    message: ResponsMessage;
}