package com.example.backend;

import app.models.Comment;
import app.models.Posts;
import app.models.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class createPostTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testCreatingPostShouldSucceed() throws URISyntaxException {
        // Arrange
        User user = new User();
        Posts post = new Posts(null, "Singing", "birds singing in the forest", "test.img", "nature", true, 4, new BigDecimal("4.895168"), new BigDecimal("52.370216"), "Amsterdam, the Netherlands", "audiofile", user, new ArrayList<>());

        // Act: Creating a user
        ResponseEntity<Posts> creationResult
                = this.restTemplate.postForEntity("/posts", post, Posts.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.CREATED);
        assertNotNull(creationResult.getBody().getId());
        assertEquals(post.getTitle(),creationResult.getBody().getTitle());
        assertEquals(post.getDescription(),creationResult.getBody().getDescription());
        assertEquals(post.getLocation(),creationResult.getBody().getLocation());

        // Act: Cross-check results - was the user persisted?
        ResponseEntity<Posts> queryResult = this.restTemplate.getForEntity("/posts" + creationResult.getBody().getId(), Posts.class);

        // Assert: Check if data is correct
        assertEquals(queryResult.getStatusCode(), HttpStatus.OK);
        assertEquals(queryResult.getBody().getTitle(), creationResult.getBody().getTitle());
        assertEquals(queryResult.getBody().getDescription(), creationResult.getBody().getDescription());
        assertEquals(queryResult.getBody().getLocation(), creationResult.getBody().getLocation());
    }
}
