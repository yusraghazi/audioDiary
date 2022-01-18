package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
@Entity(name = "Likes")
@NamedQuery(name="find_all_likes", query="select l from Likes l")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JsonIgnore
    private Posts post;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JsonIgnore
    private User user;


    public Likes(int id, Posts post, User user) {
        this.id = id;
        this.post = post;
        this.user = user;
    }

    public Likes() {
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

    public void setPost(Posts post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
