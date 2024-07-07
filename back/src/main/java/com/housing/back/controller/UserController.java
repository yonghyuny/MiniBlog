package com.housing.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.request.auth.NicknameRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.auth.NicknameResponseDto;
import com.housing.back.service.AuthService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/aaa")
public class UserController {

    @Autowired
    private AuthService authService;

    @GetMapping("/aaa") // 인증 : 로그아웃
    public ResponseEntity<ResponseDto> accessSecureArea(HttpServletRequest request) {
        ResponseEntity<ResponseDto> response = authService.accessSecureArea(request);
        return response;
    }

    @GetMapping("/logout") // 인증 : 로그아웃
    public ResponseEntity<ResponseDto> logout(
        @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String accessTokenHeader,
        @RequestHeader(value = "Refresh-Token", required = false) String refreshTokenHeader) {

        ResponseEntity<ResponseDto> response = authService.logout(accessTokenHeader, refreshTokenHeader);
        return response;
    }

    @PostMapping("/nickname-check") // 인증 : 닉네임 체크
    public ResponseEntity<? super NicknameResponseDto> checkNickName(@RequestBody @Valid NicknameRequestDto requestBody) {
        ResponseEntity<? super NicknameResponseDto> response = authService.checkNickName(requestBody);
        return response;
    }

    @PostMapping("/nickname-create") // 인증 : 닉네임 생성
    public ResponseEntity<? super NicknameResponseDto> createNickName(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestBody @Valid NicknameRequestDto requestBody) {

        // 닉네임 생성 요청 처리
        ResponseEntity<? super NicknameResponseDto> response = authService.createNickName(authorizationHeader, requestBody);
        return response;
    }

    @PostMapping("/nickname-find") // 인증 : 닉네임 찾기
    public ResponseEntity<? super NicknameResponseDto> findNickName(
        @RequestHeader("Authorization") String authorizationHeader) {

        ResponseEntity<? super NicknameResponseDto> response = authService.findNickName(authorizationHeader);
        return response;
    }
    
    @PostMapping("/refresh-token") // 인증 : 닉네임 찾기
    public ResponseEntity<?> refreshToken(
            @RequestHeader("Authorization") String authorizationHeader, // 요청 헤더에서 Authorization 헤더를 추출
            @RequestBody Map<String, String> requestBody, // requestBody는 deviceInfo 및 기타 매개변수를 포함하는 Map
            HttpServletRequest request) { // IP 주소를 추출하기 위해 HttpServletRequest 사용

            ResponseEntity<?> response = authService.handleTokenRefresh(authorizationHeader, requestBody, request);
            return response;
    }

    @PostMapping("/device-info") // 인증 : OAuth유저 재요청
    public ResponseEntity<?> deviceInfo(
            @RequestHeader("Authorization") String accessToken,
            @RequestHeader("Refresh-Token") String refreshToken,
            @RequestParam("deviceInfo") String deviceInfo,
            HttpServletRequest request){
            ResponseEntity<?> response = authService.processDeviceInfo(accessToken, refreshToken, deviceInfo, request);
        return response;
    }
}
