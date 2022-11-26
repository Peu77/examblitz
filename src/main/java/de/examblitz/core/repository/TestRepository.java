package de.examblitz.core.repository;

import de.examblitz.core.model.TestModel;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<TestModel, String> {
    @Override
    @Query(value = "select exists(select 1 from tests where id = ?1 and disabled=false)", nativeQuery = true)
    boolean existsById(String s);

    @Override
    @Query(value = "select * from tests where disabled=false", nativeQuery = true)
    <S extends TestModel> List<S> findAll(Example<S> example);

    @Override
    @Query(value = "select * from tests where disabled = false and id = ?1", nativeQuery = true)
    Optional<TestModel> findById(String s);

    /**
     * find all tests that are visible to the user
     * so either public or shared with the user or created by the user
     *
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * from tests where tests.disabled = false and (CAST(created_by as VARCHAR(255)) = ?1 or visibility = 'PUBLIC' or (select COUNT(*) from allowed_users where allowed_users.test_id = tests.id and CAST(allowed_users.user_id AS varchar(255)) = ?1) = 1)", nativeQuery = true)
    List<TestModel> findAllForUser(String uuid);
}