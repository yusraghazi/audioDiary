package app.rest;

import app.exceptions.AuthorizationException;
import app.exceptions.UserNotFoundException;
import app.models.User;
import app.repositories.UserRepository;
import app.security.JWTokenInfo;
import app.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public User getUserByEmail(@PathVariable String email) {
        User userById = userRepo.findByEmail(email);

        if(userById == null) {
            throw new UserNotFoundException(HttpStatus.NOT_FOUND.toString());
        }

        return userById;
    }


    @DeleteMapping("/users/{email}")
    public ResponseEntity<User> deleteUser(@PathVariable String email) {
        User user = getUserByEmail(email);

        userRepo.delete(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {
        User userById = userRepo.findByEmail(user.getEmail());

        String password = encoder.encode(user.getEncodedPassword());
        user.setEncodedPassword(password);
        if(userById == null) {
            throw new UserNotFoundException("id = " + user.getEmail());
        }

        userRepo.save(user);
        return ResponseEntity.ok().build();

    }


}
