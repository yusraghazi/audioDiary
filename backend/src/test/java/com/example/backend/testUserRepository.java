package com.example.backend;

import app.models.User;
import app.repositories.UserRepository;
import app.rest.UserController;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

//@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class testUserRepository {

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository repository;

    @Test
    public void testFindingAUser() {

        User u = repository.findByEmail("test@hotmail.com");
        assertEquals("test", u.getName());
    }

    @Test
    public void getAllusers() {
        userController.getAllUsers();
        assertNotNull(userController.getAllUsers());
    }

    @Test
    public void deleteUser() {
        assertNotNull(userController.deleteUser("test@hotmail.com"));
    }

    @Test
    public void getUserEmail() {
        assertNotNull(userController.getUserByEmail("test@hotmail.com"));
    }



}




