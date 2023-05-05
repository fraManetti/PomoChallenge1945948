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
	primary key (username,keyhash),
	FOREIGN KEY (username) REFERENCES utente(username)

);

create table endedtask (
    username varchar(40) not null, 
    keyhash varchar(32) not null,
	title varchar(25) not null,
	pomodori int not null,
	note varchar(115),
	data varchar(10) not null,
	primary key (username,keyhash),
	FOREIGN KEY (username) REFERENCES utente(username)

);

-----------------------
select * from utente;
select * from task
select * from endedtask

DELETE FROM task where true