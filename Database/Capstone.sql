drop database if exists Capstone;
create database Capstone;
use Capstone;

create table Movie(
	No int auto_increment primary key,
    Name varchar(40),
    poster varchar(250),
    genre varchar(20),
    releaseDate date,
    country varchar(100),
    runTime int,
    director varchar(30),
    actor varchar(250),
    filmRating char(18)
);

create table Comment(
	No int auto_increment primary key,
	Comment varchar(280),
    time datetime,
    Movie int,
    evaluation boolean ,
    foreign key(Movie) references Movie(No)
);

create table Keyword(
	No int auto_increment primary key,
    Keyword varchar(20),
    Count int,
    Movie int,
	evaluation boolean,
	foreign key(Movie) references Movie(No)
);


create table user(
	id char(20) primary key,
    password char(30),
    name char(30),
    birth date,
    gender boolean
);

create view movieshow(name, poster, genre, releasedate, country, runtime, director, actor, filmrating)
as
	select m.name, m.poster, m.genre, m.releasedate, m.country, m.runtime, m.director, m.actor, m.filmrating
	from movie m;

create view commentshow(movie, comment, time, evaluation)
as
	select m.name, c.comment, c.time, c.evaluation
    from movie m, comment c
    where m.no = c.movie;

create view keywordshow(movie, keyword, count, evaluation)
as 
	select m.name, k.keyword, k.count, k.evaluation 
    from movie m, keyword k
    where m.no = k.movie and count>=5;

