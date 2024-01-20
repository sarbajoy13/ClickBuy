package com.webapp.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webapp.demo.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{

	User findByEmail(String email);
	
	@Query(value = "select * from user u where u.role<>\"admin\"",nativeQuery = true)
	List<User> getUsers();
}
