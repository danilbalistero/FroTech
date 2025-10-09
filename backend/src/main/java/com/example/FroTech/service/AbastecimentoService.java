package com.example.FroTech.service;

import com.example.FroTech.dto.RegistrarAbastecimentoDTO;
import com.example.FroTech.model.Abastecimento;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.AbastecimentoRepository;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AbastecimentoService {

    @Autowired
    private AbastecimentoRepository abastecimentoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Abastecimento registrarAbastecimento(RegistrarAbastecimentoDTO dto, Usuario motorista){
        Veiculo veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new IllegalArgumentException("Veiculo não encontrado"));

        if(dto.kmAbastecimento() <= veiculo.getKmAtual()){
            throw new IllegalArgumentException("A quilometragem informada deve ser maior que a quilometragem atual do veículo");
        }

        veiculo.setKmAtual(dto.kmAbastecimento());

        Abastecimento novoAbastecimento = new Abastecimento();

        novoAbastecimento.setVeiculo(veiculo);
        novoAbastecimento.setMotorista(motorista);
        novoAbastecimento.setData(dto.data());
        novoAbastecimento.setKmAbastecimento(dto.kmAbastecimento());
        novoAbastecimento.setLitros(dto.litros());
        novoAbastecimento.setCusto(dto.custo());
        novoAbastecimento.setTipoCombustivel(dto.tipoCombustivel());
        novoAbastecimento.setTanqueCheio(dto.tanqueCheio());

        return abastecimentoRepository.save(novoAbastecimento);
    }


}
