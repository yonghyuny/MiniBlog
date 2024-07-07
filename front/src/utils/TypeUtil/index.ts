import { ResponseDto } from 'utils/DtoUtil/response';

type ResponseBody <T> = T | ResponseDto | null;

export type {
    ResponseBody
}