package com.webapp.demo.security;

import com.webapp.demo.model.User;
import com.webapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class AuthDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Autowired
    public AuthDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepo.findByEmail(email);

        if (user.getId() == 0) {
            throw new UsernameNotFoundException("User not found in the database");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);

    }

    public User loadUserByEmail(String email) throws UsernameNotFoundException{
        User user = userRepo.findByEmail(email);

        if (user.getId() == 0) {
            throw new UsernameNotFoundException("User not found in the database");
        }

//        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));

        return user;
    }
}
