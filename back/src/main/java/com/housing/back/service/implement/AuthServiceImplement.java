package com.housing.back.service.implement;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.housing.back.common.CertificationNumber;
import com.housing.back.common.IpUtils;
import com.housing.back.common.JwtUtils;
import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;
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
import com.housing.back.dto.response.auth.JwtResponseDto;
import com.housing.back.dto.response.auth.NicknameResponseDto;
import com.housing.back.dto.response.auth.SignInResponseDto;
import com.housing.back.dto.response.auth.SignUpResponseDto;

import com.housing.back.entity.CertificationEntity;
import com.housing.back.entity.NickNameEntity;
import com.housing.back.entity.RefreshTokenEntity;
import com.housing.back.entity.UserEntity;

import com.housing.back.provider.EmailProvider;
import com.housing.back.provider.JwtProvider;

import com.housing.back.repository.CertificationRepository;
import com.housing.back.repository.NicknameRepository;
import com.housing.back.repository.RefreshTokenRepository;
import com.housing.back.repository.UserRepository;

import com.housing.back.service.AuthService;
import com.housing.back.service.JwtBlacklistService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    
    private final UserRepository userRepository;
    private final NicknameRepository nicknameRepository; 
    private final CertificationRepository certificationRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final EmailProvider emailProvider;
    private final JwtBlacklistService  jwtBlacklistService;
    private final JwtUtils jwtUtils;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {
        
        try{
            String userId = dto.getId();
            boolean isExistId = userRepository.existsByUserId(userId);
            if (isExistId) return IdCheckResponseDto.duplicatedId();

        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return IdCheckResponseDto.success();

    }

    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto) {
        
        try {
            
            String userId = dto.getId();
            String email = dto.getEmail();

            boolean isExistId = userRepository.existsByUserId(userId);
            if (isExistId) return EmailCertificationResponseDto.duplicateId();

            String certificationNumber = CertificationNumber.getCertificationNumber();

            boolean isSuccessed = emailProvider.sendCertificationMail(email, certificationNumber);
            if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

            CertificationEntity certificationEntity = new CertificationEntity(userId, email, certificationNumber);
            certificationRepository.save(certificationEntity);
            
        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return EmailCertificationResponseDto.success();

    }

    @Override
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto) {
        
        try {

            String userId = dto.getId();
            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            CertificationEntity certificationEntity = certificationRepository.findByUserId(userId);
            if (certificationEntity == null) return CheckCertificationResponseDto.certificationFail();

            boolean isMatched = certificationEntity.getEmail().equals(email) && certificationEntity.getCertificationNumber().equals(certificationNumber);
            if (!isMatched) return CheckCertificationResponseDto.certificationFail();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return CheckCertificationResponseDto.success();

    }

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try {
            
            String userId = dto.getId();

            boolean isExistId = userRepository.existsByUserId(userId);
            if (isExistId) return SignUpResponseDto.duplicateId();

            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            CertificationEntity certificationEntity = certificationRepository.findByUserId(userId);
            boolean isMatched = 
                certificationEntity.getEmail().equals(email) && 
                certificationEntity.getCertificationNumber().equals(certificationNumber);
            if (!isMatched) return SignUpResponseDto.certificationFail();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            // certificationRepository.delete(certificationEntity);
            certificationRepository.deleteByUserId(userId);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto,HttpServletRequest request) {
        
        String accessToken = null;
        String refreshToken = null;
        Date accessTokenExpirationDate = null;
        Date refreshTokenExpirationDate = null;
        
        try {

            String ipAddress = IpUtils.extractIpAddress(request);
            dto.setIpAddress(ipAddress);

            String userId = dto.getId();

            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return SignInResponseDto.signInFail();

            String password = dto.getPassword(); 
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched) return SignInResponseDto.signInFail();

            JwtResponseDto accessTokenData = jwtProvider.createAccessToken(userId);
            accessToken = accessTokenData.getToken();
            accessTokenExpirationDate = accessTokenData.getExpirationDate();

            JwtResponseDto refreshTokenData = jwtProvider.createRefreshToken(userId);
            refreshToken = refreshTokenData.getToken();
            refreshTokenExpirationDate = refreshTokenData.getExpirationDate();

            refreshTokenRepository.deleteExpiredTokens(userId, dto.getDeviceInfo(), dto.getIpAddress(), refreshTokenExpirationDate);

            RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
            .userId(userId)
            .refreshToken(refreshToken)
            .deviceInfo(dto.getDeviceInfo())
            .ipAddress(dto.getIpAddress())
            .expirationDate(refreshTokenExpirationDate)
            .build();

            refreshTokenRepository.save(refreshTokenEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(accessToken, refreshToken, accessTokenExpirationDate.getTime() ,refreshTokenExpirationDate.getTime() );

    }

    // @Override
    // public ResponseEntity<? super NicknameResponseDto> checkNickName(NicknameRequestDto dto) {
    //     try {
    //         String nickname = dto.getNickname();
    //         boolean isExistNickname = nicknameRepository.existsByNickname(nickname);
    //         if (isExistNickname) return NicknameResponseDto.duplicatedNickname();
    //     } catch (Exception exception) {
    //         exception.printStackTrace();
    //         return ResponseDto.databaseError();
    //     }
    //     return NicknameResponseDto.success();
    // }

    @Override
    public ResponseEntity<? super NicknameResponseDto> checkNickName(NicknameRequestDto dto) {
        try {
            String nickname = dto.getNickname();
            boolean isExistNickname = nicknameRepository.existsByNickname(nickname);
            if (isExistNickname) return NicknameResponseDto.duplicatedNickname();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return NicknameResponseDto.success(dto.getNickname());
    }

    // @Transactional
    // @Override
    // public ResponseEntity<? super NicknameResponseDto> createNickName(String authorizationHeader, NicknameRequestDto requestBody) {
    //     // 토큰에서 사용자 ID 추출
    //     String token = authorizationHeader.substring(7);
    //     String userId = jwtUtils.extractUserId(token);

    //     if (!userRepository.existsByUserId(userId)) {
    //         return ResponseDto.userNotFound(); // 사용자가 존재하지 않음
    //     }

    //     try {
    //         // 닉네임 엔티티 생성 및 저장
    //         NickNameEntity nicknameEntity = nicknameRepository.findByUserId(userId).orElse(new NickNameEntity());
    //         nicknameEntity.setUserId(userId);
    //         nicknameEntity.setNickname(requestBody.getNickname());
    //         nicknameRepository.save(nicknameEntity);
    
    //     } catch (Exception e) {
    //         // 예외 발생 시 데이터베이스 오류 응답 반환
    //         e.printStackTrace();
    //         return ResponseDto.databaseError();
    //     }

    //     // 응답 DTO 생성 및 반환
         
    //     return NicknameResponseDto.success();
    // }

    @Transactional
    @Override
    public ResponseEntity<? super NicknameResponseDto> createNickName(String authorizationHeader, NicknameRequestDto requestBody) {
        // 토큰에서 사용자 ID 추출
        String token = authorizationHeader.substring(7);
        String userId = jwtUtils.extractUserId(token);

        if (!userRepository.existsByUserId(userId)) {
            return ResponseDto.userNotFound(); // 사용자가 존재하지 않음
        }

        try {
            // 닉네임 엔티티 생성 및 저장
            NickNameEntity nicknameEntity = nicknameRepository.findByUserId(userId).orElse(new NickNameEntity());
            nicknameEntity.setUserId(userId);
            nicknameEntity.setNickname(requestBody.getNickname());
            nicknameRepository.save(nicknameEntity);

        } catch (Exception e) {
            // 예외 발생 시 데이터베이스 오류 응답 반환
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        // 응답 DTO 생성 및 반환
        return NicknameResponseDto.success(requestBody.getNickname());
    }

    @Transactional
    @Override
    public ResponseEntity<? super NicknameResponseDto> findNickName(String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String userId = jwtUtils.extractUserId(token);

        if (!userRepository.existsByUserId(userId)) {
            return ResponseDto.userNotFound(); // 사용자가 존재하지 않음
        }

        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);

        if (nicknameEntityOptional.isPresent()) {
            NickNameEntity nicknameEntity = nicknameEntityOptional.get();
            return NicknameResponseDto.success(nicknameEntity.getNickname());
        } else {
            return NicknameResponseDto.noNickname();
        }
    }

    
    @Override
    public ResponseEntity<ResponseDto> accessSecureArea(HttpServletRequest request) {
    
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);
        try {
            userRepository.findByUserId(userId);    
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR));
        }
       
        return  ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ResponseCode.SUCCESS,ResponseMessage.SUCCESS));
    }
    
    @Transactional
    public ResponseEntity<ResponseDto> logout(String accessTokenHeader, String refreshTokenHeader) {
        String accessToken = null;
        String refreshToken = null;

        if (accessTokenHeader != null && accessTokenHeader.startsWith("Bearer ")) {
            accessToken = accessTokenHeader.substring(7);
        }

        if (refreshTokenHeader != null) {
            refreshToken = refreshTokenHeader;
        }

        if (accessToken == null && refreshToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.VALIDATION_FAIL,ResponseMessage.VALIDATION_FAIL));
        }

        try {
            if (accessToken != null) { // 엑세스토큰이 있을경우
                long accessExpiration = jwtProvider.getExpiration(accessToken);
                jwtBlacklistService.addToBlacklist(accessToken, accessExpiration);
            }
    
            if (refreshToken != null) { // 리프레시토큰이 있을 경우
                long refreshExpiration = jwtProvider.getExpiration(refreshToken);
                jwtBlacklistService.addToBlacklist(refreshToken, refreshExpiration);
                refreshTokenRepository.deleteByRefreshToken(refreshToken);
            }
    
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDto(ResponseCode.DATABASE_ERROR,ResponseMessage.DATABASE_ERROR));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ResponseCode.SUCCESS,ResponseMessage.SUCCESS));
    }
    
    @Override
    @Transactional
    public ResponseEntity<?> handleTokenRefresh(String authorizationHeader, Map<String, String> requestBody, HttpServletRequest request) {
    
        String refreshToken = authorizationHeader.replace("Bearer ", "");
        String deviceInfo = requestBody.get("deviceInfo");
        String ipAddress = IpUtils.extractIpAddress(request);

        boolean isTokenValid = verifyRefreshToken(refreshToken, deviceInfo, ipAddress);

        if (isTokenValid) {
            ResponseEntity<? super GenerateNewTokensResponseDto> response = generateNewTokens(refreshToken);
            return ResponseEntity.ok(response.getBody());
        } else {
            return GenerateNewTokensResponseDto.refreshTokenFail();
        }
    }

    @Override
    public boolean verifyRefreshToken(String refreshToken, String deviceInfo, String ipAddress) {
        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByRefreshToken(refreshToken);
        if (tokenEntity == null) {
            System.out.println("리프레시 토큰이 데이터베이스에 존재하지 않습니다.");
            return false;
        }

        boolean isDeviceInfoMatch = tokenEntity.getDeviceInfo().equals(deviceInfo);
        boolean isIpAddressMatch = tokenEntity.getIpAddress().equals(ipAddress);
        boolean isTokenNotExpired = !tokenEntity.getExpirationDate().before(new Date());

        System.out.println("디바이스 정보 일치: " + isDeviceInfoMatch);
        System.out.println("IP 주소 일치: " + isIpAddressMatch);
        System.out.println("토큰 만료 여부: " + isTokenNotExpired);

        return isDeviceInfoMatch && isIpAddressMatch && isTokenNotExpired;
    }
    @Override
    public ResponseEntity<? super GenerateNewTokensResponseDto> generateNewTokens(String refreshToken) {

        RefreshTokenEntity refreshTokenEntity = refreshTokenRepository.findByRefreshToken(refreshToken);

        if(refreshTokenEntity != null){
            String userId = jwtProvider.validate(refreshToken);

            JwtResponseDto accessTokenData = jwtProvider.createAccessToken(userId);
            String newAccessToken = accessTokenData.getToken();
            Date accessTokenExpirationDate = accessTokenData.getExpirationDate();

            JwtResponseDto refreshTokenData = jwtProvider.createRefreshToken(userId);
            String newRefreshToken = refreshTokenData.getToken();
            Date newRefreshTokenExpirationDate = refreshTokenData.getExpirationDate();

            RefreshTokenEntity tokenEntity = refreshTokenRepository.findByRefreshToken(refreshToken);
            tokenEntity.setRefreshToken(newRefreshToken);
            tokenEntity.setExpirationDate(newRefreshTokenExpirationDate);
            refreshTokenRepository.save(tokenEntity);
            
            return GenerateNewTokensResponseDto.success(
                newAccessToken,
                newRefreshToken,
                accessTokenExpirationDate.getTime(),
                newRefreshTokenExpirationDate.getTime()
            );

        } else {
            return GenerateNewTokensResponseDto.refreshTokenFail();
        }
       
        
    }

    @Override
    @Transactional
    public ResponseEntity<?> processDeviceInfo(String accessToken, String refreshToken, String deviceInfo, HttpServletRequest request) {
        String ipAddress = IpUtils.extractIpAddress(request);
        String decodedDeviceInfo = URLDecoder.decode(deviceInfo, StandardCharsets.UTF_8);
        String userId = jwtProvider.validate(accessToken.replace("Bearer ", ""));        
        Date refreshTokenExpirationDate = new Date(jwtProvider.getExpiration(refreshToken));
        

        try {
            int deletedTokensCount = refreshTokenRepository.deleteExpiredTokens(userId, decodedDeviceInfo, ipAddress, refreshTokenExpirationDate);
            System.out.println("@@@@Deleted tokens: " + deletedTokensCount);    
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Failed to delete expired tokens");
        }
        

        try {
            System.out.println("Attempting to save refreshToken for userId: " + userId);
    
            RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
                    .userId(userId)
                    .refreshToken(refreshToken)
                    .deviceInfo(decodedDeviceInfo)
                    .ipAddress(ipAddress)
                    .expirationDate(refreshTokenExpirationDate)
                    .build();
    
            refreshTokenRepository.save(refreshTokenEntity);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Failed to save refreshToken");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);
        response.put("deviceInfo", decodedDeviceInfo);
        response.put("ipAddress", ipAddress);

        return ResponseEntity.ok(response);
    }
}
