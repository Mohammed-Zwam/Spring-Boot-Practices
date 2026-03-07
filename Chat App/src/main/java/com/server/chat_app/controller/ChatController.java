package com.server.chat_app.controller;

import com.server.chat_app.dto.UserState;
import com.server.chat_app.entity.ActiveUser;
import com.server.chat_app.entity.ChatMessage;
import com.server.chat_app.repository.ActiveUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    @Autowired
    private ActiveUserRepo activeUserRepo;

    @MessageMapping("/send-message") // used for messages sent from clients to the server </chat-server/send-message>
    @SendTo("/chat-client/messages") // used for broadcasting messages to clients (used with client subscriptions)
    public ChatMessage sendMessage(ChatMessage message) {
        return message;
    }

    @MessageMapping("/join")
    @SendTo("/chat-client/user-state")
    public UserState sendMessage(String username, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("Username", username);
        activeUserRepo.save(new ActiveUser(username, headerAccessor.getSessionId()));
        return UserState.builder().username(username).state("join").build();
    }


    @GetMapping("/chat-app")
    public String getChatApp() {
        return "chat-app";
    }
}
