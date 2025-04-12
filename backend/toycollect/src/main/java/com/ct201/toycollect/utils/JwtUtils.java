package com.ct201.toycollect.utils;

import com.ct201.toycollect.dto.AccountDTO;
import com.ct201.toycollect.entity.Accounts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.PublicJwk;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${jwt.secretKey}")
    private String secretKey;

    public String generateToken(AccountDTO subject) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        return Jwts.builder()
                .subject(subject.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(key)
                .claim("scope", subject.getRole())
                .compact();
    }

    public SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public Claims extractClaims(String token) {
//        System.out.println("extractClaims: " + getSignKey());
        return Jwts.parser()
                .verifyWith(getSignKey())  // Xác thực token
                .build()
                .parseSignedClaims(token)  // Giải mã
                .getPayload();             // Trả về Claims
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject(); // Lấy username từ "sub"
    }

    public boolean verifyToken(String token) {
        try {
            extractClaims(token);
            return true; // Token hợp lệ
        } catch (Exception e) {
//            System.out.println("verifyToken: " + e.getMessage());
            return false; // Token không hợp lệ
        }
    }


}
