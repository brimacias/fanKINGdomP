/**package com.nombreProyecto.controller;*/

/**IMPORTS */

//@RestController
//@RequestMapping("api/usuarios")

public class UsuarioController {

    //@Autowired
    private UsuarioService usuarioService;

    //@PostMapping("api/usuarios")
    public ResponseEntity<String> registrarUsuario(@RequestBody Usuario usuario) {
        if (usuario.registrar(usuario)) {
            return (usuarioService.ok("Usuario registrado con éxito"));
        } else {
            return ResponseEntity.badRequest.body("Error en el registro");
        }
    }
}