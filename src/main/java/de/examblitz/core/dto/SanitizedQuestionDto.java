package de.examblitz.core.dto;

import de.examblitz.core.model.QuestionModel;

import java.util.List;
import java.util.UUID;

public record SanitizedQuestionDto(UUID id, String description, QuestionModel.QuestionType type,
                                   List<String> options) {
}
