package com.webapp.demo.service;

import com.webapp.demo.model.LoginModel;
import com.webapp.demo.model.ResponseModel;
import com.webapp.demo.model.ResponseModelParameter;
import com.webapp.demo.model.User;
import com.webapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    UserRepo userRepo;

    public ResponseModelParameter<User> checkUser(LoginModel loginModel){

        User user = userRepo.findByEmail(loginModel.getEmail());
        // If user is present, return login successful
        if (user.getId() != 0) {
            if (user.getPassword().equals(loginModel.getPassword())) {

                return new ResponseModelParameter<User>(true, "Login Successful", user);
            }
            return new ResponseModelParameter<>(false, "Password Incorrect", null);
        }
        return new ResponseModelParameter<>(false, "User Not Found", null);
    }
}
