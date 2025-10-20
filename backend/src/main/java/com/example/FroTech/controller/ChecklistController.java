package com.example.FroTech.controller;

import com.example.FroTech.model.Checklist;
import com.example.FroTech.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checklists")
public class ChecklistController {

    @Autowired
    private ChecklistService checklistService;

    @PostMapping
    public ResponseEntity<Checklist> realizarChecklist(@RequestBody Checklist checklist, @RequestParam Long veiculoId, @AuthenticationPrincipal UserDetails usuarioDetalhes) {
        String emailDoMotorista = usuarioDetalhes.getUsername();
        Checklist novoChecklist = checklistService.realizarChecklist(checklist, veiculoId, emailDoMotorista);
        return ResponseEntity.ok(novoChecklist);
    }
}