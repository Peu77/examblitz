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
        TestModel testModel = new TestModel();

        testModel.setTitle(data.title());
        testModel.setDescription(data.description());
        testModel.setVisibility(data.visibility());
        testModel.setAllowedUsers(new HashSet<>());
        testModel.setCreatedBy(user);
        testModel.setId(this.getValidId());
        testRepository.save(testModel);

        /*
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
         */

        return testModel;
    }

    /**
     * this deletes a test.
     */
    public boolean deleteTest(String id, UserModel user) {
        TestModel model = testRepository.findById(id).orElse(null);

        if (model == null)
            return false;

        if (!model.getCreatedBy().getId().equals(user.getId()))
            return false;

        model.setDisabled(true);

        testRepository.save(model);

        return true;
    }

    /**
     * This returns all tests one has access to.
     *
     * @return All tests.
     */
    public List<TestModel> findAllTests(UserModel user) {
        return testRepository.findAllForUser(user.getId().toString());
    }

}
