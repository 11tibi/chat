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
    @JoinColumn(name = "User1Id", updatable = false, nullable = false)
    private User user1;

    @ManyToOne()
    @JoinColumn(name = "User2Id", updatable = false, nullable = false)
    private User user2;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date created_at;

    public Connection(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public Connection() {

    }
}
