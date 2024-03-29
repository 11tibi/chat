package com.example.chat.repository;

import com.example.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByUsernameOrEmail(String username, String email);

    Boolean existsByEmail(String email);

    Boolean existsById(long id);
}
