package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@NamedQuery(name="find_all_comments", query="select c from Comment c")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne()
    @JoinColumn(name = "post_id")
    private Posts post;

    @ManyToOne()
    private User user;

    private String description;

    public Comment() {}

    public Comment(int id, Posts post, User user, String description) {
        this.id = id;
        //this.post = post;
        //this.user = user;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Posts getPost() {
        return post;
    }

    public User getUser() {
        return user;
    }

    public void setPost(Posts post) {
        this.post = post;
    }

    public void setUser(User user) {
        this.user = user;
    }

    //
//    public void setUser(User user) {
//        this.user = user;
//    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
