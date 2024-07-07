package com.housing.back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;
import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto{

    private String accessToken;
    private String refreshToken;
    private long accessTokenExpirationTime;
    private long refreshTokenExpirationTime;

    private SignInResponseDto (String accessToken, String refreshToken, long accessTokenExpirationTime,long refreshTokenExpirationTime) {
        super();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpirationTime = accessTokenExpirationTime; // 엑세스 토큰 유효시간 (1시간)
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
    }

    public static ResponseEntity<SignInResponseDto> success (String accessToken, String refreshToken, long accessTokenExpirationTime, long refreshTokenExpirationTime) {
        SignInResponseDto responseBody = new SignInResponseDto(accessToken, refreshToken, accessTokenExpirationTime, refreshTokenExpirationTime); System.out.println("13 사인인리스폰스디티오 : " + responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> signInFail () {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

}
