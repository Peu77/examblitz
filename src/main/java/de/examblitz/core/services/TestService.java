package de.examblitz.core.services;

import de.examblitz.core.dto.CreateTestDto;
import de.examblitz.core.model.QuestionModel;
import de.examblitz.core.model.TestModel;
import de.examblitz.core.model.UserModel;
import de.examblitz.core.repository.QuestionRepository;
import de.examblitz.core.repository.TestRepository;
import de.examblitz.core.utils.RandomUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
@AllArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final QuestionRepository questionRepository;

    /**
     * This generates a random ID for a test, and checks whether this id already exists.
     * If so, it generates a new one.
     *
     * @return A random ID.
     */
    public String getValidId() {
        String id = RandomUtil.generateRandomString(5);

        if (testRepository.existsById(id))
            return getValidId();

        return id;
    }

    /**
     * This creates a new test.
     *
     * @param data The data required to create a new test.
     * @return The test that has been created.
     */
    public TestModel createTest(CreateTestDto data, UserModel user) {
        TestModel model = new TestModel();

        model.setTitle(data.title());
        model.setDescription(data.description());
        model.setVisibility(data.visibility());
        model.setAllowedUsers(new HashSet<>());
        model.setCreatedBy(user);
        model.setId(this.getValidId());

        testRepository.save(model);

        data.questions().forEach(createQuestionDto -> {
            QuestionModel questionModel = new QuestionModel();

            questionModel.setDescription(createQuestionDto.description());
            questionModel.setType(createQuestionDto.type());
            questionModel.setOptions(createQuestionDto.options());
            questionModel.setTest(model);
            questionModel.setSelectSolution(createQuestionDto.selectSolution());
            questionModel.setStringSolution(createQuestionDto.stringSolution());

            questionRepository.save(questionModel);
        });

        return model;
    }

    /**
     * This returns all tests one has access to.
     *
     * @return All tests.
     */
    public List<TestModel> findAllTests(UserModel user) {
        return testRepository.listTestsForUser(user.getId().toString());
    }

}
