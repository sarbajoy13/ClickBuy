package com.webapp.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;
    private final AuthDetailsService authDetailsService;

    @Autowired
    public JwtAuthorizationFilter(JwtConfig jwtConfig, AuthDetailsService authDetailsService) {
        this.jwtConfig = jwtConfig;
        this.authDetailsService = authDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/api/login")) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());
            if (authorizationHeader != null && authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
                try {
                    String token = authorizationHeader.substring(jwtConfig.getTokenPrefix().length() + 1);

                    Algorithm algorithm = jwtConfig.getAlgorithm();

                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String email = decodedJWT.getSubject();
                    String role = decodedJWT.getClaim("role").toString();

                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority(role));
//                    Arrays.stream(roles).forEach(role -> {
//                        authorities.add(new SimpleGrantedAuthority(role));
//                    });

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    request.setAttribute("user_id", authDetailsService.loadUserByEmail(email).getId());
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    response.setHeader("error", e.getMessage());
                    response.setStatus(FORBIDDEN.value());
                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", e.getMessage());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }

    }

}
