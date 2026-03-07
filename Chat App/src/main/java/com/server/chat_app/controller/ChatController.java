package com.server.chat_app.controller;

import com.server.chat_app.entity.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    @MessageMapping("/send-message") // used for messages sent from clients to the server </chat-server/send-message>
    @SendTo("/chat-client/messages") // used for broadcasting messages to clients (used with client subscriptions)
    public ChatMessage sendMessage(ChatMessage message) {
        return message;
    }

    @GetMapping("/chat-app")
    public String getChatApp() {
        return "chat-app";
    }
}
