CREATE DATABASE IF NOT EXISTS FANKINGDOM default character set utf8mb4 COLLATE utf8mb4_unicode_ci;

use FANKINGDOM;

-- Creación de tablas

-- 0. Tabla usuarios
create table if not exists usuarios (
usuarioId int auto_increment primary key,
nombreUsuario varchar(50) not null,
correoElectronico varchar(50) not null,
contrasenya varchar(20) not null,
fechaCreacionPerfil date not null,
fotoPerfil LONGBLOB,
textoPresentacion text,
fechaNacimiento date,
lugarNacimiento varchar(50),
lugarResidencia varchar(50),
mensajes text,
suscripciones text
);

-- describe usuarios;



create table if not exists Usuario_Comunidad(
usuarioId int,
comunidadId int,
primary key (usuarioId, comunidadId),
foreign key (usuarioId) references Usuarios(usuarioId),
foreign key (comunidadId) references Comunidades(comunidadId)
);


-- 1. Tabla fanfics
create table if not exists fanfics(
fanficId int auto_increment primary key,
autorId int not null,
nombreUsuario varchar(50) not null,
categoriaGeneral varchar (100) not null,
categoriaTema varchar(255),
fechaPublicacion date not null,
fechaModificacion date not null,
texto text not null,
totalPalabras int not null,
totalCapitulos int not null,
idioma varchar(20),
etiquetasStandard text,
etiquetasPersonalizadas text,
votos int not null,
suscripciones int not null,
comentarios text,
sinopsis text,
foreign key (autorId) references usuarios(usuarioId) on update
cascade on delete cascade
);

create table if not exists Fanfic_Comunidad (
fanficId int,
comunidadId int,
primary key (fanficId, comunidadId),
foreign key (fanficId) references FanFics(fanficId),
foreign key (comunidadId) references Comunidades(comunidadId)
);


-- 2. Tabla fanarts
create table if not exists fanarts(
fanartId int auto_increment primary key,
autorId int not null,
nombreUsuario varchar(50) not null,
nombreFanart varchar(100) not null,
tecnicaFanart varchar(100),
categoriaGeneral varchar(100) not null,
fechaPublicacion date not null,
etiquetasStandard text,
etiquetasPersonalizadas text,
temaFanart varchar(50) not null,
votos int not null,
suscripciones int default 0,
comentarios text,
foreign key (autorId) references usuarios(usuarioId) on update
cascade on delete cascade
);

create table if not exists Fanart_Comunidad (
fanartId int,
comunidadId int,
primary key (fanartId, comunidadId),
foreign key (fanartId) references FanArts(fanartId),
foreign key (comunidadId) references Comunidades(comunidadId)
);


-- 3. Tabla fanvids
create table if not exists fanvids(
fanvidId int auto_increment primary key,
autorId int not null,
nombreUsuario varchar(50) not null,
categoriaGeneral varchar(100) not null,
duracionVid time not null,
fechaPublicacion date not null,
etiquetasStandard text,
etiquetasPersonalizadas text,
temaFanvid varchar(255),
votos int default 0,
suscripciones int default 0,
comentarios text,
foreign key (autorId) references usuarios(usuarioId) on update
cascade on delete cascade
);

create table if not exists Fanvid_Comunidad (
fanvidId int,
comunidadId int,
primary key (fanvidId, comunidadId),
foreign key (fanvidId) references FanVids(fanvidId),
foreign key (comunidadId) references Comunidades(comunidadId)
);


-- 4. Tabla comunidades
create table if not exists comunidades(
comunidadId int auto_increment primary key,
nombreComunidad varchar(255) not null,
categoriaGeneral text,
etiquetasStandard text,
relacionesPopulares text,
etiquetasPersonalizadas text,
miembrosComunidad int default 0,
trabajosComunidad int default 0
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
create table if not exists mensajes (
mensajeId int auto_increment primary key,
remitenteId int,
destinatarioId int,
textoMensaje text not null,
fechaEnvio timestamp default current_timestamp,
foreign key (remitenteId) references usuarios(usuarioId),
foreign key (destinatarioId) references usuarios(usuarioId)
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

select s.suscripcionId, 
       s.fechaSuscripcion,
       coalesce(f.nombreUsuario, fa.nombreUsuario, fv.nombreUsuario) as nombreUsuario,
       s.tipoTrabajo
from suscripciones s
	left join fanfics f on s.trabajoId = f.fanficId and s.tipoTrabajo = 'fanfic'
	left join fanarts fa on s.trabajoId = fa.fanartId and s.tipoTrabajo = 'fanart'
	left join fanvids fv on s.trabajoId = fv.fanvidId and s.tipoTrabajo = 'fanvid'
where s.usuarioId = 1;

