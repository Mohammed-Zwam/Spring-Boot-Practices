package com.server.chat_app.entity;


import lombok.Getter;
import lombok.Setter;


public class ChatMessage {
    private String messageContent;
    private String sender;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }
}

