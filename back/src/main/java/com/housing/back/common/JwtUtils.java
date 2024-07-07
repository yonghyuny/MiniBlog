package com.housing.back.common;

import io.jsonwebtoken.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.housing.back.service.secret.SecurityService;

import java.util.function.Function;

@Component
public class JwtUtils {

    @Autowired
    private SecurityService securityService;

    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = securityService.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
}
