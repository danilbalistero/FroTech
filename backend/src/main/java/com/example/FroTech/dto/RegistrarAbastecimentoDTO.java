package com.example.FroTech.dto;

import com.example.FroTech.model.TipoCombustivel;

import java.time.LocalDate;

public record RegistrarAbastecimentoDTO(
        Long veiculoId,
        LocalDate data,
        Integer kmAbastecimento,
        Double litros,
        Double valorLitro,
        Double custo,
        boolean tanqueCheio,
        TipoCombustivel tipoCombustivel
) {
}
