package com.housing.back.dto.response.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class CreateCommentResponseDto extends ResponseDto {
    private String nickname;
    private String content;

    private CreateCommentResponseDto (String nickname, String content){
        super();
        this.nickname = nickname;
        this.content = content;
    }

    public static ResponseEntity<CreateCommentResponseDto> success (String nickname, String content){
        CreateCommentResponseDto responseBody = new CreateCommentResponseDto(nickname, content);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}