//package app.repositories;
//
//import app.models.Posts;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//@Component
//public class PostsRepositoryMock implements PostsRepository {
//    private static int eventsCount = 20000;
//    private List<Posts> posts;
//
//
//    public PostsRepositoryMock() {
//        posts = new ArrayList<>();
//        initEvents(7);
//    }
//
//    private void initEvents(int amount) {
//        for (int i = 0; i < amount; i++) {
//            save(Posts.createRandomPosts());
//        }
//    }
//
//    @Override
//    public List<Posts> findAll() {
//        return this.posts;
//    }
//
//    @Override
//    public Posts save(Posts post) {
//        if(post.getId() == null || post.id == 0) {
//            synchronized (PostsRepositoryMock.class) {
//                post.setId(++eventsCount);
//            }
//        }
//
//        int pos = posts.indexOf(post);
//
//        if(pos == -1 || post.id == 0) {
//            posts.add(post);
//        } else {
//            posts.set(pos,post);
//        }
//
//        return post;
//    }
//
//    @Override
//    public Posts findById(int id) {
//        for(Posts p : posts) {
//            if(p.getId() == id) {
//                return p;
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public Posts deleteById(int id) {
//        Iterator<Posts> iterator = posts.iterator();
//        while(iterator.hasNext()) {
//            Posts p = iterator.next();
//
//            if(p.getId() == id) {
//                iterator.remove();
//                return p;
//            }
//        }
//        return null;
//    }
//}
