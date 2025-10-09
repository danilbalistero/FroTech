package com.example.FroTech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Pattern(
            regexp = "^[A-Z]{3}[0-9][A-Z][0-9]{2}$",
            message = "A placa deve seguir o padrão Mercosul: ABC1D23"
    )
    private String placa;
    private String modelo;
    private String marca;
    private int ano;
    private Integer kmAtual;

    @Enumerated(EnumType.STRING)
    private StatusVeiculo status;

    private boolean ativo = true;
    private Double capacidadeTanque;
}
