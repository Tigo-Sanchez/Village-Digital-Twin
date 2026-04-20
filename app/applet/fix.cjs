const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/backdrop-blur bg-transparent border border-white\/\[0\.02\]/g, 'backdrop-blur-sm bg-black/20 border border-white/10');
// Also fix timeline logic
content = content.replace(/isIdle && !isAtEnd \? 'opacity-70' : 'opacity-0'/g, '!isIdle && !isAtEnd ? "opacity-70" : "opacity-0"');
content = content.replace(/fixed right-3 md:right-8 top-1\/2 -translate-y-1\/2 z-50 flex flex-col items-end gap-2 md:gap-3 pointer-events-none mix-blend-difference transition-opacity duration-700 \$\{isAtEnd \? 'opacity-0' : 'opacity-100'\}/g, 'fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-[70] flex flex-col items-end gap-2 md:gap-3 pointer-events-none mix-blend-difference transition-opacity duration-700 ${!isIdle && !isAtEnd ? "opacity-100" : "opacity-0"}');

fs.writeFileSync('src/App.tsx', content);
