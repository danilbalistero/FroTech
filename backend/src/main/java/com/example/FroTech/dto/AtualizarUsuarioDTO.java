package com.example.FroTech.dto;

import com.example.FroTech.model.UsuarioRole;

public record AtualizarUsuarioDTO (String nome, String email, UsuarioRole role) {
}
