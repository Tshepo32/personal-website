package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Blog;

import static org.junit.jupiter.api.Assertions.*;

class BlogFactoryTest {

    @Test
    void createBlog() {
        String title = "Test Title";
        String content = "Test Content";
        String videoUrl = "https://www.youtube.com/watch?v=6IyvkPhrB5M";

        Blog blog = BlogFactory.createBlog(title, content, videoUrl);

        assertNotNull(blog);
        assertEquals(title, blog.getTitle());
        assertEquals(content, blog.getContent());
        assertEquals(videoUrl, blog.getVideoUrl());
    }
}