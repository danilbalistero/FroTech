package com.example.FroTech.dto;

import com.example.FroTech.model.Manutencao;
import com.example.FroTech.model.TipoManutencao;

import java.time.LocalDate;

public record ManutencaoDTO(
        Long id,
        String descricao,
        TipoManutencao tipoManutencao,
        LocalDate dataAgendada,
        LocalDate dataRealizada,
        Double custo,
        String status,
        String motivoCancelamento,
        String placaVeiculo,
        String modeloVeiculo,
        Integer kmAtualVeiculo
) {
    public ManutencaoDTO(Manutencao m) {
        this(
                m.getId(),
                m.getDescricao(),
                m.getTipoManutencao(),
                m.getDataAgendada(),
                m.getDataRealizada(),
                m.getCusto(),
                m.getStatus().name(),
                m.getMotivoCancelamento(),
                m.getVeiculo() != null ? m.getVeiculo().getPlaca() : null,
                m.getVeiculo() != null ? m.getVeiculo().getModelo() : null,
                m.getVeiculo() != null ? m.getVeiculo().getKmAtual() : null
        );
    }
}
