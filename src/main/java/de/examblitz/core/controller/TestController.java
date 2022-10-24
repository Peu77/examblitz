package de.examblitz.core.controller;

import de.examblitz.core.dto.CreateTestDto;
import de.examblitz.core.dto.SanitizedQuestionDto;
import de.examblitz.core.dto.SanitizedTestDto;
import de.examblitz.core.dto.TestIdDto;
import de.examblitz.core.services.AuthService;
import de.examblitz.core.services.TestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final TestService testService;
    private final AuthService authService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> createTest(@RequestBody CreateTestDto request) {
        var model = testService.createTest(request, authService.getCurrentUser());

        return ResponseEntity.ok(new TestIdDto(model.getId()));
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> listTest() {
        var models = testService.findAllTests(authService.getCurrentUser());

        return ResponseEntity.ok(
                models.stream().map(model -> {
                    var sanitizedQuestions = model.getQuestions().stream().map(questionModel -> new SanitizedQuestionDto(
                            questionModel.getId(), questionModel.getDescription(),
                            questionModel.getType(), questionModel.getOptions())).collect(Collectors.toList());

                    return new SanitizedTestDto(
                            model.getId(), model.getTitle(), model.getDescription(),
                            model.getCreatedBy().getName(), model.getCreatedAt(),
                            sanitizedQuestions);
                }));
    }

}
