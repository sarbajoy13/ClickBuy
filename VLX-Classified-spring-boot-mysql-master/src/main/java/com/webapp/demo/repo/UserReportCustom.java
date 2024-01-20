package com.webapp.demo.repo;

import com.webapp.demo.model.User;

public interface UserReportCustom {

    User findByEmail(String email);
}
