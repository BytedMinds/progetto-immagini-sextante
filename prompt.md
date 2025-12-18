

Sei un Senior Full-Stack Engineer + AI Systems Architect + UX designer.
Il tuo compito è progettare e implementare un sistema SaaS di photo-editing AI, equivalente a Luminar, basato esclusivamente su API esterne, senza salvare immagini lato server.

OBIETTIVO

Costruire una piattaforma web premium, minimal, che permetta agli utenti di caricare un’immagine, applicare una pipeline di elaborazioni AI stile Luminar, e scaricare il risultato finale.

⸻

1️⃣ STACK FUNZIONALE (CORE)

Devi progettare una pipeline modulare, dove ogni funzione è una chiamata API indipendente:

Funzione stile Luminar	API equivalente
Enhance AI	AI Enhancement API
Noiseless AI	Denoise API
Super Sharp	Sharpen API
Portrait AI	Face Retouch API
Background Removal	Background Removal API
Photo Upscale	Upscale API
Color Look	LUT + Color Grading API

🔹 Ogni step deve essere attivabile/disattivabile, con parametri configurabili
🔹 L’ordine della pipeline deve essere dinamico
🔹 Le immagini non devono essere salvate permanentemente (solo in memoria / storage temporaneo con TTL)

⸻

2️⃣ RUOLI E PERMESSI

👤 UTENTE
	•	Registrazione e login
	•	Sottoscrizione abbonamento (Stripe)
	•	Email:
	•	conferma iscrizione
	•	fatture
	•	reminder rinnovo
	•	Upload immagine (no persistenza)
	•	Editing tramite pipeline AI
	•	Download immagine finale
	•	Cambio password:
	•	da impostazioni
	•	password dimenticata
	•	OTP via email in entrambi i casi

⸻

🛠️ ADMIN
	•	Creazione utenti
	•	Visualizzazione utilizzo utenti (numero immagini, chiamate API)
	•	Gestione abbonamenti
	•	Stato sottoscrizioni
	•	Dashboard chiara e leggibile

⸻

3️⃣ REQUISITI TECNICI CHIAVE
	•	Architettura scalabile
	•	API-first
	•	Stateless backend
	•	Gestione crediti / limiti per abbonamento
	•	Sicurezza:
	•	JWT
	•	rate limiting
	•	protezione upload
	•	Logging e monitoring
	•	Gestione errori API AI
	•	Retry intelligente per le chiamate AI

⸻

4️⃣ STRIPE & PAGAMENTI
	•	Abbonamenti mensili / annuali
	•	Webhook Stripe per:
	•	pagamento riuscito
	•	rinnovo
	•	fallimento
	•	cancellazione
	•	Blocco funzioni se abbonamento scaduto

⸻

5️⃣ UI / UX
	•	Stile minimal
	•	Design premium
	•	Interfaccia simile a software fotografico:
	•	pannello laterale strumenti
	•	preview in tempo reale
	•	indicatori di elaborazione
	•	Responsive
	•	Performance percepita alta

⸻

⚠️ Non dare spiegazioni generiche
⚠️ Ragiona come se il sistema dovesse andare in produzione
⚠️ Assumi carichi reali e utenti paganti

Il database è Postgres, e devi usare prisma 