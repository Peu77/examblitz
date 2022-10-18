package de.examblitz.core.model;

import de.examblitz.core.utils.StringListConverter;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

/**
 * This describes a user, that is able to interact with the platform.
 */
@Table(name = "users")
@Getter
@Setter
@Entity
@Data
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "password_salt", nullable = false)
    private String passwordSalt;

    @Convert(converter = StringListConverter.class)
    @Column(name = "authorities", nullable = false)
    private List<String> authorities;
}

