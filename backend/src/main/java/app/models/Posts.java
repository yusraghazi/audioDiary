package app.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    public Integer id;
    public String title;
    public String description;
    public String img;

//    @Enumerated()
    public String theme;
    public boolean isLiked;
    public int amountReport;
    public BigDecimal lng;
    public BigDecimal lat;
    public String location;
    public String audiofile;

    @ManyToOne()
    @JoinColumn(name = "user_email")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    public Posts() {}

    public Posts(Integer id, String title, String description, String img, String theme, boolean isLiked, int amountReport, BigDecimal lng, BigDecimal lat, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.img = img;
        this.theme = theme;
        this.isLiked = isLiked;
        this.amountReport = amountReport;
        this.lng = lng;
        this.lat = lat;
        this.user = user;
    }

        public Posts(Integer id, String title, String description, String img, String theme, boolean isLiked, int amountReport, BigDecimal lng, BigDecimal lat, String location, String audiofile, User user, List<Comment> comments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.img = img;
        this.theme = theme;
        this.isLiked = isLiked;
        this.amountReport = amountReport;
        this.lng = lng;
        this.lat = lat;
        this.location = location;
        this.audiofile = audiofile;
        this.user = user;
        this.comments = comments;
    }

    public int getAmountReport() {
        return amountReport;
    }

    public void setAmountReport(int amountReport) {
        this.amountReport = amountReport;
    }

    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Posts)) return false;
        Posts posts = (Posts) o;
        return isLiked() == posts.isLiked() && getAmountReport() == posts.getAmountReport() && Objects.equals(getLng(), posts.getLng()) && Objects.equals(getLat(), posts.getLat()) && Objects.equals(getId(), posts.getId()) && Objects.equals(getTitle(), posts.getTitle()) && Objects.equals(getDescription(), posts.getDescription()) && Objects.equals(getImg(), posts.getImg()) && Objects.equals(getTheme(), posts.getTheme()) && Objects.equals(getUser(), posts.getUser());
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

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAudiofile() {
        return audiofile;
    }

    public void setAudiofile(String audiofile) {
        this.audiofile = audiofile;
    }

//    @Override
//    public int hashCode() {
//        return Objects.hash(getId(), getTitle(), getDescription(), getImg(), getTheme(), isLiked(), getAmountReport(), getLng(), getLat(), getUser());
//    }


    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getDescription(), getImg(), getTheme(), isLiked(), getAmountReport(), getLng(), getLat(), getLocation(), getAudiofile(), getUser());
    }
}
