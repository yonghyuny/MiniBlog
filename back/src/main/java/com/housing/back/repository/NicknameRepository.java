package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.housing.back.entity.NickNameEntity;
import java.util.Optional;


@Repository
public interface NicknameRepository extends JpaRepository<NickNameEntity, Long> {
    boolean existsByNickname(String nickname);
    Optional<NickNameEntity> findByUserId(String userId);
    Optional<NickNameEntity> findByNickname(String nickname);
}