use fankingdom;

insert into usuarios (nombreUsuario, correoElectronico, contrasenya, fechaCreacionPerfil, textoPresentacion, fechaNacimiento) 
values ('brina', 'brina.padilha@gmail.com', 'Abc123.', '2024-10-27', 'No sé lo que hago.', '2003-05-13');

insert into usuarios (nombreUsuario, correoElectronico, contrasenya, fechaCreacionPerfil, textoPresentacion, fechaNacimiento)
values ('kika', 'kika@gmail.com', 'Atún18', '2024-10-27', 'Le gata', '2018-03-01');


insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Velvet', 'Basado en una serie de televisión');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Percy Jackson', 'Basado en una saga de libros');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Stranger Things', 'Basado en una serie de televisión');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Fantastic Beasts', 'Basado en una saga de películas');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Hamilton', 'Basado en un musical');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('The Big Bang Theory', 'Basado en una serie de televisión');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Harry Potter', 'Basado en una saga de libros');

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Epic', 'Basado en un musical');

INSERT INTO Usuario_Comunidad (usuarioId, comunidadId) VALUES (1, 1), (1, 2);

select * from comunidades /*where categoriaGeneral = 'Basado en una serie de televisión'*/;

-- describe Usuario_Comunidad;
 

 
 