package com.example.chat.repository;

import com.example.chat.models.Connection;
import com.example.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    Boolean existsByUser1AndUser2(User user1, User user2);

    List<Connection> findAllByUser1OrUser2(User user1, User user2);

    Connection getConnectionByConnectionId(String connectionId);
}
