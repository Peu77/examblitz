package de.examblitz.core.dto;

import java.io.Serializable;



public record TokenResponse(String token) implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
}
