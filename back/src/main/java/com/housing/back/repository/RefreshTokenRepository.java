package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.Date;


import com.housing.back.entity.RefreshTokenEntity;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {    

    RefreshTokenEntity findByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);

    @Modifying
    @Transactional
    @Query("DELETE FROM RefreshTokenEntity r WHERE r.userId = :userId AND r.deviceInfo = :deviceInfo AND r.ipAddress = :ipAddress AND r.expirationDate < :expirationDate")
    int deleteExpiredTokens(@Param("userId") String userId, @Param("deviceInfo") String deviceInfo, @Param("ipAddress") String ipAddress, @Param("expirationDate") Date expirationDate);
}
