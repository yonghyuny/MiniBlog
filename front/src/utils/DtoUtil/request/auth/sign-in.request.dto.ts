export default interface SignInRequestDto {

    id: string;
    password: string;
    deviceInfo?: string; //추가
    ipAddress?: string; //추가

}