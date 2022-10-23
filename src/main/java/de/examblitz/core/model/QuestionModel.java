package de.examblitz.core.model;

import de.examblitz.core.utils.StringListConverter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Table(name = "questions")
@Getter
@Setter
@Entity
public class QuestionModel {
    public enum QuestionType {
        MULTI_SELECT,
        SELECT,
        TEXT,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "test_id", nullable = false)
    private TestModel test;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "type", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private QuestionType type;

    @Column(name = "options")
    @Convert(converter = StringListConverter.class)
    private List<String> options;

    @Column(name = "select_solution")
    @Convert(converter = StringListConverter.class)
    private List<String> selectSolution;

    @Column(name = "solution")
    private String stringSolution;

}
