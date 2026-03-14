package com.server.chat_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /*
        WebSocket => Enables realtime connection
        Stomp => used to organize the messages and send to the correct destination
    */

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket") // Endpoint for WebSocket connection (used by clients to connect)
                .setAllowedOrigins("http://localhost:8080") // same origin (MVC ^-^)
                .withSockJS(); // Fallback option for browsers that don't support WebSockets (uses long polling <realtime simulation with HTTP requests>)
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/chat-client"); // Prefix for messages that will be handled by the message broker (used for broadcasting messages to clients <used with client subscriptions>)
        registry.setApplicationDestinationPrefixes("/chat-server"); // Prefix for messages that will be handled by application (used for messages sent from clients to the server)
    }
}
