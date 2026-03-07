package com.server.chat_app.controller;

import com.server.chat_app.entity.ActiveUser;
import com.server.chat_app.repository.ActiveUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ActiveUserController {
    @Autowired
    private ActiveUserRepo activeUserRepo;

    @GetMapping("/active-users")
    public List<ActiveUser> getActiveUsers() {
        return activeUserRepo.findAll();
    }
}
