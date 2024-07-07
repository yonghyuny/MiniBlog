import ResponseDto from "../reponse.dto";

export default interface SignInResponseDto extends ResponseDto {

    accessToken: string;
    refreshToken: string;
    accessTokenExpirationTime: number;
    refreshTokenExpirationTime: number;

}