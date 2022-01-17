package app;
import app.models.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URISyntaxException;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class loginTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testCreatingUserShouldSucceed() throws URISyntaxException {

        User user = new User("janpieter@gmail.com", "Jan Pieter", "951dda5b84bc87b5de5f0baefd0266bcce960753745d6d98add9756eee9a8a73",
                false, "janpieter1988", null, false);

        // Act: Creating a user
        ResponseEntity<User> creationResult
                = this.restTemplate.postForEntity("/rest/users", user, User.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.CREATED);
        assertNotNull(creationResult.getBody().getEmail());

        assertEquals(user.getEmail(),creationResult.getBody().getEmail());
        assertEquals(user.getName(),creationResult.getBody().getName());
        assertEquals(user.getEncodedPassword(),creationResult.getBody().getEncodedPassword());
        assertEquals(user.isAdmin(),creationResult.getBody().isAdmin());
        assertEquals(user.getUsername(),creationResult.getBody().getUsername());
        assertEquals(user.getPasswordReset(),creationResult.getBody().getPasswordReset());
        assertEquals(user.isVerified(),creationResult.getBody().isVerified());

        // Act: Cross-check results - was the user persisted?
        ResponseEntity<User> queryResult = this.restTemplate.getForEntity("/rest/users/" + creationResult.getBody().getEmail(), User.class);

        // Assert: Check if data is correct
        assertEquals(queryResult.getStatusCode(), HttpStatus.OK);
        assertEquals(queryResult.getBody().getEmail(), creationResult.getBody().getEmail());
    }

}
