package com.housing.back.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.housing.back.dto.request.post.PostRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.comment.CreatePostResponseDto;
import com.housing.back.dto.response.post.IsOwnerResponseDto;
import com.housing.back.dto.response.post.ManyPostsResponseDto;
import com.housing.back.service.PostService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;



@Controller
@RequestMapping("/api/v1/private/posts")
public class AuthPostController {
    @Autowired
    PostService postService;

    @PostMapping // 성공 - 인증된사용자 게시글 작성
    public ResponseEntity<CreatePostResponseDto> createPost(HttpServletRequest request, @RequestBody PostRequestDto postRequestDto) {
        ResponseEntity<CreatePostResponseDto> response = postService.createPost(request, postRequestDto);
        return response;
    }

    @GetMapping("/my") // 성공 - 인증된 사용자 자신의 게시글 가져오기
    public ResponseEntity<ManyPostsResponseDto> getMyPosts(HttpServletRequest request) {
        ResponseEntity<ManyPostsResponseDto> response = postService.getMyPosts(request);
        return response;
    }

    @GetMapping("/is-owner/{id}")
    public ResponseEntity<IsOwnerResponseDto> checkPostOwnership(HttpServletRequest request, @PathVariable("id") Long postId) {
        ResponseEntity<IsOwnerResponseDto> response = postService.checkPostOwnership(request, postId);
        return response;
    }

    @DeleteMapping("/{id}") // 성공 - 인증된 사용자 자신의 게시글 삭제
    public ResponseEntity<ResponseDto> deletePost(HttpServletRequest request, @PathVariable("id") Long id) {
        ResponseEntity<ResponseDto> response = postService.deletePost(request, id);
        return response;
    }

    @PutMapping("/{id}") // 성공 - 인증된 사용자 자신의 게시글 수정
    public ResponseEntity<ResponseDto> updatePost(HttpServletRequest request, @PathVariable("id") Long id, @RequestBody PostRequestDto postRequestDto) {
        ResponseEntity<ResponseDto> response = postService.updatePost(request, id, postRequestDto);
        return response;
    }

    @PostMapping("/like") // 성공 - 인증된 사용자 좋아요클릭 로직 - 누른적있으면 -1 - 누른적없으면 +1
    public ResponseEntity<?> likePost(HttpServletRequest request, @RequestBody Map<String, Long> requestBody) {
        Long postId = requestBody.get("postId");
        postService.likePost(request, postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/is-liked") // 성공 - 특정 게시글 접속시 랜더링될때 좋아요 누른적있는지 확인하기 위함 - 누른적있으면 -true, 누른적없으면 -false
    public ResponseEntity<Boolean> isPostLiked(HttpServletRequest request, @RequestBody Map<String, Long> requestBody) {
        Long postId = requestBody.get("postId");
        boolean isLiked = postService.isPostLiked(request, postId);
        return ResponseEntity.ok(isLiked);
    }
}
