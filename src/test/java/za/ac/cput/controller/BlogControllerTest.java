package za.ac.cput.controller;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Blog;
import za.ac.cput.factory.BlogFactory;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BlogControllerTest {

    @Autowired
    private BlogController blogController;
    private final String BASE_URL = "http://localhost:8080/api/blog";
    private static Blog blog;

    @BeforeAll
    public static void setup() {
        // Create a blog using the BlogFactory
        blog = BlogFactory.createBlog(
                "Test Title", // title
                "Test Content", // content
                "https://www.youtube.com/watch?v=6IyvkPhrB5M" // videoUrl
        );
    }

    @Test
    void create() {
        String title = "Test Title";
        String content = "Test Content";
        String videoUrl = "https://www.youtube.com/watch?v=6IyvkPhrB5M";



        Blog createdBlog = blogController.create(blog);

        assertNotNull(createdBlog);
        assertEquals(title, createdBlog.getTitle());
        assertEquals(content, createdBlog.getContent());
        assertEquals(videoUrl, createdBlog.getVideoUrl());
    }

    @Test
    void delete() {
        // Assuming the blog with ID 1 exists
        Long blogId = 2L;

        // Call the delete method
        blogController.delete(blogId);

        // Verify that the blog is deleted (you may need to implement a way to check this)
        Blog deletedBlog = (Blog) blogController.getById(blogId).getBody();
        assertNull(deletedBlog);
    }
}