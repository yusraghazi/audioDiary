package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@NamedQuery(name="find_all_posts", query="select p from Posts p")
public class Posts {

    public enum Theme {
        SUN,
        SAND,
        FOREST,
        WATER,
        CITY,
        MOUNTAIN
    }

    @Id
    @GeneratedValue
    public Integer id;
    public String title;
    public String description;
    public String img;

//    @Enumerated()
    public String theme;
    public boolean isLiked;
    public int amountReport;
    public long lng;
    public long lat;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_email")
//    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JsonIgnore
    private Audio audio;

    public void setUser(User user, Audio audio) {
        this.user = user;
        user.addPost(this);
        this.audio = audio;
        user.addAudio(audio);
    }

    public int getAmountReport() {
        return amountReport;
    }

    public void setAmountReport(int amountReport) {
        this.amountReport = amountReport;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Audio getAudio() {
        return audio;
    }

    public void setAudio(Audio audio) {
        this.audio = audio;
    }

    public User getUser() {
        return user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }

    public long getLng() {
        return lng;
    }

    public void setLng(long lng) {
        this.lng = lng;
    }

    public long getLat() {
        return lat;
    }

    public void setLat(long lat) {
        this.lat = lat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Posts)) return false;
        Posts posts = (Posts) o;
        return isLiked() == posts.isLiked() && getAmountReport() == posts.getAmountReport() && getLng() == posts.getLng() && getLat() == posts.getLat() && Objects.equals(getId(), posts.getId()) && Objects.equals(getTitle(), posts.getTitle()) && Objects.equals(getDescription(), posts.getDescription()) && Objects.equals(getImg(), posts.getImg()) && Objects.equals(getTheme(), posts.getTheme()) && Objects.equals(getUser(), posts.getUser()) && Objects.equals(getAudio(), posts.getAudio());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getDescription(), getImg(), getTheme(), isLiked(), getAmountReport(), getLng(), getLat(), getUser(), getAudio());
    }
}
