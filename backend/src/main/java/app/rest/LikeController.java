package app.rest;

import app.exceptions.PostNotFoundException;
import app.models.Likes;
import app.repositories.JPARepository;
import app.repositories.LikeRepository;
import app.repositories.LikeRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LikeController {

   LikeRepositoryJPA likeRepo;

    @GetMapping("/likes")
    public List<Likes> getAllEvents() {
        return likeRepo.findAll();
    }

    @GetMapping("/likes/{id}")
    public Likes getEventById(@PathVariable int id) {

        Likes like = likeRepo.findById(id);
        if(like == null) {
            throw new PostNotFoundException("Not found id=" + id);
        }
        return like;
        //return ResponseEntity.ok(post);
    }

}
