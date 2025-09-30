package com.example.FroTech.dto;

import jakarta.validation.constraints.NotEmpty;

public record DefinirSenhaDTO(@NotEmpty String novaSenha) {
}
