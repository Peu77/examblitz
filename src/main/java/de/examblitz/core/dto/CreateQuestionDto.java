package de.examblitz.core.dto;

import de.examblitz.core.model.QuestionModel;

import java.util.List;

public record CreateQuestionDto(String description, QuestionModel.QuestionType type, List<String> options,
                                String stringSolution, List<String> selectSolution) {
}
