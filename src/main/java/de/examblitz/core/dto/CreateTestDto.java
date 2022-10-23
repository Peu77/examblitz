package de.examblitz.core.dto;

import de.examblitz.core.model.TestModel;

import java.util.List;

public record CreateTestDto(String title, String description, TestModel.TestVisibility visibility,
                            List<CreateQuestionDto> questions) {
}
