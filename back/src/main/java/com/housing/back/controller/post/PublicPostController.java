package com.housing.back.controller.post;
// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.housing.back.dto.response.post.ManyPostsResponseDto;
import com.housing.back.service.PostService;


import java.util.Map;



@Controller
@RequestMapping("/api/v1/public/posts")
public class PublicPostController {
    @Autowired
    PostService postService;

    @PostMapping("/increment-view/{postId}") // 성공 - 게시글 클릭 조회수 1증가
    public ResponseEntity<Void> incrementViewCount(@PathVariable("postId") Long postId) {
        postService.incrementViewCount(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/by-nickname") // 성공 - 닉네임으로 해당 게시글리스트 불러오기
    public ResponseEntity<ManyPostsResponseDto> getPostsByNickname(@RequestBody Map<String, String> requestBody) {
        String nickname = requestBody.get("nickname");
        ResponseEntity<ManyPostsResponseDto> response = postService.getPostsByNickname(nickname);
        return response;
    }

        
    @GetMapping // 성공 - 모든유저 최신 게시글 20개씩 
    public ResponseEntity<ManyPostsResponseDto> getAllPosts(@RequestParam("page") int page) {
        ResponseEntity<ManyPostsResponseDto> response = postService.getAllPosts(page);
        return response;
    }

    @GetMapping("/{id}") // 성공 - postId로 클릭한 게시글 불러오기
    public ResponseEntity<ManyPostsResponseDto> getPostById(@PathVariable("id") Long id) {
        ResponseEntity<ManyPostsResponseDto> response = postService.getPostById(id);
        return response;
    }
    @PostMapping("/by-nickname-paged") // 성공 - 닉네임으로 해당 게시글리스트 20개씩 불러오기
    public ResponseEntity<ManyPostsResponseDto> getPagedPostsByNickname(@RequestBody Map<String, String> requestBody, @RequestParam("page") int page) {
        String nickname = requestBody.get("nickname");
        ResponseEntity<ManyPostsResponseDto> response = postService.getPagedPostsByNickname(nickname, page);
        return response;
    }
}
