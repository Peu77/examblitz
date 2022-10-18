package de.examblitz.core.repository;

import de.examblitz.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User getUsersById(UUID uuid);
    User getUsersByName(String name);
}
