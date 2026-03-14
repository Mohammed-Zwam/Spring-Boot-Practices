package com.server.chat_app.repository;

import com.server.chat_app.entity.ActiveUser;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ActiveUserRepo {
    private final List<ActiveUser> activeUsers = new ArrayList<>();

    public void save(ActiveUser activeUser) {
        activeUsers.add(activeUser);
    }

    public List<ActiveUser> findAll() {
        return activeUsers;
    }

    public void delete(String sessionId) {
        activeUsers.removeIf(user -> user.getSessionId().equals(sessionId));
    }
}
