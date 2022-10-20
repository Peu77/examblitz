package de.examblitz.core.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "questions")
@Getter
@Setter
@Entity
public class QuestionModel {
    enum QuestionType {
        MULTI_SELECT,
        SELECT,
        TEXT,
        NUMBER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "test_id", nullable = false)
    private TestModel test;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "type", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private QuestionType type;

}
