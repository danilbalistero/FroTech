package com.example.FroTech.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {
    private String email;
    private String senha;

    public LoginDTO() {}

}