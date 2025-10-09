package com.example.FroTech.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Abastecimento {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private Double custo;
    private Double litros;
    private Integer kmAbastecimento;
    private boolean tanqueCheio;

    @Enumerated(EnumType.STRING)
    private TipoCombustivel tipoCombustivel;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Usuario motorista;
}
