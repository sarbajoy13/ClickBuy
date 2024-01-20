package com.webapp.demo.controller;

import com.webapp.demo.model.ResponseModelParameter;
import com.webapp.demo.model.SendOTP;
import com.webapp.demo.model.User;
import com.webapp.demo.model.VerifyOTP;
import com.webapp.demo.repo.UserRepo;
import com.webapp.demo.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.226:3000"})
public class SignupController {
    int otp;
    @Autowired
    UserRepo userRepo;

    @Autowired
    SendEmailService emailService;

    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // send otp to email address
    @PostMapping("/user/send-otp")
    public ResponseModelParameter<SendOTP> sendEmail(@RequestBody SendOTP sendOTP) {
        Random random = new Random();
        otp=random.nextInt(999999 - 100000) + 100000;
        if(sendOTP.getName()==null)
            sendOTP.setName("Sir/ Madam");
        String body="Hello "+sendOTP.getName()+",\n\tIn ClickBuy your one time password is "+String.valueOf(otp)+" .It will be valid for 3 minutes. Don't Share this with anybody";
        String topic="OTP for ClickBuy";
        emailService.sendEmail(sendOTP.getEmail(),body,topic);
        return new ResponseModelParameter<SendOTP>(true,"otp sent to mail");
    }

    // validate otp

    @PostMapping("/user/validate-otp")
    public ResponseModelParameter<VerifyOTP> validateOTP(@RequestBody VerifyOTP verifyOTP)
    {
        if(otp==verifyOTP.getOtp())
        {
            otp=0;
            return new ResponseModelParameter<VerifyOTP>(true,"otp is correct");
        }
        else
            return new ResponseModelParameter<VerifyOTP>(false,"incorrect otp");
    }

    @PostMapping("/user/create")
    public ResponseModelParameter<User> createUser(@RequestBody User user){
        User user1 = userRepo.findByEmail(user.getEmail());
        if(user1.getId() != 0){
            return new ResponseModelParameter<User>(false, "User already present. Login", null);
        }
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        User newUser = userRepo.save(user);
        return new ResponseModelParameter<User>(true, "Signup Successfull", newUser);
    }

}
