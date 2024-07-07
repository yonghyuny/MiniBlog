package com.housing.back.service.implement;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


import com.housing.back.entity.CustomOAuth2User;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        
        OAuth2User oAuth2User = super.loadUser(request);
        String oauth2ClientName = request.getClientRegistration().getClientName();

        UserEntity userEntity = null;
        String userId = null;
        String email = "email@email.com";

        if (oauth2ClientName.equals("kakao")) {
            userId = "kakao_" + oAuth2User.getAttributes().get("id");
            userEntity = new UserEntity(userId, email ,"kakao");
        }

        if (oauth2ClientName.equals("naver")){
            Map<String, String> reponseMap = (Map<String, String>)oAuth2User.getAttributes().get("response");
            userId = "naver_" + reponseMap.get("id").substring(0,14);
            email = reponseMap.get("email");
            userEntity = new UserEntity(userId, email, "naver");
        }

        userRepository.save(userEntity);

        return new CustomOAuth2User(userId);

    }
    
}
