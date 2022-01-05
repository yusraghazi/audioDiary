package app.rest;

import app.exceptions.UserNotFoundException;
import app.models.Audio;
import app.models.Posts;
import app.models.User;
import app.repositories.AudioRepository;
import app.repositories.JPARepository;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import com.cloudinary.*;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.cloudinary.Singleton;

@RestController
public class AudioController {
//    @Autowired
//    private UserController userResource;

    @Autowired
    private AudioRepository audioRepository;

//    @PostMapping("/users/{id}/audios")
//    @Transactional
//    public ResponseEntity<Object> createAudio(@RequestParam(name = "fail",required = false, defaultValue = "false") boolean shouldFail,
//                                             @PathVariable String email, @RequestBody Audio audio) {
//
//        User user = userResource.getUserByEmail(email);
//        audio.setUser(user);
//        audioRepository.save(audio);
//        // used to demonstrate transaction handling
//        if(shouldFail) {
//            throw new RuntimeException("Failed for demo purposes. This action will rollback the database transaction");
//        }
//
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{postId}").buildAndExpand(audio.getId()).toUri();
//        return ResponseEntity.created(location).build();
//    }

//    @SuppressWarnings("rawtypes")
//    @RequestMapping(value = "/upload", method = RequestMethod.POST)
//    public String uploadPhoto(@ModelAttribute PhotoUpload photoUpload, BindingResult result, ModelMap model) throws IOException {
////        PhotoUploadValidator validator = new PhotoUploadValidator();
////        validator.validate(photoUpload, result);
////
////        Map uploadResult = null;
////        if (photoUpload.getFile() != null && !photoUpload.getFile().isEmpty()) {
////            uploadResult = Singleton.getCloudinary().uploader().upload(photoUpload.getFile().getBytes(),
////                    ObjectUtils.asMap("resource_type", "auto"));
////            photoUpload.setPublicId((String) uploadResult.get("public_id"));
////            Object version = uploadResult.get("version");
////            if (version instanceof Integer) {
////                photoUpload.setVersion(new Long((Integer) version));
////            } else {
////                photoUpload.setVersion((Long) version);
////            }
////
////            photoUpload.setSignature((String) uploadResult.get("signature"));
////            photoUpload.setFormat((String) uploadResult.get("format"));
////            photoUpload.setResourceType((String) uploadResult.get("resource_type"));
////        }
////
////        if (result.hasErrors()) {
////            model.addAttribute("photoUpload", photoUpload);
////            return "upload_form";
////        } else {
////            Photo photo = new Photo();
////            photo.setTitle(photoUpload.getTitle());
////            photo.setUpload(photoUpload);
////            model.addAttribute("upload", uploadResult);
////            photoRepository.save(photo);
////            model.addAttribute("photo", photo);
////            return "upload";
////        }
//    }

    @GetMapping("/audios/{id}")
    public Audio getAudioById(
            @PathVariable int id) {

        Audio audioById = audioRepository.findById(id);

        if (audioById == null) {
            throw new UserNotFoundException("id = " + id);
        }

        return audioById;
    }
}
