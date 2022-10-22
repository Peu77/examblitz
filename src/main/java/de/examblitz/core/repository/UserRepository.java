package de.examblitz.core.repository;

import de.examblitz.core.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {
    UserModel getUserByName(String name);

    boolean existsByName(String name);
}
