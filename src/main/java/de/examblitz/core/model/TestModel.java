package de.examblitz.core.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Table(name = "tests")
@Getter
@Setter
@Entity
public class TestModel {

    /**
     * Whether one needs to have access to the task or not
     */
    enum TestVisibility {
        PUBLIC,
        PRIVATE
    }

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "visibility", nullable = false, columnDefinition = "varchar(32) default 'PUBLIC'")
    @Enumerated(value = EnumType.STRING)
    private TestVisibility visibility;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserModel createdBy;

    @OneToMany(mappedBy = "test", fetch = FetchType.EAGER)
    private Set<QuestionModel> questions;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "allowed_users",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "test_id")})
    private Set<UserModel> allowedUsers = new HashSet<>();

}
