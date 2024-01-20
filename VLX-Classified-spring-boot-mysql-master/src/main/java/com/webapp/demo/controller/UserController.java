package com.webapp.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.webapp.demo.model.Login;
import com.webapp.demo.model.ResponseModelList;
import com.webapp.demo.model.ResponseModelParameter;
import com.webapp.demo.model.User;
import com.webapp.demo.repo.UserRepo;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.226:3000"})
@RestController
public class UserController {
	
	@Autowired
	UserRepo userrepo;


	@GetMapping("/users")
	public ResponseModelList<User> getAllUser() {
		List<User> users=userrepo.getUsers();
		return new ResponseModelList<User>(true,"user list", users);
	}
	
	// get user details by id
	@GetMapping("/users/{id}")
	public ResponseModelParameter<User> getIndividualUser(@PathVariable("id") int id){
		User user=userrepo.findById(id).orElse(null);
		return new ResponseModelParameter<User>(true, "individual user data", user);
	}

	@PutMapping("/user/primemember/{id}")
	public ResponseModelParameter<User> makePrimeMember(@PathVariable("id") int id){
		User user=userrepo.findById(id).orElse(null);
		user.setPrimemember(true);
		userrepo.save(user);
		return new ResponseModelParameter<User>(true, "Thanks for becoming a member", user);
	}

	@GetMapping("/users/details")
	public ResponseModelParameter<User> getUserDetails(@RequestParam("email") String email){
		User user = userrepo.findByEmail(email);
		return new ResponseModelParameter<User>(true, "User Details", user);
	}

	// update user profile
	@PutMapping("/users/update-user")
	public ResponseModelParameter<User> updateUserProfile(@RequestBody User update)
	{
		User user=userrepo.findById(update.getId()).orElse(null);
		user.setUsername(update.getUsername());
		user.setContact(update.getContact());
		user.setAddress(update.getAddress());
		if(user.getRole().equals("seller"))
		{
			user.setCreditCard(update.getCreditCard());
		}
		userrepo.save(user);
		return new ResponseModelParameter<User>(true,"user profile updated",user);
	}
}
