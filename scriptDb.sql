-----------------------
select * from utente;
select * from task
select * from endedtask

DELETE FROM task where true
INSERT INTO task values ('luca',12345,'tds',3,'prova1',1)
CREATE TABLE utente (
    username VARCHAR(40) NOT NULL,
    paswd VARCHAR(32) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE task (
    username VARCHAR(40) NOT NULL,
    keyhash VARCHAR(32) NOT NULL,
    title VARCHAR(25) NOT NULL,
    pomodori INT NOT NULL,
    note VARCHAR(115),
    donepomodori INT NOT NULL,
    ind INT NOT NULL,
    tim INT NOT NULL,
    PRIMARY KEY (username,keyhash),
    FOREIGN KEY (username) REFERENCES utente(username) ON UPDATE CASCADE
);

CREATE TABLE endedtask (
    username VARCHAR(40) NOT NULL,
    keyhash VARCHAR(32) NOT NULL,
    title VARCHAR(25) NOT NULL,
    pomodori INT NOT NULL,
    note VARCHAR(115),
    dat VARCHAR(10) NOT NULL,
    tim INT NOT NULL,
    ora VARCHAR(8) NOT NULL,
    PRIMARY KEY (username,keyhash),
    FOREIGN KEY (username) REFERENCES utente(username) ON UPDATE CASCADE
);

CREATE TABLE richieste (
    richiedente VARCHAR(40) NOT NULL,
    accettante VARCHAR(40) NOT NULL,
    PRIMARY KEY (richiedente,accettante),
    FOREIGN KEY (richiedente) REFERENCES utente(username) ON UPDATE CASCADE,
    FOREIGN KEY (accettante) REFERENCES utente(username) ON UPDATE CASCADE
);

CREATE TABLE amici (
    utentea VARCHAR(40) NOT NULL,
    utenteb VARCHAR(40) NOT NULL,
    PRIMARY KEY (utentea,utenteb),
    FOREIGN KEY (utentea) REFERENCES utente(username) ON UPDATE CASCADE,
    FOREIGN KEY (utenteb) REFERENCES utente(username) ON UPDATE CASCADE
);
CREATE TABLE imgutente(
    utente VARCHAR(40) NOT NULL,
    percorso VARCHAR (255) NOT NULL,
    PRIMARY KEY (utente),
    FOREIGN KEY (utente) REFERENCES utente(username) ON UPDATE CASCADE
);
insert into utente values ('max','Password.1=');
insert into utente values ('max1','Password.1=');
insert into utente values ('max2','Password.1=');
insert into utente values ('max3','Password.1=');
insert into utente values ('max4','Password.1=');
insert into utente values ('max5','Password.1=');
insert into utente values ('max6','Password.1=');
insert into utente values ('marco','Password.1=');
insert into utente values ('luca','Password.1=');


insert into amici values ('luca','marco');
insert into amici values('luca','max');
insert into amici values('luca','max1');
insert into amici values('max','max3');
insert into amici values('max','max4');
insert into amici values('max','max5');
insert into amici values('max','max6');


INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '0123456778', '10-05-2023', 1, '', '12-05-2023', 3, '03:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '0123456781', '10-05-2023', 1, '', '12-04-2023', 3, '13:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '0123456782', '10-05-2023', 1, '', '12-06-2023', 3, '23:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '0123456783', '10-05-2023', 1, '', '10-05-2023', 3, '00:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '0123456784', '10-05-2023', 1, '', '11-05-2023', 3, '08:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '01234567852', '10-05-2023', 1, '', '12-05-2023', 5, '03:00:00' );
INSERT INTO endedtask(username, keyhash, title, pomodori, note, dat, tim,ora)
	VALUES ('luca', '012345678554', '10-05-2023', 1, '', '12-05-2023', 3, '13:00:00' );


