package com.example.FroTech.dto;

import com.example.FroTech.model.UsuarioRole;

public record RegistrarDTO(String nome, String login, String senha, UsuarioRole role) { }
