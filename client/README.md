[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/h5FXkH4A)

# Boba webshop using React & Typescript, MongoDb by Mimmi, Linus, Hanna och Linus

## Installation / Set up

Denna kodbas är indelad i [client](./client/) och [server](./server/).

Växla mellan mapparna. Använda exempelvis kommandot: `cd server` för att stega in i server.

Använd dessa script för att starta:

- `npm install` - Installerar alla NodeJS moduler & dependencies (körs en gång).
- `npm run dev` - Startar miljön för utvecklingen.

## Beskrivning

Ni skall bygga en webbshops-applikation inkluderande en klient och en server. Servern ska vara kopplad till en mongodb databas och vara strukturerad baserad på ett REST-API med resurser. Till er hjälp har ni en uppgiftsbeskrivning samt en kravspecifikation.

## Inlämning

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln. Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## Inloggningar

ADMIN: email: admin@bobabliss.se pw: Adm1nbob@ <br>
USER: email: user@bobabliss.se pw: Us3rbob@

## Kravspecifikation på projektet:

[x] Alla sidor skall vara responsiva. (G)

- Vi uppfyllde kravet genom att låta de delar av applikationen som redan var responsiva vara, samt iterera över de komponenter vi skapade tills de uppfyllde kravspecen.

[x] Arbetet ska implementeras med en React frontend och en Express backend.

- Vi initialiserade projektet med React, och använde oss av en express app.

[x] Express backenden ska ha validering på samtliga endpoints. (G)

- Validering kan betyda många olika saker. Vi uppnådde kravet genom att lägga upp validering av lösenord och epost, samt middlewares där det behövdes för autentisering eller kontroll av information skickad till endpoints.

[x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
[x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
[x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)

- Vi uppnådde det genom att skapa controllers och routers, som i sin tur skriver till MongoDB-databasen vid behov. Vid skapande av users,
  produkter, eller ordrar samt vid uppdatering skriver vi till databasen. Vi hämtar också information direkt från databasen, så att vi inte arbetar med client-side variabler.

[x] Man ska kunna logga in som administratör i systemet (G)

- All inloggning sker via inloggningskomponenten. Både users och Admins kan logga in via interfacen där. Det är databasen och komponenterna samt en middleware som håller koll på om du är Admin
  och därmed autentiserar dig och/eller visar dig de relevanta delarna en administratör ska ha tillgång till på sidan.

[x] Inga Lösenord får sparas i klartext i databasen (G)

- Vi ville klara detta mål genom att hasha lösenordet direkt när det skrivs in i Client. Men Argon2 kraschar hela projektet om det ligger i Client. Så vi hashar lösenordet så fort det skickas till servern, och sparar den hashade versionen på databasen. Vi kontrollerar lösenordet genom en Verify.

[x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)

- I clientside körs ett anrop till servern när klienten klickar submit. Denna skickar med endast deliveryAdress, samt produkterna i cartens Id och kvantitet. Därefter skickas denna information till databasen, där createOrder() controller function lägger till all annan information om ordern, som userid, datum, resten av produktinformationen samt sätter issent till false. Detta skiickas sedan tillbakla som respåons, för att använda informationen i confirmationpage som använder orderid som url.

[x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)

- I edit product formuläret kan Admin användare ändra inStock siffran ppå varje enskild produkt, och det uppdateras när produkten ändras.

[x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)

- Detta löstes genom att hämta data från databasen med ett fetchanrop och sen mappade ut alla orders.  
  .
  [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)

- Kategorierna “Milk”, “Fruit”, “Vegan” och “Premium” finns inlagda på databasen. Vid skapande av ny produkt vid AddProductForm kan man via checkboxes välja att fylla i en eller flera kategorier. Produktens kategorier sparas i en [ ]. Varje kategori har ett id och ett namn.

[x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)

- Hemsidans produkter är uppdelade i fyra olika kategorier, som mappas ut från databasen. Under varje kategori visas de produkter som innehar den valda kategorin. Under “All Teas” visas alla produkter i databasen, oavsett kategori.
  I takt med att man klickar på olika kategorier anropas den önskade kategorin från databasen: `/api/products/category/${selectedCategory}`

[x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)

- Repot hade redan denna logiken i början av projektet.
