package com.example.service;

import com.example.demo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean registrar(Usuario usuario) {
        if (usuarioRepository.findByCorreoElectronico(usuario.getCorreoElectronico()) != null) {
            return false; // Email ya en uso
        }
        usuario.setContrasenya(new BCryptPasswordEncoder().encode(usuario.getContrasenya())); // Encriptar contraseña
        usuarioRepository.save(usuario);
        return true;
    }
}
