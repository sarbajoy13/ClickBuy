package com.webapp.demo.repo;

import com.webapp.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserRepoImpl implements UserReportCustom {

    @Autowired
    UserRepo userRepo;

    @Override
    public User findByEmail(String email){
        List<User> userList = userRepo.findAll();
        for(User item : userList){
            if(item.getEmail().equals(email)){
                return item;
            }
        }

        User notUser = new User();
        notUser.setUsername("notFound");
        return  notUser;
    }
}
