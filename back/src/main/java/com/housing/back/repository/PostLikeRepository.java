package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.housing.back.entity.PostEntity;
import com.housing.back.entity.PostLikeEntity;

import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
    Optional<PostLikeEntity> findByPostAndNickname(PostEntity post, String nickname);
}