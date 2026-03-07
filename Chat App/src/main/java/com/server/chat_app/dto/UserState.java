package com.server.chat_app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserState {
    private String username;
    private String state;
}
