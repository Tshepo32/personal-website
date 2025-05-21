package za.ac.cput.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends IBlogRepository {
    // This interface extends JpaRepository, which provides CRUD operations for the Blog entity.
    // You can add custom query methods here if needed.
}
