package com.server.chat_app.config;

import com.server.chat_app.dto.UserState;
import com.server.chat_app.repository.ActiveUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class SocketEvents {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ActiveUserRepo activeUserRepo;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("Username");
        if (username != null) {
            System.out.println("User Disconnected: " + username);
            messagingTemplate.convertAndSend("/chat-client/user-state", UserState.builder().username(username).state("left").build());
            activeUserRepo.delete(headerAccessor.getSessionId());
        }
    }
}
