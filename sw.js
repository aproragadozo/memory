console.log('Started', self);

/*
install: rendeld be a 100 fotó-url-t, ahogy eddig az app.js
activate: clean up existing cache
fetch: ha van elég a cache-ben, onnan szolgáld ki a játékot, és kérj be 100 - cacheméret mennyiségű új fotóurl-t
    ellenőrizd, hogy szerepel-e bármelyik új kép a cache-ben, és ha igen, azok helyett is kérj újat
*/