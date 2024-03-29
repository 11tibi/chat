package com.example.chat.controller;

import com.example.chat.models.User;
import com.example.chat.repository.MessagesRepository;
import com.example.chat.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/msg/")
public class MessageController {
    Logger logger = LoggerFactory.getLogger(MessageWSController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessagesRepository messagesRepository;

    @GetMapping("/{id}/")
    public ResponseEntity<?> get(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        var messages = messagesRepository.findByUsers(currentUser.getId(), id);
        return ResponseEntity.ok(messages);
    }
}
