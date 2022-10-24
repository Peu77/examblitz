package de.examblitz.core.dto;

import java.util.Date;
import java.util.List;

public record SanitizedTestDto(String id, String title, String description, String createdBy, Date createdAt,
                               List<SanitizedQuestionDto> questions) {
}
