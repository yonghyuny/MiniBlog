package com.housing.back.provider;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.housing.back.common.JwtUtils;
import com.housing.back.dto.response.auth.JwtResponseDto;
import com.housing.back.service.secret.SecurityService;

import io.jsonwebtoken.Claims;

@Component
public class JwtProvider {
    
     @Autowired
    private SecurityService securityService;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponseDto createAccessToken(String userId) {
        // Date expiredDate = Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)); // 본래 사용할 엑세스토큰 만료기간
        Date expiredDate = Date.from(Instant.now().plus(7, ChronoUnit.DAYS)); // 팀원 편의상 엑세스토큰 기간 늘림
        String token = securityService.generateToken(userId, expiredDate);
        return new JwtResponseDto(token, expiredDate);
    }

    public JwtResponseDto createRefreshToken(String userId) {
        Date expiredDate = Date.from(Instant.now().plus(7, ChronoUnit.DAYS));
        String token = securityService.generateToken(userId, expiredDate);
        return new JwtResponseDto(token, expiredDate);
    }

    public String validate(String jwt) {
        try {
            return jwtUtils.extractUserId(jwt);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public long getExpiration(String jwt) {
        try {
            return jwtUtils.extractClaim(jwt, Claims::getExpiration).getTime();
        } catch (Exception exception) {
            exception.printStackTrace();
            return 0;
        }
    }
}
