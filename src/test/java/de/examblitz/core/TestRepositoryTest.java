package de.examblitz.core;

import de.examblitz.core.model.TestModel;
import de.examblitz.core.model.UserModel;
import de.examblitz.core.repository.TestRepository;
import de.examblitz.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TestRepositoryTest {
    @Autowired
    private TestRepository testRepository;

    @Autowired
    private UserRepository userRepository;

    private UserModel createUserModel() {
        UserModel creator = new UserModel();
        creator.setName("Bob");
        creator.setPassword("12345");
        creator.setAuthorities(new ArrayList<>(Collections.singleton("USER")));
        userRepository.save(creator);
        return creator;
    }

    private TestModel createTestModel(UserModel user, String id) {
        final TestModel testModel = new TestModel();
        testModel.setId(id);
        testModel.setTitle("Test #" + id);
        testModel.setDescription("Good Test #" + id);
        testModel.setCreatedBy(user);
        testModel.setVisibility(TestModel.TestVisibility.PUBLIC);
        testModel.setAllowedUsers(new HashSet<>());
        testRepository.save(testModel);
        return testModel;
    }

    @Test
    void existsById() {
        final UserModel testUser = createUserModel();
        final TestModel testModel = createTestModel(testUser, "1");

        boolean exists = testRepository.existsById(testModel.getId());
        assertTrue(exists);
    }

    @Test
    void findAll() {
        final UserModel testUser = createUserModel();

        int randomNumber = new Random().nextInt(10);

        for (int i = 0; i < randomNumber; i++) {
            createTestModel(testUser, String.valueOf(i));
        }

        var count = testRepository.findAll().size();
        assertEquals(count, randomNumber);
    }

    @Test
    void findById() {
        final UserModel testUser = createUserModel();
        final String randomId = String.valueOf(new Random().nextInt(1000));
        final TestModel createdTest = createTestModel(testUser, randomId);

        final Optional<TestModel> testById = testRepository.findById(randomId);
        assertAll("Should be correct",
                () -> assertFalse(testById.isEmpty()),
                () -> assertEquals(testById.get().getDescription(), createdTest.getDescription()));
    }

    @Test
    void findAllForUser() {
        final UserModel testUser = createUserModel();
        createTestModel(testUser, "1");
        createTestModel(testUser, "2");

        List<TestModel> testsFromUser = testRepository.findAllForUser(testUser.getId().toString());
        assertEquals(testsFromUser.size(), 2);
    }
}