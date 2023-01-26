package com.example.chat.controller;

import com.example.chat.models.Connection;
import com.example.chat.models.User;
import com.example.chat.payload.request.ConnectionRequest;
import com.example.chat.repository.ConnectionRepository;
import com.example.chat.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections/")
public class ConnectionsController {
    Logger logger = LoggerFactory.getLogger(ConnectionsController.class);

    @Autowired
    ConnectionRepository connectionRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> post(@RequestBody ConnectionRequest connectionRequest) {
        User user1 = userRepository.findByUsername(connectionRequest.getUsername()).orElseThrow();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user2 = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        Boolean exists = connectionRepository.existsByUser1AndUser2(user1, user2);
        if (exists) {
            return ResponseEntity.badRequest().build();
        } else {
            Connection newConnection = new Connection(user1, user2);
            var connection = connectionRepository.save(newConnection);
            return ResponseEntity.ok(connection);
        }
    }

    @GetMapping
    public ResponseEntity<?> get() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        List<Connection> connections = connectionRepository.findAllByUser1OrUser2(currentUser, currentUser);
        return ResponseEntity.ok(connections);
    }
}
