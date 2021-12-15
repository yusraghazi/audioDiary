package app.rest;

import app.exceptions.AuthorizationException;
import app.exceptions.UserNotFoundException;
import app.models.User;
import app.repositories.JPARepository;
import app.repositories.UserRepository;
import app.security.JWTokenInfo;
import app.security.PasswordEncoder;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/users/{email}")
    public User getUserByEmail(
            @PathVariable String email) {

        User userById = userRepo.findByEmail(email);

        if(userById == null) {
            throw new UserNotFoundException("id = " + email);
        }

        return userById;
    }


    @DeleteMapping("/users/{email}")
    public ResponseEntity<User> deleteUser(@PathVariable String email, @RequestAttribute(value = JWTokenInfo.KEY) JWTokenInfo tokenInfo) {

        if(!tokenInfo.isAdmin()) {
            throw new AuthorizationException("only administrators can remove members");
        }

        User user = getUserByEmail(email);

        userRepo.delete(user);

        return ResponseEntity.ok(user);

    }

//    @PutMapping("/users")
//    public ResponseEntity<Object> updateUser(@RequestBody ObjectNode updateInfo) {
//
//        String email = updateInfo.get("email") == null  ? null : updateInfo.get("email").asText();
//        String username = updateInfo.get("username") == null  ? null : updateInfo.get("username").asText();
//        String name = updateInfo.get("name") == null  ? null : updateInfo.get("name").asText();
//        String givenPassword = updateInfo.get("encoded_password") == null  ? null : updateInfo.get("encoded_password").asText();
//
//        User user = new User();
//        user.setEmail(email);
//        user.setName(name);
//        user.setUsername(username);
//        user.setEncodedPassword(encoder.encode(givenPassword));
//        user.setAdmin(false);
//
//        User savedUser = userRepo.save(user);
//
//        URI location = ServletUriComponentsBuilder.
//                fromCurrentRequest().path("/{email}").
//                buildAndExpand(savedUser.getEmail()).toUri();
//
//        return ResponseEntity.created(location).build();
//    }


    @PutMapping("/users/{email}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String email) {
        User user1 = userRepo.findByEmail(email);
        final User savedUser = userRepo.save(user1);
        // creates links based on the current HttpSerlvetrequest
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{email}").
                //absolute path
                        buildAndExpand(savedUser.getEmail()).toUri();
        savedUser.setEmail(user.getEmail());
        user.setUsername(user.getUsername());
        user.setEncodedPassword(user.getEncodedPassword());
        user.setAdmin(false);
        if(user1 == null){
            throw new UserNotFoundException("Offer with id "+ email + "Does not exist");
        }
        return (ResponseEntity<User>) ResponseEntity.created(location).body(savedUser);
    }
}
