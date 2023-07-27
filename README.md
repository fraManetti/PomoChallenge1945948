# POMOCHALLENGE

Implementazione del metodo di concentrazione Pomodoro realizzato da Tamarri Jacopo, Manetti Francesco, De Vecchis Alessia.
  
**Documentazione file e cartelle:**
- /model:
contenente le pagine web del nostro sito
  - amici.php:
Pagina del sito che gestisce le interazioni tra amici 
  - Anon Classifica.php
Pagina visibile all’utente non loggato, che permette di visualizzare solo la classifica globale
  - classifica.php
Pagina visibile all’utente loggato, che permette di visualizzare la classifica globale e quella dei miei amici
  - index.php
Pagina home del sito, contenente il timer le funzionalità di scheduling delle task
  - loginForm.html
Pagina di login 
  - newNavbar.html
File html contenente la navbar visibile una volta effettuato il login
  - oldNavbar.html
File html contenente la navbar visibile all’utente non loggato
  - profilo.php
Pagina contenente le informazioni del profilo utente
  - report.php
Pagina del sito che include un report completo delle task eseguite nell’ultimo anno solare, con relativi grafici
  - signupForm.html:
Pagina di signup del sito





- /script
cartella per gestire i codici javascript eseguiti sul sito. Per ogni singola funzione è presente un breve commento nel codice.
  - defaultScript.js:
Codice javascript per funzionamenti di default comuni all’interno del sito.

  - /script/amici:
    - amiciScript.js: 
Codice javascript per la gestione delle interazioni con gli amici registrati sul sito.
   - /script/classifica
     - classifica.js: 
Codice javascript per il download della classifica globale e classifica degli amici registrati sul sito.
    - /script/homeScript
      - clockScript.js:
Codice javascript per il funzionamento dell’orologio e la gestione di tutte le interazioni dell’utente con l’orologio.

      - serverTaskScript.js:
Codice javascript per la gestione delle task scaricate dal server.

      - TaskScript.js
Codice javascript per la gestione delle task in index.php.
    - /script/loginScript
      - loginScript.js:
Codice javascript per il login dell’utente sul sito.
      - signScript.js
			Codice javascript per la registrazione dell’utente sul sito.
    - /script/profileScript
      - profileScript.js
Codice javascript per la gestione dei dati del profilo.
    - /script/reportScript
      - reportScript.js
Codice javascript per tenere traccia delle task effettuate durante l’anno solare.

- /server 
	cartella per gestire gli script php eseguiti dal server
    - Script lato server per report, eseguono delle query in risposta alle richieste fatte lato client invocate dalle funzioni nel file /script/report/reportScript.js:
      - allLoad.php → scarica tutte la task dell’anno solare. Attivata da interazione lato client con bottone “All”
      - avgday.php → computa il tempo medio di studio (dall’inizio dell’anno solare fino ad oggi) in ognuna delle 24h ore della giornata
      - avgWeekTime.php→ computa il tempo medio di studio (dall’inizio dell’anno solare fino ad oggi) in ognuno dei 7 giorni della settimana. 
      - dailyLoad.php → scarica tutte la task del giorno corrente. Attivata da interazione lato client con bottone “Day”
      - dailyLoadIncrease.php→ scarica tutte la task del giorno selezionato(parametro letto dalla POST). Attivata da interazione lato client dai botttoni “+” o “-” .
      - getDailyTime.php → scarica nel formato <oraGiornata,minutiSessione> le task del giorno corrente. Usato poi da reportScript.js per costruire il grafico
      - getMonthTime.php → scarica nel formato <mese,minutiSessione> le task dell’anno corrente. Usato poi da reportScript.js per costruire il grafico
      - getWeekTime.php → scarica nel formato <giorno,minutiSessione> le task della settimana corrente. Usato poi da reportScript.js per costruire il grafico
      - increaseDayTime.php → scarica nel formato <oraGiornata,minutiSessione> le task del giorno selezionato lato client attraverso i bottoni “+” o “-”. Usato poi da reportScript.js per costruire il grafico
      - increaseMonth.php → scarica tutte la task del mese selezionato(parametro letto dalla POST). Attivata da interazione lato client dai botttoni “+” o “-” .
      - increaseWeek.php → scarica tutte la task della settimana selezionato(parametro letto dalla POST). Attivata da interazione lato client dai botttoni “+” o “-” .
      - increaseWeekTime.php → scarica nel formato <giorno,minutiSessione> le task della settimana selezionata lato client attraverso i bottoni “+” o “-”. Usato poi da reportScript.js per costruire il grafico
      - monthlyLoad.php→ scarica tutte la task del mese. Attivata da interazione lato client con botttone “Month”
      - weeklyLoad.php→ scarica tutte la task della settimana(Lun-Dom). Attivata da interazione lato client con botttone “Week”
      - deleteTask.php → per eliminare definitivamente dal server una task completata
  - Script lato server per pagina /model/Classifica.php e /model/AnonClassifica.php
      - getAmiciClass.php → scarica la classifica degli amici
      - getGlobalClass.php → scarica la classifica globale di amici 
      - Script lato server per pagina /model/profilo.php
      - updateProfilo.php → per gestire gli aggiornamenti sul server di nome utente, psw o per eliminare l’account  
      - uploadImg.php → per caricare sul server una foto profilo per il proprio account
      - resetImage.php → per eliminare la foto profilo


  - Script lato server per la pagina /model/amici.php:
    - updateAmici.php:
Per gestire tutti gli aggiornamenti degli amici, (crea richiesta, accetta ,ecc..)

  - Script lato server per la pagina /model/index.php:
    - updateTaskServer.php:
Gestisce aggiornamenti delle task nel server (es aggiungere o eliminare una task)
  - Script lato server per le richieste lato client di /script/defaultScript.js:
    - getProfile.php:
 scarica foto profilo e numero ore di studio di un account. Informazioni usate per i popup del profilo presenti sia nella pagina amici che in classifica

  - db_conn.php: include i parametri di configurazione della connessione al server
  - logIn.php : gestisce il login
  - logOut.php : gestisce il logout
  - signUp.php : gestisce la registrazione


- /style:
Contenente la pagine di css preposte alla gestione della grafica. A sua volta la cartella contiene:
  - /style/amiciStyle
    - amiciStyle.css:
File CSS relativo alla pagina amici.php.
    - amicStyleResponsive.css
File CSS relativo alla pagina amici.php contenente le media query che lo rendono adattivo..

  - /style/classificaStyle
    - anonClassificaSyle.css:
File CSS relativo alla pagina AnonClassifica.php.
    - classificaResponsiveStyle.css:
File CSS relativo alle pagine di classifica contenente le media query che lo rendono adattivo.
    - classificaStyle.css:
File CSS relativo alla pagina classifica.php.

  - /style/homeStyle
    - clockStyle.css:
File CSS relativo all’aspetto dell’orologio nella pagina index.php
    - defaultStyle.css
File CSS contenente stili comuni all’interno del sito.
    - homeStyle.css:
File CSS relativo agli elementi della pagina index.php visualizzati al caricamento della pagina
    - inputStyle.css:
File CSS relativo al box di input delle task contenuto nella pagina index.php
    - responsiveHomeStyle.css:
File CSS relativo alla pagina index.php contenente le media query che la rendono adattiva
    - tasksStyle.css:
File CSS relativo alla visualizzazione delle task sul sito.
  - /style/img
Cartella che contiene le immagini utilizzate sul sito.
  - /style/loginStyle
    - loginStyle.css:
File CSS relativo alla pagina loginForm.html
    - responsiveLoginStyle.css:
File CSS relativo alla pagina loginForm.html contenente le media query che la rendono adattiva
    - responsiveSignupStyle.css:
File CSS relativo alla pagina signupForm.html contenente le media query che la rendono adattiva
    - signupStyle.css:
File CSS relativo alla pagina signupForm.html
  - /style/profileStyle
    - profile.css:
File CSS relativo alla pagina profilo.php
    - responsiveProfileStyle.css:
File CSS relativo alla pagina profilo.php contenente le media query che la rendono adattiva

  - /style/reportStyle
    - reportStyle.css:
File CSS relativo alla pagina report.php
    - reportStyleResponsive.css:
File CSS relativo alla pagina report.php contenente le media query che la rendono adattiva

- /sound:
Contiene ding.mp3, suono riprodotto al termine di un timer.
- /storedImg:
cartella che sfrutta il server per memorizzare le foto profilo degli utenti registrati
- scriptDb.sql:
script per creazione tabelle e riempire il db
-------------------------------------------

**Tabelle DB (chiavi primarie corsivo):**
- Utente(*username*,paswd)
- Task(*username*,*keyhash*,title,pomodori,note,donepomodori,ind,tim)
- endedtask(*username*,*keyhash*,title,pomodori,note,dat,tim,ora)
- imgutente(*utente*,percorso)
- richieste(*richiedente*,*accettante*)
- amici(*utentea*,*utenteb*)

----------------------------------------

**LIBRERIE SFRUTTATE:**
- bootstrap → per la navbar
- HackTimer → per ovviare al problema dei browser per cui cambiando window il funzionamento dell’orologio venisse fermato
- prefixfree  e modernizr → per animazione barra per invio richieste amicizia in /model/amici.php
- FlipClock → per l’orologio della pagina /model/index.html
- Chart.js → per i grafici della pagina /model/report.php
