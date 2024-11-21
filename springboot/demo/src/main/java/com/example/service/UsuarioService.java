@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean registrar(Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()) != null) {
            return false; // Email ya en uso
        }
        usuario.setContraseña(new BCryptPasswordEncoder().encode(usuario.getContraseña())); // Encriptar contraseña
        usuarioRepository.save(usuario);
        return true;
    }
}
