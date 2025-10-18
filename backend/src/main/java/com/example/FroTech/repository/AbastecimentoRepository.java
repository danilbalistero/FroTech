package com.example.FroTech.repository;

import com.example.FroTech.model.Abastecimento;
import com.example.FroTech.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AbastecimentoRepository extends JpaRepository<Abastecimento, Long> {

    List<Abastecimento> findByVeiculoAndTanqueCheioTrueAndDataBetweenOrderByDataAsc(Veiculo veiculo, LocalDate dataInicio, LocalDate dataFim);

}
