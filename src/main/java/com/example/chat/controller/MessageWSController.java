package com.example.chat.controller;

import com.example.chat.models.Messages;
import com.example.chat.payload.request.NewMessageRequest;
import com.example.chat.repository.ConnectionRepository;
import com.example.chat.repository.MessagesRepository;
import com.example.chat.security.jwt.JwtUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Objects;

@Controller
@ControllerAdvice
public class MessageWSController {
    Logger logger = LoggerFactory.getLogger(MessageWSController.class);

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    MessagesRepository messagesRepository;

    @Autowired
    ConnectionRepository connectionRepository;

    @MessageMapping("/messages/{id}/")
    @SendTo("/topic/messages/{id}/")
    public String broadcastNews(@Payload String message, SimpMessageHeaderAccessor accessor, @DestinationVariable String id) throws JsonProcessingException {
        String token = Objects.requireNonNull(accessor.getNativeHeader("Authorization")).get(0);
        jwtUtils.validateJwtToken(token);

        var sender = jwtUtils.getUser(token);
        var connectionId = connectionRepository.getConnectionByConnectionId(id);
        var msg = objectMapper.readValue(message, NewMessageRequest.class);

        var newMessage = new Messages();
        newMessage.setMessage(msg.getMessage());
        newMessage.setSender(sender);
        newMessage.setConnectionId(connectionId);
        var savedMessage = messagesRepository.save(newMessage);
        return objectMapper.writeValueAsString(savedMessage);
    }
}
