# Deploy till Vercel

Ladda upp hela den här mappen till ett GitHub-repository och koppla repot till Vercel.

## Filer som ska med

- `regattaapp_36.html`
- `regatta-manifest.webmanifest`
- `regatta-sw.js`
- `package.json`
- `vercel.json`
- `api/upload.js`
- `api/live.js`
- hela mappen `flags/`

## Vercel-inställningar

1. Skapa/importera projektet i Vercel.
2. Lägg till Vercel Blob i projektet.
   Då skapas normalt `BLOB_READ_WRITE_TOKEN` automatiskt.
3. Lägg till en egen Environment Variable:

```text
REGATTA_UPLOAD_TOKEN=valfritt-langt-hemligt-losen
```

4. Deploya.

## URL:er

Appen:

```text
https://din-vercel-app.vercel.app/regattaapp_36.html
```

Publik resultatsida:

```text
https://din-vercel-app.vercel.app/regattaapp_36.html#resultat
```

## I appens Setup-flik

Serveradress:

```text
/api/upload
```

Token:

```text
samma värde som REGATTA_UPLOAD_TOKEN
```

Om appen körs lokalt på iPaden men ska synka till Vercel, använd hela adressen:

```text
https://din-vercel-app.vercel.app/api/upload
```

## Viktigt

Appen sparar alltid lokalt först. Om internet saknas ligger senaste livefilen i kö och skickas när internet kommer tillbaka.
