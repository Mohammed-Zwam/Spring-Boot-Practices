package com.server.chat_app.entity;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessage {
    private Long id;
    private String messageContent;
    private String sender;
}

