package com.example.chat.repository;

import com.example.chat.models.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.Collectors;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
    default List<Messages> findByUsers(Long userX, Long userY) {
        return findAll().stream()
                .filter(m -> (m.getConnectionId().getUser1().getId() == userX && m.getConnectionId().getUser2().getId() == userY)
                        || (m.getConnectionId().getUser1().getId() == userY && m.getConnectionId().getUser2().getId() == userX))
                .collect(Collectors.toList());
    }
}
