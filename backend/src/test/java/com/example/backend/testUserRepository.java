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

    @Autowired // repository is automatically injected into the test instance
    private UserRepository repository;

    @Test
    void testFindingAUser() {

        User u = repository.findByEmail("test@hotmail.com");
        assertEquals("Okechukwu Onwunli",u.getName());

    }

    @Test
    @DirtiesContext // indicates that the test is dirty and should therefore be closed and removed from the context cache
    void testRemovingAUser() {

        User u = repository.findByEmail("test@hotmail.co");

        repository.delete(u);

        assertNull(repository.findByEmail("test@hotmail.co"));
    }

    @Test
    @DirtiesContext
    void testAddingAUser() {

        User u = new User();

        u = repository.save(u);

        Assertions.assertNotNull(u.getEmail());

        u = repository.findByEmail(u.getEmail());

        assertEquals("Maria Palmer", u.getName());

    }

    @Test
    @DirtiesContext
    void testUpdatingAUser() {

        User u = repository.findByEmail("test@hotmail.co");

        u.setName("Mr Martijn Thorig");

        repository.save(u);

        u = repository.findByEmail("test@hotmail.co");

        assertEquals("Mr Martijn Thorig", u.getName());

    }

}
