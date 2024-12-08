use fankingdom;

select * from usuarios;
-- Registros usuarios
/*
insert into usuarios (nombreUsuario, correoElectronico, contrasenya, fechaCreacionPerfil, textoPresentacion, fechaNacimiento) 
values ('brina', 'brina.padilha@gmail.com', 'Abc123.', '2024-10-27', 'No sé lo que hago.', '2003-05-13');

insert into usuarios (nombreUsuario, correoElectronico, contrasenya, fechaCreacionPerfil, textoPresentacion, fechaNacimiento)
values ('kika', 'kika@gmail.com', 'Atún18', '2024-10-27', 'Le gata', '2018-03-01');
*/

insert into categoriasgenerales(nombreCategoria) value('Basado en un musical.');

-- Registros comunidades
/*
insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Velvet', 1);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Percy Jackson', 2);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Stranger Things', 1);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Fantastic Beasts', 3);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Hamilton', 4);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('The Big Bang Theory', 1);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Harry Potter', 2);

insert into comunidades (nombreComunidad, categoriaGeneral)
values ('Epic', 4);
*/

-- Registros usuario_Comunidad
/*
INSERT INTO Usuario_Comunidad (usuarioId, comunidadId) VALUES (1, 1), (1, 2);

INSERT INTO Usuario_Comunidad (usuarioId, comunidadId) VALUES (1, 4), (1, 3);
*/


-- Consultas a tablas
-- drop table publicaciones;

-- select * from comunidades /*where categoriaGeneral = 'Basado en una serie de televisión'*/;
 
-- describe categoriasgenerales;

-- select * from publicaciones;
-- Borrados de registros erróneos

-- delete from comunidades where comunidadId > 8;

-- delete from categoriasgenerales where categoriaId = 3;
select * from warning;
-- insert into etiquetasstandard(textoEtiqueta) value ('One Shot');
-- insert into warning(textoWarning) value ('+18');

select * from publicaciones;

insert into publicaciones(titulo,contenido,tipo,etiqueta,warning,usuarioId,comunidadId) values ("The Hound of the Baskervilles",
"Brian was overjoyed.
How could he not? He has just been handpicked by Rupert Murdoch, a media mogul who had recently bought an English newspaper, to work for him. Mr. Murdoch seemed to be good friends with Richard Pickens, a legend in journalism and someone Brian was proud to call a mentor, and he had been the one to put on a good word for him and other coleagues who were going work in the newspaper with him.
It was such an honor that of all the journalists he knew, Mr. Pickens had not only remembered, but also recommened him for such a job. He hadn’t been the only one, of course, but being among the selected group was a huge deal. Ingrid would be proud. Or maybe not so much.
His wife had never really understood his fixation with his work. She had respected it, but could never understand why when he was working in a case, it would become the only thing in his mind and he was unable to concentrate very much in anything else. He worked a lot, and she had been left aside. She would often ask him, practically beg him, to quit his job. They had more that enough money to live comfortably for the rest of their lives. His job could be dangerous, he had been threatened for his reports before, it wasn’t fitting for a family man.
She had really wanted to have children, and he had wanted it too, but not nearly as much as he should have, or as much as he wanted to prove that the company he had been investigating hired illegal inmigrants and had them working in inhumane conditions, or as much as he wanted to put the boss and employes who were involved behind bars.
She was right to leave him, he wasn’t ready to truly commit to anything that didn’t have to do with his work.", 'fanfic', 3, 4, 1, 1);
