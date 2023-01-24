package com.example.chat.repository;

import com.example.chat.models.Connection;
import com.example.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    Optional<Connection> findByUser1AndUser2(User user1, User user2);

    Boolean existsByUser1AndUser2(User user1, User user2);
}
