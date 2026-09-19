# Resultatvisning – version 9

Tydliga placeringar utan # och utan båtmärken i ställning, resultatmatris, resultatredigering och resultatutskrift. Publikmatrisen visar båtuppgifter för kommande heat och endast placering eller resultatkod när resultat finns. Båtstatistik och lagrade tilldelningar behålls.

Verifierat i webbläsare: textinnehåll, beräknad storlek på platssiffror, DNF-kod, resultatutskrift och färgade båtmärken för kommande heat. Inga JavaScript-fel.

# Förenklad startvy – version 8

Stor responsiv klocka ersätter flaggpanelerna och sidokolumnen. Skärpt startregel är borttagen. Startknappar och ljudreglage sitter direkt under klockan. Målregistrering behålls, medan tjuvstart och video ligger i hopfällbara avsnitt.

Verifierat i webbläsare: inga flaggförklaringar i startpanelen, inget horisontellt överflöde på mobil, stor klocktext, båda startförloppen med korrekt ljudsekvens samt målregistrering. Mobilvyn har också granskats visuellt.

# Startförfarande – version 7

Startpanelen har två val, tre minuter och tjugo sekunder. Tal före minutmarkeringarna: tre, två, ett. Korta signaler vid 3:00 (när knappen trycks), 2:00 och 1:00. Sista tio sekunderna: tio till ett, därefter Start. Vald startregel behålls när starten inleds.

Automatiskt webbläsartest med styrd klocka verifierade hela treminutersförloppet och tjugosekundersförloppet, ordens ordning och tidpunkter, tre korta minutljud, tyst läge samt måltid två sekunder efter start. Inga JavaScript-fel upptäcktes. Ljudanropen fångades i testet; fysisk högtalaråtergivning har inte testats.

Den interna tidsbasen är oförändrad för kompatibilitet med sparad livedata. Schemaläggning, utskrifter och segelnummerfunktioner från tidigare versioner finns kvar.

# Bredare utskrift och färgade nummer – version 6

Utskriftens besättningsschema har högst fyra heatkolumner per avsnitt, eller tre för beteckningar längre än 24 tecken. Större omgångar kan delas mellan avsnitt; varje kolumn visar omgång och globalt heatnummer. Båtöversikten delas på motsvarande sätt i grupper av båtar. Långa beteckningar radbryts inom cellerna.

Nummerläget behåller nu båtens valda bakgrunds- och textfärg överallt. Nummer, färg-ID, tilldelningar och resultat behålls. Appens besättningskolumner har breddats från 180 till 220 bildpunkter.

Testat med 45 heat och ett segelnummer på 34 tecken: inga märken passerar cellgränsen i app, mobil eller utskriftsläge. Färgbakgrund i nummerläge, Tillbaka och pågående segelbyte har verifierats. Utskriftslayouten har granskats visuellt. Fysisk utskrift har inte testats.

# Segelbyte under regattan – version 5

**Start & Mål → Byt segelnummer** ändrar båtens visade nummer med bibehållet internt båt-ID. Samma besättning, heat, måltider och resultatkoder behålls. Det gäller även båtar som redan registrerats i mål i ett pågående heat. Nytt nummer används också i historiska resultat och utskrifter.

Webbläsartester verifierar ändring under nedräkning och heat, validering, fortsatt klocka och målregistrering vid flikbyte, bevarade tidigare resultat samt återöppning. Även export/import, publiksida, båda utskriftslägena och Tillbaka har kontrollerats. Serversynk mot produktion och fysisk utskrift har inte testats.

Schemalogiken från version 4 är oförändrad. Nedan är beskrivning och verifiering från den versionen.

# Motståndare först, därefter färre byten utan vila

Version 4 korrigerar optimeringsmålet. Tidigare räknades även byten efter vila. Nu räknas endast byte av båt när samma besättning seglar två direkt på varandra följande heat.

Grundschemats motståndarmöten prioriteras och bevaras exakt. Optimeringen ändrar inte heatordning, vilka som möts, vila, antal starter eller antal seglingar per besättning i varje båt. Den söker en förbättrad båttilldelning och ökar inte antalet direktbyten. Det är ingen garanti för ett globalt minimum.

## Befintliga regattor

Knappen **Optimera båtar utan omlottning** använder det schema som redan finns. Resultatförda heat och alla tidigare heat är låsta, liksom finalheat. Ändring är spärrad under pågående start/heat.

Markeringen **Sitt kvar** betyder att besättningen har samma båt som i direkt föregående heat. Den visas både i appens heat–båt-tabell och i utskriften.

## Verifiering

Båda schemavarianterna har kontrollerats för 102 kombinationer med 2–18 besättningar och 3–8 båtar. Dessutom har de fyra fullständiga uppladdade mallarna, korta scheman och upp till 48 omgångar kontrollerats.

I de fyra ursprungliga fullständiga mallarna var direktbytena redan få: 10/4-mallen hade ett, som blev noll. Mallarna 11/6, 12/6 och 16/6 hade redan noll. Detta gäller originalmallarna, inte nödvändigtvis scheman som den tidigare optimeringen har ändrat.

I ett beräknat test med 11 besättningar, 6 båtar och 16 omgångar minskade direktbytena från 34 till 4. Utfallet beror på grundschemat. Ett särskilt regressionstest kontrollerar att en besättning kan behålla båten mellan två direkt följande heat och byta efter vila, utan ändrade motståndare, båtanvändningsantal eller låsta heat.

Webbläsartester omfattar den nya knappen, uppdaterade kontrollvärden, befintliga resultat, färg/nummer, utskrift, Tillbaka samt läsbarhet på dator och mobil. Inga ändringar har gjorts i lagringsnycklar eller serversynk.

## Källor för grundschemat

De fyra uppladdade arbetsböckernas fasta tilldelningar i **Flight and boat assignment** används för motsvarande kombinationer, upp till 15 omgångar. Tomma reservrader blir inte heat. Andra kombinationer får ett beräknat rotationsschema.

[SSF:s tävlingsreglemente och schemamallar](https://www.svensksegling.se/tavling/arrangor-och-funktionar/tavlingsreglemente-och-mallar/) beskriver motsvarande grundupplägg. Optimeringen i appen är appens egen, inte en särskild SSF-mall. Mallarnas ojämnheter i båtanvändning och mötesantal visas i schemakontrollen och förändras inte av båtbytesoptimeringen.
