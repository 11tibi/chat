package com.example.chat.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "messages")
@Data
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String message;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date created_at;

    public Messages(String message) {
        this.message = message;
    }

    public Messages() {

    }
}
