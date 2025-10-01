package com.example.FroTech.controller;

import com.example.FroTech.config.TokenService;
import com.example.FroTech.dto.AutenticacaoDTO;
import com.example.FroTech.dto.LoginResponseDTO;
import com.example.FroTech.dto.RegistrarDTO;
import com.example.FroTech.dto.UsuarioDTO;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticacaoDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        //pega o objeto do usuario completo
        Usuario usuario = (Usuario) auth.getPrincipal();

        //gera o token para esse usuario
        var token = tokenService.generateToken(usuario);

        //cria a resposta com o token e com a informação se precisa ou n alterar a senha
        return ResponseEntity.ok(new LoginResponseDTO(token, usuario.isAlterarSenha()));
    }

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> registrar(@RequestBody @Valid RegistrarDTO data){
        UsuarioDTO usuarioSalvo = usuarioService.registrarNovoUsuario(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

}
