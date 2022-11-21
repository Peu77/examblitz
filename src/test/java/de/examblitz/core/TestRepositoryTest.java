package de.examblitz.core;

import de.examblitz.core.model.TestModel;
import de.examblitz.core.model.UserModel;
import de.examblitz.core.repository.TestRepository;
import de.examblitz.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TestRepositoryTest {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void existsById() {
        UserModel creator = new UserModel();
        creator.setName("Bob");
        creator.setPassword("12345");
        creator.setAuthorities(new ArrayList<>(Collections.singleton("USER")));
        userRepository.save(creator);


        TestModel testModel = new TestModel();
        testModel.setId("12345");
        testModel.setTitle("Test1");
        testModel.setDescription("Good Test");
        testModel.setCreatedBy(creator);
        testModel.setVisibility(TestModel.TestVisibility.PRIVATE);
        testModel.setAllowedUsers(new HashSet<>());
        testRepository.save(testModel);

        boolean exists = testRepository.existsById(testModel.getId());
        assertTrue(exists);
    }

    @Test
    void findAll() {
    }

    @Test
    void findById() {
    }

    @Test
    void findAllForUser() {
    }
}