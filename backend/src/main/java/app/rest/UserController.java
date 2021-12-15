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

    @PutMapping("/users/{email}")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {
        user.setEmail(user.getEmail());
        user.setUsername(user.getUsername());
        user.setEncodedPassword(user.getEncodedPassword());

        User savedUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().path("/{email}").
                buildAndExpand(savedUser.getEmail()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }
}
