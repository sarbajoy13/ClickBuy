package com.webapp.demo.security;

import com.webapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthDetailsService authDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    @Autowired
    UserRepo userRepo;

    @Autowired
    public SecurityConfig(AuthDetailsService authDetailsService, PasswordEncoder passwordEncoder, JwtConfig jwtConfig) {
        this.authDetailsService = authDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager(), jwtConfig, userRepo);
        jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");

        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/api/login/**").permitAll();
        http.authorizeRequests().antMatchers("/user/**").permitAll();
        http.authorizeRequests().antMatchers("/donate/**").permitAll();
        //http.authorizeRequests().antMatchers("/hospital/**").hasAnyAuthority(Role.HOSPITALADMIN.name());
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(jwtAuthenticationFilter);
        http.addFilterBefore(new JwtAuthorizationFilter(jwtConfig, authDetailsService), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList(jwtConfig.getAuthorizationHeader(), jwtConfig.getCacheControlHeader(), jwtConfig.getContentTypeHeader()));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
