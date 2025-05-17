package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.domain.Message;
import za.ac.cput.service.IService;

public interface IMessageRepository extends JpaRepository<Message, Long> {
    // Additional methods specific to Message can be defined here
}
