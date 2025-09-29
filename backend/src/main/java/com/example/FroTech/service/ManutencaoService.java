package com.example.FroTech.service;

import com.example.FroTech.model.Manutencao;
import com.example.FroTech.model.StatusManutencao;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.ManutencaoRepository;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ManutencaoService {

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Manutencao registrar(Manutencao manutencao) {
        if (manutencao.getTipoManutencao() == null){
            throw new IllegalArgumentException("O tipo de manutenção (PREVENTIVA ou CORRETIVA) é obrigatório");
        }
        Veiculo veiculoExiste = veiculoRepository.findByIdAndAtivoTrue(manutencao.getVeiculo().getId())
                .orElseThrow(() -> new IllegalArgumentException("Veiculo não encontrado ou inativo"));
        manutencao.setKmManutencao(veiculoExiste.getKmAtual());

        manutencao.setVeiculo(veiculoExiste);
        if (manutencao.getDataAgendada() != null) {
            manutencao.setStatus(StatusManutencao.AGENDADA);
        } else {
            manutencao.setStatus(StatusManutencao.ABERTA);
        }
        return manutencaoRepository.save(manutencao);

    }

    public List<Manutencao> listarManutencoes(){
        List<Manutencao> todasManutencoes = manutencaoRepository.findAll();
        LocalDate hoje = LocalDate.now();

        for (Manutencao manutencao : todasManutencoes){

            if (manutencao.getStatus() == StatusManutencao.AGENDADA &&
                    manutencao.getDataAgendada() != null &&
                    manutencao.getDataAgendada().isBefore(hoje)) {

                manutencao.setStatus(StatusManutencao.ATRASADA);
            }
        }
        return todasManutencoes;
    }

    public Manutencao agendar(Long id, LocalDate dataAgendada){
        Manutencao manutencaoExiste = manutencaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Manutenção não encontrada"));

        if (!manutencaoExiste.getStatus().equals(StatusManutencao.ABERTA)){
            throw new IllegalArgumentException("Manutenção não agendada, pois só é permitido agendar manutenções em aberto.");
        }

        manutencaoExiste.setDataAgendada(dataAgendada);
        manutencaoExiste.setStatus(StatusManutencao.AGENDADA);

        return manutencaoRepository.save(manutencaoExiste);
    }

    public Manutencao iniciar(Long id){
        Manutencao manutencaoExiste = manutencaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Manutenção não encontrada"));

        if (!manutencaoExiste.getStatus().equals(StatusManutencao.AGENDADA) &&
                !manutencaoExiste.getStatus().equals(StatusManutencao.ATRASADA)){
            throw new IllegalArgumentException("Manutenção não iniciada, pois so é permitido iniciar manutenções agendadas");
        }

        manutencaoExiste.setStatus(StatusManutencao.ANDAMENTO);

        return manutencaoRepository.save(manutencaoExiste);
    }

    public Manutencao concluir(Long id, LocalDate dataRealizada, Double custo){
        Manutencao manutencaoExiste = manutencaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Manutenção não encontrada"));

        if (!manutencaoExiste.getStatus().equals(StatusManutencao.ANDAMENTO)){
            throw new IllegalArgumentException("Não foi possivel concluir a manutenção");
        }

        manutencaoExiste.setDataRealizada(dataRealizada);
        manutencaoExiste.setCusto(custo);
        manutencaoExiste.setStatus(StatusManutencao.CONCLUIDA);

        return manutencaoRepository.save(manutencaoExiste);

    }

    public Manutencao cancelar(Long id, String motivoCancelamento, LocalDate dataCancelamento){
        Manutencao manutencaoExiste = manutencaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Manutenção não encontrada"));

        if (!(manutencaoExiste.getStatus().equals(StatusManutencao.ABERTA) ||
                manutencaoExiste.getStatus().equals(StatusManutencao.AGENDADA))){
            throw new IllegalArgumentException("Apenas manutenções em aberto ou agendadas podem ser canceladas");
        }

        manutencaoExiste.setMotivoCancelamento(motivoCancelamento);
        manutencaoExiste.setDataCancelamento(dataCancelamento);
        manutencaoExiste.setStatus(StatusManutencao.CANCELADA);

        return manutencaoRepository.save(manutencaoExiste);
    }

}
