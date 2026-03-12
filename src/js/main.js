/* Vite läser main.js och när den ser import '/src/scss/main.scss' förstår den att den ska ta SASS-koden, konvertera den till vanlig CSS och injicera den på sidan automatiskt. /*
/* Enkelt förklarat – @use är SASS som pratar med SASS, och import är JavaScript som berättar för Vite vad som ska inkluderas på sidan. */

import '/src/scss/main.scss'