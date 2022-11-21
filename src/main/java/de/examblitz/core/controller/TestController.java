package de.examblitz.core.controller;

import de.examblitz.core.dto.*;
import de.examblitz.core.model.TestModel;
import de.examblitz.core.services.AuthService;
import de.examblitz.core.services.TestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        return ResponseEntity.ok(models.stream().map(TestModel::toSanitizedTestDto)
                .collect(Collectors.toList()));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTest(@PathVariable("id") String id) {
        var success = testService.deleteTest(id, authService.getCurrentUser());

        return (success ? ResponseEntity.accepted().body(new TestDeleteDto(id)) : ResponseEntity.badRequest().build());
    }
}
