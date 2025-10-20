package com.example.FroTech.service;

import com.example.FroTech.model.Checklist;
import com.example.FroTech.model.StatusVeiculo;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.ChecklistRepository;
import com.example.FroTech.repository.UsuarioRepository;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ChecklistService {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Checklist realizarChecklist(Checklist checklist, Long veiculoId, String usuarioEmail) {
        Veiculo veiculo = veiculoRepository.findById(veiculoId)
                .orElseThrow(() -> new RuntimeException("Veiculo com ID " + veiculoId + "não encontrado"));

        Usuario usuario = usuarioRepository.findByEmail(usuarioEmail)
                .orElseThrow(() -> new RuntimeException("Usuario com email " + usuarioEmail + " não encontrado"));

        if (veiculo.getStatus() != StatusVeiculo.DISPONIVEL){
            throw new IllegalArgumentException("O veiculo " + veiculo.getPlaca() + " não esta disponivel");
        }

        checklist.setVeiculo(veiculo);
        checklist.setUsuario(usuario);
        checklist.setDataHora(LocalDateTime.now());

        veiculo.setStatus(StatusVeiculo.INDISPONIVEL);

        veiculo.setUsuario(usuario);
        veiculoRepository.save(veiculo);

        return checklistRepository.save(checklist);
    }


}
