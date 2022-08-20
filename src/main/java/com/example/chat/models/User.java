package com.example.chat.models;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true, length = 45)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 40)
    private String username;

    @Column(unique = true)
    private String imageUrl;

    @OneToMany(mappedBy = "id")
    private Set<Messages> sender = new HashSet<>();

    @OneToMany(mappedBy = "id")
    private Set<Messages> receiver = new HashSet<>();

    public User(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public User() {

    }
}
