package com.example.chat.controller;

import com.example.chat.models.User;
import com.example.chat.payload.request.LoginRequest;
import com.example.chat.payload.request.SignupRequest;
import com.example.chat.payload.response.JwtResponse;
import com.example.chat.payload.response.MessageResponse;
import com.example.chat.repository.UserRepository;
import com.example.chat.security.jwt.JwtUtils;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.example.chat.security.services.UserDetailsImpl;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import io.jsonwebtoken.impl.DefaultClaims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info(loginRequest.getUsername() + "  " + loginRequest.getPassword());
        Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail()
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> loginUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsernameOrEmail(
                signupRequest.getUsername(),
                signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username or Email is already taken!"));
        }

        User user = new User(signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()),
                signupRequest.getUsername());
        userRepository.save(user);
        return ResponseEntity.ok(
                new MessageResponse("User registered successfully")
        );
    }

    @GetMapping("refreshtoken")
    public  ResponseEntity<?> refreshToken(HttpServletRequest request) throws Exception {
        DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");

        Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
        String token = jwtUtils.generateRefreshToken(expectedMap, expectedMap.get("sub").toString());
        return ResponseEntity.ok(token);
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
        Map<String, Object> expectedMap = new HashMap<String, Object>();
        for (Entry<String, Object> entry : claims.entrySet()) {
            expectedMap.put(entry.getKey(), entry.getValue());
        }
        return expectedMap;
    }
}
