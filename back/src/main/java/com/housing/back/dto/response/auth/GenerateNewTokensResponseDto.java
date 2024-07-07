package com.housing.back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;
import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GenerateNewTokensResponseDto extends ResponseDto{
    
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpirationTime;
    private long refreshTokenExpirationTime;

    private GenerateNewTokensResponseDto(String accessToken, String refreshToken, long accessTokenExpirationTime, long refreshTokenExpirationTime) {
        super();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpirationTime = accessTokenExpirationTime;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
    }

    public static ResponseEntity<GenerateNewTokensResponseDto> success(String accessToken, String refreshToken, long accessTokenExpirationTime, long refreshTokenExpirationTime) {
        GenerateNewTokensResponseDto responseBody = new GenerateNewTokensResponseDto(accessToken, refreshToken, accessTokenExpirationTime, refreshTokenExpirationTime);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> refreshTokenFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}
