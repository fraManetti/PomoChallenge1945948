create table utente (
    username varchar(40) not null, 
    paswd varchar(32) not null,
    primary key (username)
);
create table task (
    username varchar(40) not null, 
    keyhash varchar(32) not null,
	title varchar(25) not null,
	pomodori int not null,
	note varchar(115),
	donepomodori int not null,
	ind int not null,
    tim int not null,
	primary key (username,keyhash),
	FOREIGN KEY (username) REFERENCES utente(username)

);

create table endedtask (
    username varchar(40) not null, 
    keyhash varchar(32) not null,
	title varchar(25) not null,
	pomodori int not null,
	note varchar(115),
	dat varchar(10) not null,
    tim int not null,
	primary key (username,keyhash),
	FOREIGN KEY (username) REFERENCES utente(username)

);

create table richieste (
	richiedente varchar(40) not null,
	accettante varchar(40) not null,
	primary key (richiedente,accettante),
	FOREIGN KEY (richiedente) REFERENCES  utente(username),
	FOREIGN KEY (accettante) REFERENCES  utente(username)
);
create table amici (
	utentea varchar(40) not null,
	utenteb varchar(40) not null,
	primary key (utentea,utenteb),
	FOREIGN KEY (utentea) REFERENCES  utente(username),
	FOREIGN KEY (utenteb) REFERENCES  utente(username)
	);
-----------------------
select * from utente;
select * from task
select * from endedtask

DELETE FROM task where true
INSERT INTO task values ('luca',12345,'tds',3,'prova1',1)
insert into utente values ('max','Password.1=');
insert into utente values ('max1','Password.1=');
insert into utente values ('max2','Password.1=');
insert into utente values ('max3','Password.1=');
insert into utente values ('max4','Password.1=');
insert into utente values ('max5','Password.1=');
insert into utente values ('max6','Password.1=');

insert into amici values ('luca','marco')
insert into amici values('luca','max');
insert into amici values('luca','max1');
insert into amici values('max','max3');
insert into amici values('max','max4');
insert into amici values('max','max5');
insert into amici values('max','max6');