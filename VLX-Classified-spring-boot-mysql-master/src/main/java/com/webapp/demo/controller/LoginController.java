package com.webapp.demo.controller;

import com.webapp.demo.model.*;
import com.webapp.demo.repo.UserRepo;
import com.webapp.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.226:3000"})
public class LoginController {

    @Autowired
    UserRepo userRepo;

    @Autowired
    LoginService loginService;

    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostMapping("/user/entry")
    public ResponseModelParameter<User> checkUser(@RequestBody LoginModel loginModel){
        return loginService.checkUser(loginModel);
    }

    @PostMapping("/user/check-user")
    public ResponseModelParameter<ChangePasswordCheckUser> changePasswordCheckUser(@RequestBody ChangePasswordCheckUser email)
    {
        User user=userRepo.findByEmail(email.getEmail());
        if(user.getId()==0)
            return new ResponseModelParameter<ChangePasswordCheckUser>(false,"You don't have account. Signup first");
        else
            return new ResponseModelParameter<ChangePasswordCheckUser>(true,"user found");
    }

    @PostMapping("/user/change-password")
    public ResponseModelParameter<ChangePassword> changePassword(@RequestBody ChangePassword change){
            User user=userRepo.findByEmail(change.getEmail());
            user.setPassword(passwordEncoder().encode(change.getPassword()));
            userRepo.save(user);
            return new ResponseModelParameter<ChangePassword>(true,"password changed");
    }

}
