package com.example.FroTech.service;

import com.example.FroTech.model.StatusVeiculo;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public List<Veiculo> listarVeiculosAtivos(){
        return veiculoRepository.findAllByAtivoTrue();
    }

    public Optional<Veiculo> buscarIdAtivo(Long id){
        return veiculoRepository.findByIdAndAtivoTrue(id);
    }

    public Veiculo salvarNovoVeiculo(Veiculo veiculo){
        Optional<Veiculo> veiculoExistente = veiculoRepository.findByPlaca(veiculo.getPlaca());
        if (veiculoExistente.isPresent()){
            throw new IllegalArgumentException("Já existe um veículo cadastrado com esta placa");
        }

        veiculo.setAtivo(true);
        veiculo.setPlaca(veiculo.getPlaca().toUpperCase());

        if (veiculo.getStatus() == null) {
            veiculo.setStatus(StatusVeiculo.DISPONIVEL);
        }

        return veiculoRepository.save(veiculo);
    }

    public Veiculo editarVeiculo(Long id, Veiculo veiculo){
        Optional<Veiculo> veiculoExiste = veiculoRepository.findByIdAndAtivoTrue(id);

        if (veiculoExiste.isEmpty()){
            throw new RuntimeException("Veículo não encontrado para editar");
        }

        Veiculo veiculoExistente = veiculoExiste.get();

        veiculoExistente.setPlaca(veiculo.getPlaca().toUpperCase());
        veiculoExistente.setMarca(veiculo.getMarca());
        veiculoExistente.setModelo(veiculo.getModelo());
        veiculoExistente.setAno(veiculo.getAno());
        veiculoExistente.setKmAtual(veiculo.getKmAtual());
        veiculoExistente.setCapacidadeTanque(veiculo.getCapacidadeTanque());
        veiculoExistente.setStatus(veiculo.getStatus());

        return veiculoRepository.save(veiculoExistente);
    }

    public boolean inativar(Long id){
        Optional<Veiculo> inativarVeiculo = veiculoRepository.findByIdAndAtivoTrue(id);
        if (inativarVeiculo.isPresent()){
            Veiculo veiculo = inativarVeiculo.get();
            veiculo.setAtivo(false);
            veiculo.setStatus(null);
            veiculoRepository.save(veiculo);
            return true;
        }
        return false;
    }

    public List<Veiculo> listarVeiculosInativos(){
        return veiculoRepository.findByAtivoFalse();
    }

    public boolean recuperar(Long id){
        Optional<Veiculo> recuperarVeiculo = veiculoRepository.findById(id);

        if (recuperarVeiculo.isPresent() && !recuperarVeiculo.get().isAtivo()){
        Veiculo veiculo = recuperarVeiculo.get();
        veiculo.setAtivo(true);
        veiculo.setStatus(StatusVeiculo.DISPONIVEL);
        veiculoRepository.save(veiculo);
        return true;
        }
        return false;
    }

}
