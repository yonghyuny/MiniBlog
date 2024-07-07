package com.housing.back.service;



import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.auth.CheckCertificationRequestDto;
import com.housing.back.dto.request.auth.EmailCertificationRequestDto;
import com.housing.back.dto.request.auth.IdCheckRequestDto;
import com.housing.back.dto.request.auth.NicknameRequestDto;
import com.housing.back.dto.request.auth.SignInRequestDto;
import com.housing.back.dto.request.auth.SignUpRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.auth.CheckCertificationResponseDto;
import com.housing.back.dto.response.auth.EmailCertificationResponseDto;
import com.housing.back.dto.response.auth.GenerateNewTokensResponseDto;
import com.housing.back.dto.response.auth.IdCheckResponseDto;
import com.housing.back.dto.response.auth.NicknameResponseDto;
import com.housing.back.dto.response.auth.SignInResponseDto;
import com.housing.back.dto.response.auth.SignUpResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    
    ResponseEntity<? super IdCheckResponseDto> idCheck (IdCheckRequestDto dto); 
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification (EmailCertificationRequestDto dto);
    ResponseEntity<? super CheckCertificationResponseDto> checkCertification (CheckCertificationRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp (SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn (SignInRequestDto dto,HttpServletRequest request);
    ResponseEntity<? super NicknameResponseDto> checkNickName (NicknameRequestDto dto);  // 추가
    ResponseEntity<? super NicknameResponseDto> createNickName(String authorizationHeader, NicknameRequestDto requestBody);


    ResponseEntity<? super NicknameResponseDto> findNickName(String authorizationHeader);


    boolean verifyRefreshToken(String refreshToken, String deviceInfo, String ipAddress);
    ResponseEntity<? super GenerateNewTokensResponseDto> generateNewTokens(String refreshToken);
    ResponseEntity<?> handleTokenRefresh(String authorizationHeader, Map<String, String> requestBody, HttpServletRequest request);
    // 로그아웃 메서드 추가
    ResponseEntity<ResponseDto> logout(String token, String refreshToken);
    /////////////////////////////////////////
    ResponseEntity<ResponseDto> accessSecureArea(HttpServletRequest request);
    /////////////////////////////////////////
    ResponseEntity<?> processDeviceInfo(String accessToken, String refreshToken, String deviceInfo, HttpServletRequest request);
}
