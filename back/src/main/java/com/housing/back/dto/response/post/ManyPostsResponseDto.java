// package com.housing.back.dto.response.post;

// import java.util.List;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import com.housing.back.dto.response.ResponseDto;

// import lombok.AllArgsConstructor;
// import lombok.Getter;

// @Getter
// @AllArgsConstructor
// public class ManyPostsResponseDto extends ResponseDto  {
//     private List<SimplePostResponseDto> postList;

//     public static ResponseEntity<ManyPostsResponseDto> success(List<SimplePostResponseDto> postList) {
//         ManyPostsResponseDto responseBody = new ManyPostsResponseDto(postList);
//         return ResponseEntity.status(HttpStatus.OK).body(responseBody);
//     }
    
// }


package com.housing.back.dto.response.post;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.util.Collections; 
@Getter
@Builder
public class ManyPostsResponseDto extends ResponseDto  {
    private List<SimplePostResponseDto> postList;

    private ManyPostsResponseDto(List<SimplePostResponseDto> postList) {
        super();
        this.postList = postList;
    }

    public static ResponseEntity<ManyPostsResponseDto> success(List<SimplePostResponseDto> postList) {
        ManyPostsResponseDto responseBody = new ManyPostsResponseDto(postList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    public static ResponseEntity<ManyPostsResponseDto> success(SimplePostResponseDto post) {
        ManyPostsResponseDto responseBody = new ManyPostsResponseDto(Collections.singletonList(post));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}

