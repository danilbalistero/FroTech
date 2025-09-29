package com.example.FroTech.controller;

import com.example.FroTech.dto.UsuarioDTO;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository user;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = (List<Usuario>) user.findAll();

        return usuarios.stream()
                .map(usuario -> new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getRole()))
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody Usuario usuario) {
        if (user.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Já existe um usuário com este e-mail.");
        }

        usuario.setSenha(encoder.encode(usuario.getSenha()));
        return ResponseEntity.ok(user.save(usuario));
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> existente = user.findById(id);

        if (existente.isPresent()) {
            Usuario atual = existente.get();

            atual.setNome(usuario.getNome());
            atual.setEmail(usuario.getEmail());

            if (usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
                atual.setSenha(encoder.encode(usuario.getSenha()));
            }

            atual.setRole(usuario.getRole());

            return user.save(atual);
        }

        throw new RuntimeException("Usuário não encontrado");
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        user.deleteById(id);
    }
}
