package com.example.FroTech.repository;

import com.example.FroTech.model.StatusVeiculo;
import com.example.FroTech.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    Optional<Veiculo> findByPlaca(String placa);

    List<Veiculo> findAllByAtivoTrue();
    Optional<Veiculo> findByIdAndAtivoTrue(Long id);
    List<Veiculo> findByAtivoFalse();
    List<Veiculo> findByAtivoTrueAndStatus(StatusVeiculo statusVeiculo);
}
