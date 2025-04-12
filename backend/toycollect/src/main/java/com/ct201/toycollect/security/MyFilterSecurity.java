package com.ct201.toycollect.security;

import com.ct201.toycollect.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

@Configuration
@EnableWebSecurity
public class MyFilterSecurity {
    @Autowired
    CorsConfigurationSource corsConfigurationSource;

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // Tắt CSRF (nếu không cần)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/account/**", "/product/**", "/forgot-password/**", "/uploads/**").permitAll() // Cho phép truy cập các endpoint bắt đầu bằng /login/
                        .requestMatchers("/admin/**").hasRole("STAFF")
                        .anyRequest().authenticated() // Các request khác phải xác thực
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource));
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
