[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/h5FXkH4A)
# Boba webshop using React & Typescript by Mimmi, Caisa, Felicia och Leon

## Installation

- `npm install` - Installerar alla NodeJS moduler & dependencies (körs en gång).

## Beskrivning

**Läs noga igenom hela uppgiftsbeskrivningen innan ni börjar.**

I den här laborationen ska ni i grupp om tre skapa en webbshop med hjälp av React och Typescript. Det ni ska skapa är fyra stycken sidor: en startsida, en produktsida, en kassasida och en bekräftelsesida.

### Startsidan & Produktsidan

Er sida ska presentera ett antal olika produkter på startsidan. Vilka typer av produkter som säljs är valfritt men det ska vara seriöst och välgjort. Det ska vara möjligt att klicka på en produkt för gå till produktsidan där användaren kan läsa mer om den valda produkten. Från både startsidan och produktsidan ska det vara möjligt att lägga till produkter i en kundvagn och det ska tydlig framgå för användaren när produkten läggs till i kundvagnen.

### Kassasidan

#### Kundvagn

Ska lista tillagda produkter (bild & titel) dess antal, pris och kundvagnens totalpris. Det ska vara möjligt att uppdatera kundvagnen - dvs ändra antalet av en produkt eller ta bort en produkt helt från kundvagnen. Totalpriset ska alltid uppdateras och vara korrekt.

#### Leveransuppgifter

Ska vara ett formulär där användaren fyller i namn, mail, telefonnummer och adress. Fälten i formuläret ska gå att automatisk fyllas i. Samtliga fält ska valideras så att endast rätt information kan matas in.

#### Bekräftelsesidan

När alla delar har fyllts i på kassasidan så ska användaren kunna slutföra köpet och då få en bekräftelse på köpet tillsammans med ett unikt ordernummer.

Tänk på att det inte ska gå att placera ordern två gånger, även om man navigerar tillbaka på sidan! All orderinformation som användaren har matat in skall presenteras i beskräftelsen som ett bevis på att ni har hanterat datan i alla formulären korrekt.

### Adminsidan (VG)

Designen på denna sida är valfri men skall utgå ifrån designsystemet ni använder er av. Det skall finnas en knapp på startsidan som tar användaren till adminsidan. På adminsidan skall ni lista alla produkter samt ge användaren möjlighet att ta bort, lägga till eller ändra samtliga produkter (CRUD). Om ni väljer att ha en separat sida, modal eller accordion för ändring/tilläggning av en produkt är valfritt men flödet ska vara routat. Samtliga produkter skall vara sparade i localstorage, detta betyder att om localstorage är tomt vid inladdning av sidan behöver samtliga fördefinierade produkter sparas till localstorage. URL används för bilder så det enkelt kan sparas i localstorage.

## Inlämning

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln. Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## Presentation

Ni ska vid presentationstillfället hålla i en muntlig presentation för klassen. Ni ska gå igenom följande punker under presentationen:

- Presentation och genomgång av er webbshop.
- Utvalda delar av er kod, struktur och dess flöde.
- Reflektioner om projektets genomförande.
- Designsystemet ni valde, hur det används, samt egna reflektioner (VG).

 ## Kravspecifikation på projektet:

 [] Alla sidor skall vara responsiva. (G) 
 [] Arbetet ska implementeras med en React frontend och en Express backend. 
 [] Express backenden ska ha validering på samtliga endpoints. (G) 
 [] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G) 
 [] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
 [] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
 [] Man ska kunna logga in som administratör i systemet (G)
 [] Inga Lösenord får sparas i klartext i databasen (G)
 [] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
 [] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
 [] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
 [] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera [] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
 [] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
 
 
