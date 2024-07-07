package com.housing.back.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.housing.back.entity.UserEntity;
import com.housing.back.provider.JwtProvider;
import com.housing.back.repository.UserRepository;
import com.housing.back.service.JwtBlacklistService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final JwtBlacklistService jwtBlacklistService;

    @Override
    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                try {
                    System.out.println("JwtAuthenticationFilter가 요청을 처리하는 중입니다.");
                    // JWT 토큰을 파싱해서 가져옴
                    String accessToken = parseBearerToken(request);
                    String refreshToken = request.getHeader("Refresh-Token");

                    if(accessToken == null && refreshToken == null) {
                        System.out.println("요청 헤더에 JWT 토큰을 찾을 수 없습니다.");
                        filterChain.doFilter(request, response);
                        return;
                    }

                    ///////////////////////////////////////////////////////////////////

                    // if (jwtBlacklistService.isBlacklisted(token)) {
                    //     System.out.println("블랙리스트에 등록된 토큰입니다.");
                    //     response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    //     return;
                    // }
                    String token = accessToken != null ? accessToken : refreshToken;

                    try {
                        if (jwtBlacklistService.isBlacklisted(token)) {
                            System.out.println("블랙리스트에 등록된 토큰입니다.");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            return;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        System.out.println("블랙리스트 조회 중 오류 발생: " + e.getMessage());
                    }

                    ////////////////////////////////////////////////////////////////

                    // JWT 토큰을 검증하고 유효한 사용자 ID를 가져옴
                    // 여기서 사용자 아이디를 가져오네?
                    String userId = jwtProvider.validate(token);
                    System.out.println("토큰 검증: " + userId);
                    if (userId == null){
                        System.out.println("토큰 유효성 검사에 실패했거나 사용자 ID가 null입니다.");
                        filterChain.doFilter(request, response);
                        return;
                    }

                    // 사용자 ID를 통해 데이터베이스에서 사용자 정보를 가져옴
                    UserEntity userEntity = userRepository.findByUserId(userId);

                    if (userEntity == null) {
                        System.out.println("사용자를 찾을 수 없습니다: " + userId);
                        filterChain.doFilter(request, response);
                        return;
                    }

                    String role = userEntity.getRole(); // role : ROLE_USER, ROLE_ADMIN
                    System.out.println("사용자 역할: " + role);

                    System.out.println(role); // null로뜸 롤없음 그럼 롤을 안쓰면되지않나?
                    // 사용자의 권한을 설정
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority(role));

                    // 새로운 SecurityContext를 생성하고 인증 정보를 설정
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    AbstractAuthenticationToken authenticationToken = 
                        new UsernamePasswordAuthenticationToken(userId, null, authorities);
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // SecurityContext에 인증 정보 설정
                    securityContext.setAuthentication(authenticationToken);
                    SecurityContextHolder.setContext(securityContext);

                    System.out.println("사용자에 대한 인증 성공: " + userId);

                } catch (Exception exception) {
                    System.out.println("JWT 처리 중 예외가 발생했습니다.");
                    exception.printStackTrace();
                }
                // 다음 필터 체인 실행
                filterChain.doFilter(request, response);
    }

    private String parseBearerToken (HttpServletRequest request) {
        // 요청 헤더에서 Authorization 헤더를 가져옴
        String authorization = request.getHeader("Authorization");
        System.out.println("Authorization 헤더: " + authorization);
        // Authorization 헤더가 존재하는지 확인
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if(!hasAuthorization) return null;
        // Authorization 헤더가 "Bearer "로 시작하는지 확인
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        // "Bearer " 이후의 토큰 값을 반환 'Berrer ' = 길이 7임
        String token = authorization.substring(7);
        return token;

    }
    
}
