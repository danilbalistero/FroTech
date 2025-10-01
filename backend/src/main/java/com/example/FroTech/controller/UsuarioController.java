    package com.example.FroTech.controller;

    import com.example.FroTech.dto.AtualizarUsuarioDTO;
    import com.example.FroTech.dto.DefinirSenhaDTO;
    import com.example.FroTech.dto.UsuarioDTO;
    import com.example.FroTech.model.Usuario;
    import com.example.FroTech.service.UsuarioService;
    import jakarta.validation.Valid;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/usuario")
    public class UsuarioController {

        @Autowired
        private UsuarioService usuarioService;

        @GetMapping
        public List<UsuarioDTO> listarUsuarios() {
            return usuarioService.listarUsuariosAtivos();
        }

        @PutMapping("/definir-senha")
        public ResponseEntity definirNovaSenha(@RequestBody @Valid DefinirSenhaDTO dto, @AuthenticationPrincipal Usuario usuarioLogado){
             usuarioService.definirNovaSenha(usuarioLogado, dto.novaSenha());
             return ResponseEntity.ok().build();
        }

        @PutMapping("/{id}")
        public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Long id, @RequestBody @Valid AtualizarUsuarioDTO dto) {
            UsuarioDTO usuarioAtualizado = usuarioService.editarUsuario(id, dto);
            return ResponseEntity.ok(usuarioAtualizado);
        }

        @DeleteMapping("/{id}")
        public void inativarUsuario(@PathVariable Long id) {
            usuarioService.inativarUsuario(id);
        }

        @GetMapping("/inativos")
        public List<UsuarioDTO> listarUsuariosInativos(){
            return usuarioService.listarUsuariosInativos();
        }

        @PutMapping("/{id}/recuperar")
        public void recuperarUsuario(@PathVariable Long id) {
            usuarioService.recuperarUsuario(id);
        }

        @PostMapping("/{id}/resetar-senha")
        public ResponseEntity<String> resetarSenha(@PathVariable Long id){
            String novaSenhaTemporaria = usuarioService.resetarSenha(id);
            return ResponseEntity.ok(novaSenhaTemporaria);
        }
    }
