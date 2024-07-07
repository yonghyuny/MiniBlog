package com.housing.back.controller.post;



import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.housing.back.dto.request.comment.CommentRequestDto;
import com.housing.back.dto.response.post.CreateCommentResponseDto;
import com.housing.back.service.CommentService;

@RestController
@RequestMapping("/api/v1/private/comments")
public class AuthCommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CreateCommentResponseDto> createComment(HttpServletRequest request, @RequestBody CommentRequestDto commentRequestDto) {
        ResponseEntity<CreateCommentResponseDto> response = commentService.createComment(request, commentRequestDto);
        return response;
    }
}