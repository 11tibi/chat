package com.example.chat.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import java.util.Date;

@Entity
@Table(name = "connection")
@Data
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Generated(GenerationTime.INSERT)
    @Column(nullable = false, unique = true)
    private String connection_id;

    @ManyToOne()
    @JoinColumn(name = "senderId", updatable = false, nullable = false)
    private User sender;

    @ManyToOne()
    @JoinColumn(name = "receiverId", updatable = false, nullable = false)
    private User receiver;

    @ManyToOne()
    @JoinColumn(name = "messageId", updatable = false, nullable = false, unique = true)
    private Messages messages;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date created_at;
}
