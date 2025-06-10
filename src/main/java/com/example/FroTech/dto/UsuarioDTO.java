package com.example.FroTech.dto;

import com.example.FroTech.model.UsuarioRole;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String role;

    public UsuarioDTO(Long id, String nome, String email, UsuarioRole role) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role != null ? role.getRole() : null;
    }
}