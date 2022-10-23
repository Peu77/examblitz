package de.examblitz.core.repository;

import de.examblitz.core.model.TestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestRepository extends JpaRepository<TestModel, String> {
    @Override
    boolean existsById(String s);

    @Query(value = "SELECT * from tests where visibility = 'PUBLIC' or (select COUNT(*) from allowed_users where CAST(allowed_users.test_id AS varchar(255)) = tests.id and allowed_users.user_id = ?1) = 1;", nativeQuery = true)
    List<TestModel> listTestsForUser(String uuid);
}