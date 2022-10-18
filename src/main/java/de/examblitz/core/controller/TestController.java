package de.examblitz.core.controller;

import de.examblitz.core.utils.UserPrincipal;
import de.examblitz.core.model.UserModel;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping("/me")
    public UserModel lost() {
        var user = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserModel();

        return user;
    }
}
