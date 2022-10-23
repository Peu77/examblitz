package de.examblitz.core.repository;

import de.examblitz.core.model.QuestionModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<QuestionModel, String> {
}