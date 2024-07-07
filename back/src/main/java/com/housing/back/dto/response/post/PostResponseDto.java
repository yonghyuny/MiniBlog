package com.housing.back.dto.response.post;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

import com.housing.back.dto.response.ResponseDto;
import com.housing.back.entity.PostEntity;

@Getter
@Builder
public class PostResponseDto extends ResponseDto{
    private Long postId;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private PostResponseDto (Long postId, String nickname, String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt){
        super();
        this.postId = postId;
        this.nickname = nickname;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static PostResponseDto fromEntity(PostEntity postEntity) {
        return new PostResponseDto(
            postEntity.getPostId(),
            postEntity.getNickname(),
            postEntity.getTitle(),
            postEntity.getContent(),
            postEntity.getCreatedAt(),
            postEntity.getUpdatedAt()
        );
    }
}