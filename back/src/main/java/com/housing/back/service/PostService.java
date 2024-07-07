package com.housing.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.housing.back.common.JwtUtils;
import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;

import com.housing.back.dto.request.comment.CommentRequestDto;
import com.housing.back.dto.request.post.PostRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.comment.CreatePostResponseDto;
import com.housing.back.dto.response.post.CreateCommentResponseDto;
import com.housing.back.dto.response.post.IsOwnerResponseDto;
import com.housing.back.dto.response.post.ManyPostsResponseDto;
import com.housing.back.dto.response.post.SimplePostResponseDto;

import com.housing.back.entity.CommentEntity;
import com.housing.back.entity.NickNameEntity;
import com.housing.back.entity.PostEntity;
import com.housing.back.entity.PostLikeEntity;

import com.housing.back.repository.CommentRepository;
import com.housing.back.repository.NicknameRepository;
import com.housing.back.repository.PostLikeRepository;
import com.housing.back.repository.PostRepository;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;



@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private NicknameRepository nicknameRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;
    
    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public ResponseEntity<CreatePostResponseDto> createPost(HttpServletRequest request, PostRequestDto postRequestDto) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);
        String title = postRequestDto.getTitle();
        String content = postRequestDto.getContent();


        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        String nickname = nicknameEntityOptional.get().getNickname();

        // 여기에서 userid랑 연관되는거 찾아야돼
        PostEntity post = new PostEntity();
        post.setNickname(nickname);
        post.setTitle(title);
        post.setContent(content);
        postRepository.save(post);

        return CreatePostResponseDto.success(nickname, title, content);
    }

    @Transactional
    public void likePost(HttpServletRequest request, Long postId) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        String nickname = nicknameEntityOptional.get().getNickname();
        System.out.println("@@@@@@@@@@@@@@@@@ 닉네임: " + nickname);

        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        Optional<PostLikeEntity> postLikeOptional = postLikeRepository.findByPostAndNickname(post, nickname);

        if (postLikeOptional.isPresent()) {
            postLikeRepository.delete(postLikeOptional.get());
            post.setLikeCount(post.getLikeCount() - 1);
        } else {
            PostLikeEntity postLike = new PostLikeEntity();
            postLike.setPost(post);
            postLike.setNickname(nickname);
            postLikeRepository.save(postLike);
            post.setLikeCount(post.getLikeCount() + 1);
        }

        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public boolean isPostLiked(HttpServletRequest request, Long postId) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        String nickname = nicknameEntityOptional.get().getNickname();

        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        Optional<PostLikeEntity> postLikeOptional = postLikeRepository.findByPostAndNickname(post, nickname);

        return postLikeOptional.isPresent();
    }

    @Transactional
    public void incrementViewCount(Long postId) {
        PostEntity postEntity = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        postEntity.setViewCount(postEntity.getViewCount() + 1);
        postRepository.save(postEntity);
    }

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

    @Transactional(readOnly = true)
    public ResponseEntity<ManyPostsResponseDto> getMyPosts(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

        // 닉네임 변환
        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        String nickname = nicknameEntityOptional.get().getNickname();

        List<PostEntity> postEntities = postRepository.findByNickname(nickname);
        List<SimplePostResponseDto> responseDtoList = postEntities.stream()
            .map(SimplePostResponseDto::fromEntity)
            .collect(Collectors.toList());

        return ManyPostsResponseDto.success(responseDtoList);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ManyPostsResponseDto> getPostsByNickname(String nickname) {
        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByNickname(nickname);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        List<PostEntity> postEntities = postRepository.findByNickname(nickname);
        List<SimplePostResponseDto> responseDtoList = postEntities.stream()
            .map(SimplePostResponseDto::fromEntity)
            .collect(Collectors.toList());

        return ManyPostsResponseDto.success(responseDtoList);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ManyPostsResponseDto> getAllPosts(int page) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<PostEntity> postEntities = postRepository.findAll(pageable);
        List<SimplePostResponseDto> responseDtoList = postEntities.stream()
            .map(SimplePostResponseDto::fromEntity)
            .collect(Collectors.toList());

        return ManyPostsResponseDto.success(responseDtoList);
    }   

    @Transactional(readOnly = true)
    public ResponseEntity<ManyPostsResponseDto> getPostById(Long id) {
        PostEntity postEntity = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        SimplePostResponseDto response = SimplePostResponseDto.fromEntity(postEntity);
        return ManyPostsResponseDto.success(response);
    }

    @Transactional
    public ResponseEntity<ResponseDto> deletePost(HttpServletRequest request, Long id) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

    // 닉네임 변환
    Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
    if (!nicknameEntityOptional.isPresent()) {
        throw new RuntimeException("닉네임을 찾을 수 없습니다.");
    }

    String nickname = nicknameEntityOptional.get().getNickname();

        PostEntity post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        
        if (!post.getNickname().equals(nickname)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL));
        }

        try {
            postRepository.delete(post);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto());
    }

    @Transactional
    public ResponseEntity<ResponseDto> updatePost(HttpServletRequest request, Long id, PostRequestDto postRequestDto) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractUserId(token);

        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
    if (!nicknameEntityOptional.isPresent()) {
        throw new RuntimeException("닉네임을 찾을 수 없습니다.");
    }

    String nickname = nicknameEntityOptional.get().getNickname();

        PostEntity post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        
        if (!post.getNickname().equals(nickname)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL));
        }

        try {
            post.setTitle(postRequestDto.getTitle());
            post.setContent(postRequestDto.getContent());    
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<IsOwnerResponseDto> checkPostOwnership(HttpServletRequest request, Long postId) {
        try {
            // 토큰에서 사용자 ID 추출
            String token = request.getHeader("Authorization").substring(7);
            String userId = jwtUtils.extractUserId(token);
    
            // 사용자 ID로 닉네임 조회
            Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByUserId(userId);
            if (!nicknameEntityOptional.isPresent()) {
                throw new RuntimeException("닉네임을 찾을 수 없습니다. 사용자 ID: " + userId);
            }
    
            String nickname = nicknameEntityOptional.get().getNickname();
    
            // 게시물 소유자 닉네임 조회
            PostEntity post = postRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다. 게시물 ID: " + postId));
            
            boolean isOwner = post.getNickname().equals(nickname);
            
            IsOwnerResponseDto responseDto = new IsOwnerResponseDto(isOwner);
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    
        } catch (RuntimeException e) {
            // 예외 발생 시 로그를 남기고 클라이언트에게 에러 메시지 반환
            System.err.println("Error in checkPostOwnership: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new IsOwnerResponseDto(false));
        }
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ManyPostsResponseDto> getPagedPostsByNickname(String nickname, int page) {
        Optional<NickNameEntity> nicknameEntityOptional = nicknameRepository.findByNickname(nickname);
        if (!nicknameEntityOptional.isPresent()) {
            throw new RuntimeException("닉네임을 찾을 수 없습니다.");
        }

        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<PostEntity> postEntities = postRepository.findByNickname(nickname, pageable);
        List<SimplePostResponseDto> responseDtoList = postEntities.stream()
            .map(SimplePostResponseDto::fromEntity)
            .collect(Collectors.toList());

        return ManyPostsResponseDto.success(responseDtoList);
    }
   
}
