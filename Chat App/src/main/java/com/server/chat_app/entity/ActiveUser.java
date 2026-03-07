package com.server.chat_app.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ActiveUser {
    private String username;
    private String sessionId;
}
