package com.example.FroTech.controller;

import com.example.FroTech.dto.RegistrarAbastecimentoDTO;
import com.example.FroTech.model.Abastecimento;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.service.AbastecimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/abastecimentos")
public class AbastecimentoController {

    @Autowired
    AbastecimentoService abastecimentoService;

    @PostMapping
    public ResponseEntity<Abastecimento> registrarAbastecimento(@Valid @RequestBody RegistrarAbastecimentoDTO dto, @AuthenticationPrincipal Usuario motorista){
        Abastecimento novoAbastecimento = abastecimentoService.registrarAbastecimento(dto, motorista);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAbastecimento);
    }
}
