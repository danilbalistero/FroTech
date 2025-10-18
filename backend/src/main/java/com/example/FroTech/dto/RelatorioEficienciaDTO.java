package com.example.FroTech.dto;

public record RelatorioEficienciaDTO(
        String placa,
        String modelo,
        String tipoCombustivel,
        Double consumoMedioKmL,
        Double custoPorKm,
        Double distanciaTotal,
        Double precoMedioLitro,
        Double custoTotal
) { }
