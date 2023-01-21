package com.example.chat.repository;

import com.example.chat.models.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
}
