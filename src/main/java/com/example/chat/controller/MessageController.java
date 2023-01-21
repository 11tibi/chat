package com.example.chat.controller;

import com.example.chat.security.jwt.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Objects;

@Controller
@ControllerAdvice
public class MessageController {
    Logger logger = LoggerFactory.getLogger(MessageController.class);

    @Autowired JwtUtils jwtUtils;

    @MessageMapping("/news")
    @SendTo("/topic/news")
    public String broadcastNews(@Payload String message, SimpMessageHeaderAccessor accessor) {
        String token = Objects.requireNonNull(accessor.getNativeHeader("Authorization")).get(0);
        jwtUtils.validateJwtToken(token);
        logger.info(jwtUtils.getUser(token).toString());
        logger.warn("Message received");
        return message;
    }
}
