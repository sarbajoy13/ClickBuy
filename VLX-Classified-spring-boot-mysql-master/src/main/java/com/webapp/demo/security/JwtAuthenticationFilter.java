package com.webapp.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webapp.demo.model.User;
import com.webapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final UserRepo userRepo;

    @Autowired
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtConfig jwtConfig, UserRepo userRepo) {
        this.authenticationManager = authenticationManager;
        this.jwtConfig = jwtConfig;
        this.userRepo = userRepo;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        //User user = (User)

        String email = authResult.getName();
        User user = userRepo.findByEmail(email);
        if(user.getId() != 0) {
            Algorithm algorithm = jwtConfig.getAlgorithm();
            String accessToken = JWT.create().withSubject(user.getEmail()).withExpiresAt(Date.valueOf(LocalDate.now().plusDays(jwtConfig.getAccessTokenExpirationAfterDays()))).withIssuer(request.getRequestURL().toString()).withClaim("role", user.getRole()).sign(algorithm);
            Map<String, String> token = new HashMap<>();
            token.put("access_token", accessToken);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), token);
        }else{
            Map<String, String> token = new HashMap<>();
            token.put("access_token", "Wrong credentials");
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), token);
        }
    }
}
