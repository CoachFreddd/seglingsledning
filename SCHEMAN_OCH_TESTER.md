# Scheman och testresultat

De fyra uppladdade arbetsböckernas blad **Flight and boat assignment** används som källa till mallarnas faktiska besättnings- och båttilldelning. Dessa celler innehåller fasta värden. Hjälpblad med trasiga Excelreferenser används inte. Originalfilerna har inte ändrats.

Alla fyra mallar innehåller 15 omgångar. Varje besättning seglar en gång per omgång. Mallarna för 11 och 12 besättningar har två heat per omgång; helt tomma reservrader har utelämnats. Mallarna för 10 och 16 besättningar har tre heat per omgång.

## Två varianter

**Klassisk rotation** följer uppladdad mall för de fyra kombinationerna och högst 15 omgångar. Besättningarna lottas till mallens platser. För andra kombinationer eller längre scheman beräknas ett schema med jämna heatstorlekar, varierade motståndare och hänsyn till båtanvändning och vila.

**Färre båtbyten** ändrar bara båttilldelningen. Den bevarar vilka som möts, heatordning, vila och exakt antal seglingar per besättning i varje båt. Metoden söker förbättringar genom sammanhängande byten som behåller dessa villkor. Den gör aldrig fler båtbyten än sitt grundschema, men garanterar inte ett globalt minimum.

Ett byte betyder annan båt mellan en besättnings två starter, även med vila emellan. Det är inte antalet ombordstigningar eller transporter från land.

## Resultat med dina fullständiga mallar

| Besättningar | Båtar | Omgångar | Heat | Byten i mallen | Efter optimering |
|---:|---:|---:|---:|---:|---:|
| 10 | 4 | 15 | 45 | 97 | 65 |
| 11 | 6 | 15 | 30 | 101 | 88 |
| 12 | 6 | 15 | 30 | 109 | 90 |
| 16 | 6 | 15 | 45 | 164 | 135 |

Samma motståndare, samma vila och exakt samma antal seglingar i varje båt verifierades före och efter optimeringen. Alla besättningspar möts minst en gång i dessa fullständiga mallar.

**Mallarnas båtfördelning är inte helt jämn.** Den största skillnaden mellan en besättnings mest och minst använda båt är fyra seglingar i samtliga fyra fullständiga mallar. Appen visar därför fördelningarna öppet i schemakontrollen. Den presenterar inte mallarna som perfekt balanserade eller optimeringen som SSF-certifierad.

En ny lottning kan ändra vilka besättningar som får respektive plats. Appens kontroll redovisar det aktuella schemat. Vid delvis låst schema bedöms kombinationen av bevarade och nygenererade omgångar, inte bara de nya omgångarna.

## Kontroller

- 102 kombinationer med 2–18 besättningar och 3–8 båtar, sex omgångar, i båda lägena.
- Alla fyra mallar jämförda exakt med tilldelningarna i arbetsböckerna.
- Korta scheman och längre scheman, inklusive 18 besättningar, 8 båtar och 48 omgångar.
- En start per besättning och omgång; ingen dubbelbokad båt eller besättning i ett heat; inga tomma heat.
- Optimeringen behåller motståndare, ordning och båtanvändningsantal och ökar inte båtbyten.
- Webbläsartester av inställningar, schemakontroll, utskrift, Tillbaka, sparade resultat, export/import, start och målregistrering.
- Visuell granskning av mobilvy och utskriftslayout.

## SSF-material

SSF publicerar förslag till kappseglingsscheman för sprinttävling, med deltagarnamn i Teams och schema i Sailing Charts. Det stämmer med upplägget i de uppladdade exemplen. Se [Tävlingsreglemente och mallar](https://www.svensksegling.se/tavling/arrangor-och-funktionar/tavlingsreglemente-och-mallar/).

[SSF:s checklista för sprintkappsegling med tillhandahållna båtar](https://www.svensksegling.se/om-oss/dokumentbanken/149-checklista-for-sprintkappsegling-med-tillhandahallna-batar2022.pdf/) beskriver att schemat ska anpassas till deltagarantalet och finnas tillgängligt för deltagarna. Appens två tabellvyer och utskrift stödjer det praktiska arbetet.

De fyra uppladdade Excelmallarna styr de inbyggda tilldelningarna. Den nya optimeringen är appens egen och ska inte förväxlas med en särskild SSF-mall.
