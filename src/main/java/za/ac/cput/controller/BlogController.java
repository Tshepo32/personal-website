package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Blog;
import za.ac.cput.service.BlogService;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "https://tshepo32.github.io")
public class BlogController {

    private final BlogService blogService;
    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/create")
    public Blog create(@RequestBody Blog blog) {
        return blogService.create(blog);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Blog>> getAll() {
        List<Blog> blogs = blogService.getAll();
        return ResponseEntity.ok(blogs);
    }


    @PutMapping("/update")
    public ResponseEntity<Blog> update(@RequestBody Blog blog) {
        Blog updatedBlog = blogService.update(blog);
        return ResponseEntity.ok(updatedBlog);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get/{id}")
    public HttpEntity<Object> getById(Long blogId) {
        Blog blog = blogService.getById(blogId);
        if (blog != null) {
            return ResponseEntity.ok(blog);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
