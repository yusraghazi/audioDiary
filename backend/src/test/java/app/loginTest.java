package app;
import app.models.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URISyntaxException;
import java.util.Date;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class loginTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @DirtiesContext
    @Test
    void testAuthControllerCreateUser () throws URISyntaxException {

        //arrange
        User user = new User("vre@gmail.com", "vre jan", "951dda5b84bc87b5de5f0baefd0266bcce960753745d6d98add9756eee9a8a73",
                false, "vre", null, false);

        //Act: Creating a User
        ResponseEntity<User> creationResult = this.restTemplate.postForEntity("/auth/users",user,User.class);


        //Assert: Check if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.CREATED);
        assertNotNull(creationResult.getBody().getEmail());
        assertEquals(user.getEmail(), creationResult.getBody().getEmail());
        assertEquals(user.getName(),creationResult.getBody().getName());
        assertEquals(user.getEncodedPassword(),creationResult.getBody().getEncodedPassword());
        assertEquals(user.isAdmin(),creationResult.getBody().isAdmin());
        assertEquals(user.getUsername(),creationResult.getBody().getUsername());



//        assertEquals(user.getPasswordReset(),creationResult.getBody().getPasswordReset());
//        assertEquals(user.isVerified(),creationResult.getBody().isVerified());



        // Act :
        ResponseEntity<User> queryResult = this.restTemplate.getForEntity("/auth/users" + creationResult.getBody().getEmail(), User.class);

        // Assert:
        assertEquals(queryResult.getStatusCode(),HttpStatus.OK);


        assertEquals(queryResult.getBody().getEmail(), creationResult.getBody().getEmail());
        assertEquals(queryResult.getBody().getName(), creationResult.getBody().getName());
        assertEquals(queryResult.getBody().getEncodedPassword(), creationResult.getBody().getEncodedPassword());
        assertEquals(queryResult.getBody().isAdmin(), creationResult.getBody().isAdmin());
        assertEquals(queryResult.getBody().getUsername(), creationResult.getBody().getUsername());


        // Act : Delete the user
//        this.restTemplate.delete("/users/{email}" + creationResult.getBody().getEmail(), User.class);

    }




}
