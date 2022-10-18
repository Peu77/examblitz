package de.examblitz.core.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;



public record JwtResponse(String token) implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
}
