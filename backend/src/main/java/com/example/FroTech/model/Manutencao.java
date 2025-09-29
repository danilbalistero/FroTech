package com.example.FroTech.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Manutencao {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private LocalDate dataAgendada;
    private LocalDate dataRealizada;
    private LocalDate dataCancelamento;
    private double custo;

    @Enumerated(EnumType.STRING)
    private StatusManutencao status;

    @Enumerated(EnumType.STRING)
    private TipoManutencao tipoManutencao;

    private String motivoCancelamento;
    private Integer kmManutencao;

    @ManyToOne
    private Veiculo veiculo;

}