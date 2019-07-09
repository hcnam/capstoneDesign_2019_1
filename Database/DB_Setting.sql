drop database if exists MovieDB;
create database MovieDB;
use MovieDB;

create table Movie(
	No int auto_increment primary key,
    `Name` varchar(40),
    poster varchar(250),
    stealScene varchar(250),
    genre varchar(20),
    releaseDate varchar(15),
    country varchar(100),
    runTime varchar(20),
    director varchar(30),
    actor varchar(250),
    story1 varchar(2000),
    important varchar(200),
    story2 varchar(2000)
);

create table Comment(
	No int auto_increment primary key,
    ID varchar(50),
	Comment varchar(300),
    time timestamp DEFAULT CURRENT_TIMESTAMP,
    Movie int,
    evaluation boolean ,
    foreign key(Movie) references Movie(No)
);

alter table Comment
modify time timestamp DEFAULT CURRENT_TIMESTAMP;

create table Keyword(
    Keyword varchar(20),
    Count int,
    Movie int,
	evaluation boolean,
    primary key(Keyword, Movie, evaluation),
	foreign key(Movie) references Movie(No)
);



create table user(
	id char(20) primary key,
    password char(30),
    name char(30),
    birth date,
    gender boolean
);

create view movieshow(No, name, poster, stealScene, genre, releasedate, country, runtime, director, actor, story1, important, story2)
as
	select * from Movie;

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
