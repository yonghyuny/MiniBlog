package com.housing.back.dto.request.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostListRequestDto {
    private String userId; // 특정 사용자 게시글 조회용
    private int page;      // 페이지 번호
    private int size;      // 페이지 당 게시물 수
}