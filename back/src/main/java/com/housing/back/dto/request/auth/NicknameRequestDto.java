package com.housing.back.dto.request.auth;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor // 추가
public class NicknameRequestDto {
    
    @NotBlank
    private String nickname;
}
