package com.example.FroTech.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;

    public UsuarioDTO() {}

    public UsuarioDTO(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

}