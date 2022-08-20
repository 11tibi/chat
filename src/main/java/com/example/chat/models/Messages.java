package com.example.chat.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "messages")
@Data
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String message;

    @ManyToOne()
    @JoinColumn(name = "senderId", updatable = false, insertable = false)
    private User sender;

    @ManyToOne()
    @JoinColumn(name = "receiverId", updatable = false, insertable = false)
    private User receiver;
}
