package com.housing.back.service;


import com.housing.back.common.JwtUtils;
import com.housing.back.dto.request.comment.CommentRequestDto;
import com.housing.back.dto.response.post.CreateCommentResponseDto;
import com.housing.back.entity.CommentEntity;
import com.housing.back.entity.NickNameEntity;
import com.housing.back.entity.PostEntity;
import com.housing.back.repository.CommentRepository;
import com.housing.back.repository.NicknameRepository;
import com.housing.back.repository.PostRepository;


import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private NicknameRepository nicknameRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public ResponseEntity<CreateCommentResponseDto> createComment(HttpServletRequest request, CommentRequestDto commentRequestDto) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

        // 닉네임 변환
        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        String nickname = nicknameEntityOptional.get().getNickname();

        // 포스트 찾기
        Optional<PostEntity> postEntityOptional = postRepository.findById(commentRequestDto.getPostId());
        if (!postEntityOptional.isPresent()) {
            throw new RuntimeException("포스트를 찾을 수 없습니다.");
        }

        PostEntity postEntity = postEntityOptional.get();

        // 댓글 생성
        CommentEntity comment = new CommentEntity();
        comment.setNickname(nickname);
        comment.setContent(commentRequestDto.getContent());
        comment.setPost(postEntity);
        commentRepository.save(comment);

        return CreateCommentResponseDto.success(nickname, commentRequestDto.getContent());
    }
}