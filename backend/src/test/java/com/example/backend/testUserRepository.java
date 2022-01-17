package com.example.backend;

import app.models.User;
import app.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Date;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;


@SpringBootTest
public class testUserRepository {


    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserRepository repository;

    @Test
    void testFindingAUser() {

        User u = repository.findByEmail("test@hotmail.com");
        assertEquals("test",u.getName());

    }

    @Test
    @DirtiesContext
    void testRemovingAUser() {

        User u = repository.findByEmail("test@hotmail.co");

        repository.delete(u);

        assertNull(repository.findByEmail("test@hotmail.com"));
    }

    @Test
    @DirtiesContext
    void testAddingAUser() {

        User u = new User();

        u = repository.save(u);

        Assertions.assertNotNull(u.getEmail());

        u = repository.findByEmail(u.getEmail());
        u = repository.findByEmail(u.getUsername());
        u = repository.findByEmail(u.getName());
        u = repository.findByEmail(u.getEncodedPassword());



        assertEquals("test", u.getName());

    }

    @Test
    @DirtiesContext
    void testUpdatingAUser() {

        User u = repository.findByEmail("test@hotmail.co");

        u.setName("jandeboer");

        repository.save(u);

        u = repository.findByEmail("test@hotmail.com");

        assertEquals("jandeboer", u.getName());

    }

}
