package com.example.FroTech.dto;

import com.example.FroTech.model.Usuario;
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

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        if (usuario.getRole() != null) {
            this.role = usuario.getRole().getRole();
        }
    }
}