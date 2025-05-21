package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.domain.Blog;

public interface IBlogRepository extends JpaRepository<Blog, Long> {
    // Additional methods specific to Blog can be defined here
}
