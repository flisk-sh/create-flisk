# North star: first-load JavaScript

Claim: the landing page ships at least 1.5x less JavaScript on first load than before (118.95 kB gzip -> 79.3 kB or less).

How it is measured: `node bench/north-star.mjs` builds with Vite and gzips the entry script plus modulepreloads that `dist/index.html` loads. gsap and ScrollTrigger load after first paint (dynamic import) and are not counted, because the page is readable without them; the animations start when they arrive.

Gate: GEL `north-star` guard in block mode fails the PR when `result.json` misses the target, is older than 90 days, or is missing. Refresh with `gel north-star --measure`.
