CREATE DATABASE IF NOT EXISTS FANKINGDOM default character set utf8mb4 COLLATE utf8mb4_unicode_ci;

use FANKINGDOM;

-- Creación de tablas

-- 0. Tabla usuarios
create table if not exists usuarios (
usuarioId int auto_increment primary key,
nombreUsuario varchar(50) not null,
correoElectronico varchar(100) not null,
contrasenya varchar(20) not null,
fechaCreacionPerfil datetime default current_timestamp,
fotoPerfil LONGBLOB,
textoPresentacion text,
fechaNacimiento date,
lugarNacimiento varchar(50),
lugarResidencia varchar(50),
rol enum('usuario','moderador','administrador') default 'usuario',
);


create table if not exists Usuario_Comunidad(
usuarioId int,
comunidadId int,
primary key (usuarioId, comunidadId),
foreign key (usuarioId) references Usuarios(usuarioId),
foreign key (comunidadId) references Comunidades(comunidadId)
);


create table publicaciones (
    publicacionId int auto_increment primary key,
    titulo varchar(200) not null,
    contenido text not null,
    tipo enum('fanfic', 'fanart', 'fanvid') not null,
    etiquetas varchar(255),
    usuario_id int,
    comunidad_id int,
    fecha_creacion datetime default current_timestamp,
    foreign key (usuarioId) references usuarios(usuarioId),
    foreign key (comunidadId) references comunidades(comunidadId)
);

-- 4. Tabla comunidades
create table if not exists comunidades(
comunidadId int auto_increment primary key,
nombreComunidad varchar(255) unique not null,
descripcion text,
foreign key (moderador_id) references usuarios(id)
);

-- 5. Tabla categorias generales
create table if not exists categoriasGenerales(
categoriaId int auto_increment primary key,
nombreCategoria varchar(100) not null,
etiquetasStandard text,
etiquetasPersonalizadas text,
-- comunidades text,
cantidadTrabajos int default 0
);


-- 6. Tabla mensajes
create table if not exists comentarios(
    id int auto_increment primary key,
    contenido text not null,
    usuario_id int,
    publicacion_id int,
    fecha_creacion datetime default current_timestamp,
    foreign key (usuarioId) references usuarios(usuarioId),
    foreign key (publicacionId) references publicaciones(publicacionId)
);

create table if not exists suscripciones (
    suscripcionId int auto_increment primary key,
    usuarioId int,
    trabajoId int,
    tipoTrabajo enum('fanfic','fanart','fanvid')not null,
    fechaSuscripcion timestamp default current_timestamp,
    foreign key (usuarioId) references usuarios(usuarioId)
);

-- Para obtener la información de las suscripciones de un usuario
/*
select s.suscripcionId, 
       s.fechaSuscripcion,
       coalesce(f.nombreUsuario, fa.nombreUsuario, fv.nombreUsuario) as nombreUsuario,
       s.tipoTrabajo
from suscripciones s
	left join fanfics f on s.trabajoId = f.fanficId and s.tipoTrabajo = 'fanfic'
	left join fanarts fa on s.trabajoId = fa.fanartId and s.tipoTrabajo = 'fanart'
	left join fanvids fv on s.trabajoId = fv.fanvidId and s.tipoTrabajo = 'fanvid'
where s.usuarioId = 1;
*/
