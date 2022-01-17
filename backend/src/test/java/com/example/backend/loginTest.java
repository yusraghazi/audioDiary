package com.example.backend;

import app.models.User;
import app.repositories.PostsRepository;
import app.repositories.UserRepository;
import app.security.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URISyntaxException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
// extendwith and springboot test recognizes the test as a springboot test

@SpringBootApplication
@SpringBootConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class loginTest {

    @Autowired
    // backend testen
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    // is not entering in the database
    @DirtiesContext
    void checkIfLoginWorks() throws URISyntaxException {
        //arrange
        User user = new User("jan@hotmail.com","Jan","cuco",false,
                "test",null,false);

        User savedUser = userRepository.save(user);
        assertNotNull(savedUser);




    }

}
