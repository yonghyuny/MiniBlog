package com.housing.back.dto.response.comment;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class CreatePostResponseDto extends ResponseDto {
    private String nickname;
    private String title;
    private String content;

    private CreatePostResponseDto (String nickname, String title, String content){
        super();
        this.nickname = nickname;
        this.title = title;
        this.content = content;
    }

    public static ResponseEntity<CreatePostResponseDto> success (String nickname, String title, String content){
        CreatePostResponseDto responseBody = new CreatePostResponseDto(nickname, title, content);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
