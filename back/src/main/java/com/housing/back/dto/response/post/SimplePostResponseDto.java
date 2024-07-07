package com.housing.back.dto.response.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.housing.back.entity.PostEntity;
import java.util.stream.Collectors;

import java.util.List;

// @Getter
// @Builder
// public class SimplePostResponseDto {
//     private Long postId;
//     private String userId;
//     private String title;
//     private String content;
//     private LocalDateTime createdAt;
//     private LocalDateTime updatedAt;
//     private int viewCount; // viewCount 필드 추가
//     private int likeCount; // likeCount 필드 추가
//     /////////////////////////////////////////
//     private List<CommentDto> comments;

//     @Getter
//     @Builder
//     public static class CommentDto {
//         private Long commentId;
//         private String nickname;
//         private String content;
//         private LocalDateTime createdAt;
//     }

//     public static SimplePostResponseDto fromEntity(PostEntity postEntity) {
//         List<CommentDto> comments = postEntity.getComments().stream()
//             .map(comment -> CommentDto.builder()
//                 .commentId(comment.getCommentId())
//                 .nickname(comment.getNickname())
//                 .content(comment.getContent())
//                 .createdAt(comment.getCreatedAt())
//                 .build())
//             .collect(Collectors.toList());

//         return SimplePostResponseDto.builder()
//             .postId(postEntity.getPostId())
//             .userId(postEntity.getNickname())
//             .title(postEntity.getTitle())
//             .content(postEntity.getContent())
//             .createdAt(postEntity.getCreatedAt())
//             .updatedAt(postEntity.getUpdatedAt())
//             .viewCount(postEntity.getViewCount())
//             .likeCount(postEntity.getLikeCount())
//             .comments(comments)
//             .build();
//     }
// }
///////////////////////////////////////////////////////////
@Getter
@Builder
public class SimplePostResponseDto {
    private Long postId;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int viewCount; // viewCount 필드 추가
    private int likeCount; // likeCount 필드 추가
    private List<CommentDto> comments;

    @Getter
    @Builder
    public static class CommentDto {
        private Long commentId;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
    }

    public static SimplePostResponseDto fromEntity(PostEntity postEntity) {
        List<CommentDto> comments = postEntity.getComments().stream()
            .map(comment -> CommentDto.builder()
                .commentId(comment.getCommentId())
                .nickname(comment.getNickname())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build())
            .collect(Collectors.toList());

        return SimplePostResponseDto.builder()
            .postId(postEntity.getPostId())
            .nickname(postEntity.getNickname())
            .title(postEntity.getTitle())
            .content(postEntity.getContent())
            .createdAt(postEntity.getCreatedAt())
            .updatedAt(postEntity.getUpdatedAt())
            .viewCount(postEntity.getViewCount())
            .likeCount(postEntity.getLikeCount())
            .comments(comments)
            .build();
    }
}