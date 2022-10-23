package de.examblitz.core.repository;

import de.examblitz.core.model.TestModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<TestModel, String> {
    @Override
    boolean existsById(String s);
}