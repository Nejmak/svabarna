/* =====================================================
   INSECTA & ONISCIDAE — app.js
   ===================================================== */

/* =====================================================
   1. DATA — iNaturalist S3 URLs (geen CORS blokace)
   ===================================================== */
let animals = [
  {
    id: 1, group: 'svab', featured: true,
    name: 'Šváb argentinský', latin: 'Blaptica dubia', emoji: '🪳',
    size: '3,5–4,5 cm', origin: 'Jižní Amerika', diff: '⭐ Začátečník',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/3765989/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/21800093/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/42310801/large.jpg',
    ],
    short: 'Nejoblíbenější krmný šváb. Živorodý, neleze po skle ani plastu. Ideální pro začínající chovatele.',
    desc: 'Šváb argentinský (Blaptica dubia) pochází z tropických lesů Jižní Ameriky (Kostarika–Argentina). Dorůstá 3,5–4,5 cm. Samci mají plně vyvinutá křídla, samice jen zakrnělé štítky.\n\nKlíčová vlastnost: neleze po hladkém skle ani plastu — nemá vyvinuté arolium. Díky tomu téměř neuniká z otevřených nádob.\n\nJe živorodá — samice rodí 20–40 živých nymf měsíčně při 30 °C. Jako krmivo oblíbena díky vysokému obsahu bílkovin a snadné manipulaci.',
    care: 'Teplota: 28–32 °C\nVlhkost: 40–60 %\nKrmení: zelenina, ovoce, cereálie — bez citrusů\nUbytování: hladká nádoba s větrací síťkou\nSubstrát: vermiculit nebo kokos, 3–5 cm\nReprodukce: 1 samec na 3–5 samic',
  },
  {
    id: 2, group: 'svab', featured: false,
    name: 'Šváb madagaskarský syčivý', latin: 'Gromphadorhina portentosa', emoji: '🟤',
    size: '5–7,5 cm', origin: 'Madagaskar', diff: '⭐ Začátečník',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/1575816/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/5965671/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/8143042/large.jpg',
    ],
    short: 'Impozantní bezkřídlý šváb. Syčí výdechem vzduchu přes spirakule. Jeden z největších švábů světa, žije až 5 let.',
    desc: 'Madagaskarský syčivý šváb je jedním z největších švábů světa (5–7,5 cm). Endemit tropických lesů Madagaskaru.\n\nSyčení vzniká výdechem vzduchu přes břišní spirakule — unikátní způsob komunikace u bezobratlých. Samci mají nápadné rohy.\n\nŽije 2–5 let, oblíbený mazlíček díky mírné povaze. Šplhá po skle — těsné víko nutností.',
    care: 'Teplota: 24–30 °C\nVlhkost: 60–70 %\nKrmení: ovoce, zelenina, listí\nUbytování: terarium s kůrou a substrátem\nReprodukce: živorodý, březost 60–70 dní\nPOZOR: šplhá po skle!',
  },
  {
    id: 3, group: 'svab', featured: false,
    name: 'Šváb turkestánský', latin: 'Shelfordella tartara', emoji: '🟠',
    size: '2–3 cm', origin: 'Střední Asie', diff: '⭐ Začátečník',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/53985/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/60028282/large.jpg',
    ],
    short: 'Rychlý krmný šváb zvaný "red runner". Snáší pokojovou teplotu, neleze po skle. Výborná alternativa k cvrčkům.',
    desc: 'Šváb turkestánský pochází z pouštních oblastí Střední Asie. Rychlý a aktivní — stimuluje lovecké instinkty terárních zvířat.\n\nNeneleze po hladkém skle. Snáší nižší teploty než tropické druhy.',
    care: 'Teplota: 22–30 °C\nVlhkost: 30–50 %\nKrmení: zelenina, ovoce, cereálie\nUbytování: hladká nádoba, 40 cm výška\nReprodukce: ootheka na substrátu, 20–30 nymf',
  },
  {
    id: 4, group: 'rohac', featured: true,
    name: 'Roháč obecný', latin: 'Lucanus cervus', emoji: '🦌',
    size: '3–8,5 cm', origin: 'Evropa', diff: '⭐⭐⭐ Pokročilý',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/4834001/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/17074894/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/26015636/large.jpg',
    ],
    short: 'Největší brouk ČR. Impozantní parohy jsou přeměněná kusadla. Chráněný druh — larva žije 3–7 let v dubech.',
    desc: 'Roháč obecný (Lucanus cervus) je největší brouk České republiky (samci až 8,5 cm). "Parohy" jsou silně zvětšená kusadla pro souboje o samice.\n\nLarvy žijí 3–7 let ve trouchnivém dubu. Dospělci žijí jen 3–7 týdnů.\n\nChráněný zákonem EU (Natura 2000). Ohrožen úbytkem starých dubových lesů.',
    care: '⚠️ CHRÁNĚNÝ DRUH — chov vyžaduje povolení!\nLarvy: trouchnivé dubové dřevo, min. 30 l\nTeplota: 18–22 °C, vlhkost 60–70 %\nDospělci: glukózový gel nebo přezrálé ovoce\nVývoj: 3–7 let larva + 1–2 m. kukla',
  },
  {
    id: 5, group: 'rohac', featured: false,
    name: 'Roháček statný', latin: 'Dorcus parallelipipedus', emoji: '🪲',
    size: '1,8–3,5 cm', origin: 'Evropa, Asie', diff: '⭐⭐ Středně',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/2373633/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/55413316/large.jpg',
    ],
    short: 'Menší příbuzný roháče. Lesklý černý pancíř, méně náročný chov. Nevyžaduje specifické dřevo.',
    desc: 'Roháček statný (Dorcus parallelipipedus) dorůstá 1,8–3,5 cm. Lesklé černé tělo, pohlaví si jsou podobná.\n\nLarvy žijí v dřevě listnatých stromů (buk, jasan, ovocné). Vývoj 1–3 roky. V ČR není zákonem chráněn.',
    care: 'Larvy: dřevo listnatých stromů\nObjem: min. 5 l na larvu\nDospělci: gel nebo přezrálé ovoce\nVlhkost: 60–70 %\nVývoj: 1–3 roky',
  },
  {
    id: 6, group: 'zlatohlavek', featured: false,
    name: 'Zlatohlávek zlatý', latin: 'Cetonia aurata', emoji: '✨',
    size: '1,4–2 cm', origin: 'Evropa, Asie', diff: '⭐⭐ Středně',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/680174/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/16397162/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/28827037/large.jpg',
    ],
    short: 'Metalicky zelený brouk evropských luk. Létá za slunce, živí se pylem. Zbarvení způsobuje mikrostruktura povrchu.',
    desc: 'Zlatohlávek zlatý (Cetonia aurata) je proslulý metalickým leskem přecházejícím ze zelené do zlaté nebo fialové.\n\nHojný na loukách Evropy od května do srpna. Larvy žijí v kompostu nebo trouchnivém dřevě 2–3 roky.',
    care: 'Larvy: kompost nebo trouchnivé dřevo\nTeplota: 18–24 °C, vlhkost 50–65 %\nDospělci: med, přezrálé ovoce, pyl\nVývoj: 2–3 roky',
  },
  {
    id: 7, group: 'zlatohlavek', featured: false,
    name: 'Zlatohlávek skvostný', latin: 'Protaetia aeruginosa', emoji: '💎',
    size: '2–3 cm', origin: 'Evropa', diff: '⭐⭐⭐ Pokročilý',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/15760476/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/38736490/large.jpg',
    ],
    short: 'Vzácný chráněný zlatohlávek s luxusním metalickým leskem. Největší zlatohlávek Evropy.',
    desc: 'Protaetia aeruginosa (2–3 cm) kombinuje zelenou, zlatou a kovově fialovou. Jeden z největších zlatohlávků Evropy.\n\nVázán na staré dutinové stromy. V ČR kriticky ohrožený, součást Natura 2000.',
    care: '⚠️ ZÁKONEM CHRÁNĚN!\nLarvy: dutinový humus, min. 10 l\nTeplota: 18–24 °C, vlhkost 65–75 %\nVývoj: 2–4 roky',
  },
  {
    id: 8, group: 'mnohonozka', featured: true,
    name: 'Mnohonožka africká obří', latin: 'Archispirostreptus gigas', emoji: '🐛',
    size: '25–38 cm', origin: 'Subsaharská Afrika', diff: '⭐ Začátečník',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/1394538/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/3109867/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/10271622/large.jpg',
    ],
    short: 'Největší mnohonožka světa. 300–400 nožiček, žije až 10 let. Mírná a bezpečná — skvělý mazlíček.',
    desc: 'Archispirostreptus gigas dorůstá 25–38 cm — největší mnohonožka světa. Neagresivní, bez jedovatých žláz.\n\n300–400 nožiček v dokonalé vlnové koordinaci. Žije až 10 let. Živí se rozpadajícím se rostlinným materiálem.',
    care: 'Ubytování: min. 60×40 cm, substrát 15–20 cm\nTeplota: 24–28 °C, vlhkost 70–80 %\nKrmení: listí, zelenina, sépiová kost (vápník!)\nManipulace: bezpečná — myjte ruce',
  },
  {
    id: 9, group: 'mnohonozka', featured: false,
    name: 'Mnohonožka rudá', latin: 'Narceus gordanus', emoji: '🔴',
    size: '8–12 cm', origin: 'Severní Amerika', diff: '⭐ Začátečník',
    imgs: [
      'https://inaturalist-open-data.s3.amazonaws.com/photos/7556399/large.jpg',
      'https://inaturalist-open-data.s3.amazonaws.com/photos/30684714/large.jpg',
    ],
    short: 'Elegantní severoamerická mnohonožka s červenými pásy. Nenáročná, klidná, vhodná pro začátečníky.',
    desc: 'Narceus gordanus — tmavě hnědé tělo s červenými pásy, 8–12 cm. Nocturní druh z jihovýchodní Severní Ameriky.\n\nPři ohrožení uvolňuje mírně dráždivý sekret — doporučuje se mytí rukou.',
    care: 'Ubytování: min. 30×20 cm\nTeplota: 18–24 °C\nVlhkost: 60–70 %\nKrmení: listí, zelenina, sépiová kost',
  },
];

let facts = [
  { id:1, emoji:'⚛️', title:'Švábi a radiace', text:'Švábi vydrží dávky záření mnohonásobně vyšší než smrtelná dávka pro člověka — jejich buňky se dělí méně často, takže radiace poškodí méně DNA najednou.', cat:'svab' },
  { id:2, emoji:'🦕', title:'300 milionů let evoluce', text:'Fosilie téměř identické s dnešními šváby jsou staré 300–350 milionů let. Přežili vymření dinosaurů, dopady meteoritů i ledové doby.', cat:'svab' },
  { id:3, emoji:'🫁', title:'Madagaskarský šváb syčí jinak', text:'Madagaskarský syčivý šváb vydává zvuk výdechem vzduchu přes břišní spirakule — způsob komunikace naprosto unikátní pro bezobratlé živočichy.', cat:'svab' },
  { id:4, emoji:'🦌', title:'Parohy roháče', text:'Obrovská kusadla samců roháče slouží k soubojům a předvádění, nikoli k lovu. Samice mají menší, ale funkčnější kusadla — kousnutí je velmi bolestivé.', cat:'rohac' },
  { id:5, emoji:'🌳', title:'7 let pod zemí', text:'Larva roháče obecného může strávit 3–7 let ve tmě trouchnivého dubu, než se zakuklí. Dospělý brouk pak žije jen několik týdnů.', cat:'rohac' },
  { id:6, emoji:'🦵', title:'Stovky nožiček v koordinaci', text:'Mnohonožka africká obří má 300–400 nožiček pohybujících se v dokonalých vlnách — každý pár je zlomek vteřiny opožděn za předchozím.', cat:'mnohonozka' },
  { id:7, emoji:'✨', title:'Zlatohlávek — strukturní zbarvení', text:'Metalický lesk zlatohlávka není pigment — jde o mikrostrukturu povrchu interferující se světlem. Stejný princip jako třpyt mýdlových bublin.', cat:'obecne' },
  { id:8, emoji:'🌍', title:'Brouci tvoří 25 % všech živočichů', text:'Řád brouků (Coleoptera) má přes 400 000 popsaných druhů — přibližně čtvrtinu všech popsaných živočišných druhů na Zemi.', cat:'obecne' },
];

const careData = {
  svabi: [
    { icon:'🌡️', title:'Teplota',      text:'28–32 °C pro reprodukci B. dubia. Turkestánský snese pokojovou teplotu. Minimum pro přežití: 18 °C.' },
    { icon:'💧', title:'Vlhkost',       text:'40–60 %. Vodu podávejte přes vlhkou houbičku nebo zeleninu. Nikdy volnou vodu — nymfy se mohou utopit.' },
    { icon:'🥬', title:'Krmení',        text:'Mrkev, cuketa, špenát, cereálie. Bez citrusů, cibule a slaného. Zbytky odstraňujte po 2–3 dnech.' },
    { icon:'🏠', title:'Ubytování',     text:'Hladká plastová nádoba s větrací síťkou. Min. 40 cm výška. Vlnité kartony jako úkryty.' },
    { icon:'🔄', title:'Reprodukce',    text:'B. dubia je živorodý. Poměr 1:3–5 (samec:samice). Při 30 °C 20–40 nymf měsíčně.' },
    { icon:'🧹', title:'Čistota',       text:'Čistěte každé 2–4 týdny. Frass (trus) je vynikající přírodní hnojivo.' },
  ],
  rohaci: [
    { icon:'🌲', title:'Substrát',      text:'Trouchnivé dřevo správného druhu (dub pro L. cervus, buk pro Dorcus). Vlhký, ale ne mokrý.' },
    { icon:'🌡️', title:'Teplota',       text:'Larvy: 18–22 °C. Dospělci: 20–26 °C. Evropské druhy snáší nižší teploty.' },
    { icon:'📦', title:'Nádoba',        text:'Larvy: min. 5–10 l substrátu na jednu larvu. Dospělci: terarium s větvemi a kůrou.' },
    { icon:'🍑', title:'Krmení',        text:'Broukaří gely, přezrálé ovoce (banán, meruňka). Dospělci žijí jen 3–7 týdnů.' },
    { icon:'⏱️', title:'Cyklus',        text:'Larva 3–7 let → kukla 1–2 měsíce → dospělec 3–7 týdnů. Trpělivost je klíčem.' },
    { icon:'⚖️', title:'Zákon',         text:'Roháč obecný je chráněn zákonem EU (Natura 2000). Chov bez povolení je nelegální!' },
  ],
  mnohonozky: [
    { icon:'🌿', title:'Substrát',      text:'Hluboký 15–20 cm: kokosové vlákno + tlející listí + zemina. Mnohonožky se rádi zahrabávají.' },
    { icon:'💧', title:'Vlhkost',       text:'Tropické: 70–80 %. Pravidelně rosit, nesmí být ani mokro ani sucho.' },
    { icon:'🌡️', title:'Teplota',       text:'Africká obří: 24–28 °C. Severoamerické druhy: 18–24 °C (pokojová teplota).' },
    { icon:'🍂', title:'Krmení',        text:'Tlející listí jako základ. Zelenina + sépiová kost nebo vaječné skořápky (vápník!).' },
    { icon:'🧪', title:'Bezpečnost',    text:'Nejsou jedovaté. Některé produkují dráždivý sekret — myjte ruce po manipulaci.' },
    { icon:'👥', title:'Soužití',       text:'Lze chovat skupinově. Mírumilovné a neagresivní, vhodné pro smíšená terária.' },
  ],
};

let messages     = [];
let animalFilter = 'all';
let animalSearch = '';
let activeCare   = 'svabi';
let editAnimalId = null;
let editFactId   = null;
let modalPhotos  = [];
let modalPhotoIdx = 0;

/* =====================================================
   2. HERO — Canvas švábi (animovaní, realistický styl)
   ===================================================== */

function drawRoach(ctx, lp, size) {
  ctx.save();
  ctx.scale(size, size);

  const legSwing  = Math.sin(lp) * 7;
  const legSwing2 = Math.sin(lp + Math.PI) * 7;

  const legs = [
    { bx: -6, by: -18, ex: -22, ey: -32, sw: legSwing  },
    { bx: -6, by:  -6, ex: -26, ey: -10, sw: legSwing2 },
    { bx: -6, by:   6, ex: -24, ey:  14, sw: legSwing  },
    { bx:  6, by: -18, ex:  22, ey: -32, sw: legSwing2 },
    { bx:  6, by:  -6, ex:  26, ey: -10, sw: legSwing  },
    { bx:  6, by:   6, ex:  24, ey:  14, sw: legSwing2 },
  ];

  ctx.strokeStyle = '#c8820a';
  ctx.lineCap = 'round';
  legs.forEach(function(l) {
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    var midX = (l.bx + l.ex) / 2 + l.sw * 0.4;
    var midY = (l.by + l.ey) / 2 + l.sw * 0.2;
    ctx.moveTo(l.bx, l.by);
    ctx.quadraticCurveTo(midX, midY, l.ex + l.sw * 0.5, l.ey + l.sw * 0.3);
    ctx.stroke();
  });

  // tělo
  ctx.fillStyle = '#c8906a';
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // křídlový překryv
  ctx.fillStyle = '#8b3a1e';
  ctx.beginPath();
  ctx.ellipse(0, 2, 9, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // pronotum
  ctx.fillStyle = '#7a2e10';
  ctx.beginPath();
  ctx.ellipse(0, -20, 11, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // hlava
  ctx.fillStyle = '#5a2008';
  ctx.beginPath();
  ctx.ellipse(0, -30, 7, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // odlesk
  ctx.fillStyle = 'rgba(255,220,180,0.18)';
  ctx.beginPath();
  ctx.ellipse(-2, -4, 5, 12, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // tykadla
  ctx.strokeStyle = '#3d1505';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  var antWave = Math.sin(lp * 0.5) * 4;
  ctx.beginPath();
  ctx.moveTo(-4, -34);
  ctx.quadraticCurveTo(-14 + antWave, -48, -22 + antWave * 1.5, -62);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(4, -34);
  ctx.quadraticCurveTo(14 - antWave, -48, 22 - antWave * 1.5, -62);
  ctx.stroke();

  ctx.restore();
}

function initCrawlers() {
  var heroEl = document.getElementById('home');
  if (!heroEl) return;

  // Vytvoříme canvas přes hero sekci
  var canvas = document.createElement('canvas');
  canvas.id = 'roach-canvas';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;';
  heroEl.style.position = 'relative';
  heroEl.appendChild(canvas);

  var W, H;
  function resize() {
    var r = heroEl.getBoundingClientRect();
    W = canvas.width  = r.width;
    H = canvas.height = r.height;
  }
  resize();
  window.addEventListener('resize', resize);

  var ctx = canvas.getContext('2d');

  // Vytvoříme 18 švábů
  var roaches = [];
  for (var i = 0; i < 18; i++) {
    roaches.push({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 600),
      angle: Math.random() * Math.PI * 2,
      baseSpeed: 0.5 + Math.random() * 0.8,
      speed: 0.5 + Math.random() * 0.8,
      size: 0.65 + Math.random() * 0.5,
      legPhase: Math.random() * Math.PI * 2,
      legSpeed: 0.11 + Math.random() * 0.07,
      scaredTimer: 0,
      wanderTimer: Math.floor(Math.random() * 100),
      targetAngle: Math.random() * Math.PI * 2,
      opacity: 0,
      wobble: 0,
    });
  }

  var mx = -999, my = -999;

  // Sledujeme myš nad hero sekcí
  heroEl.addEventListener('mousemove', function(e) {
    var r = heroEl.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  heroEl.addEventListener('mouseleave', function() { mx = -999; my = -999; });

  function loop() {
    if (!W || !H) { resize(); }
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < roaches.length; i++) {
      var r = roaches[i];
      r.opacity = Math.min(1, r.opacity + 0.03);
      r.legPhase += r.legSpeed * (r.speed / r.baseSpeed);

      var dx = mx - r.x, dy = my - r.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) r.scaredTimer = 55;

      if (r.scaredTimer > 0) {
        r.scaredTimer--;
        var flee = Math.atan2(dy, dx) + Math.PI;
        var diff = flee - r.angle;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        r.angle += diff * 0.22;
        r.speed = Math.min(r.baseSpeed * 5, r.speed + 0.45);
        r.legSpeed = 0.20 + Math.random() * 0.06;
      } else {
        r.speed = Math.max(r.baseSpeed, r.speed * 0.95);
        r.legSpeed = 0.11 + Math.random() * 0.04;
        r.wanderTimer--;
        if (r.wanderTimer <= 0) {
          r.targetAngle = r.angle + (Math.random() - 0.5) * Math.PI * 1.5;
          r.wanderTimer = 60 + Math.floor(Math.random() * 120);
        }
        var d2 = r.targetAngle - r.angle;
        while (d2 >  Math.PI) d2 -= Math.PI * 2;
        while (d2 < -Math.PI) d2 += Math.PI * 2;
        r.angle += d2 * 0.035 + (Math.random() - 0.5) * 0.015;
      }

      r.wobble = Math.sin(r.legPhase * 0.8) * 0.04;
      r.x += Math.cos(r.angle) * r.speed;
      r.y += Math.sin(r.angle) * r.speed;

      var m = 35;
      if (r.x < m)     { r.angle = Math.atan2(Math.sin(r.angle),  Math.abs(Math.cos(r.angle))); r.x = m; }
      if (r.x > W - m) { r.angle = Math.atan2(Math.sin(r.angle), -Math.abs(Math.cos(r.angle))); r.x = W - m; }
      if (r.y < m)     { r.angle = Math.atan2( Math.abs(Math.sin(r.angle)), Math.cos(r.angle)); r.y = m; }
      if (r.y > H - m) { r.angle = Math.atan2(-Math.abs(Math.sin(r.angle)), Math.cos(r.angle)); r.y = H - m; }

      ctx.save();
      ctx.globalAlpha = r.opacity * 0.82;
      ctx.translate(r.x, r.y);
      ctx.rotate(r.angle + Math.PI / 2 + r.wobble);
      drawRoach(ctx, r.legPhase, r.size);
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }
  loop();
}

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

/* =====================================================
   3. ENCYCLOPEDIA
   ===================================================== */
function groupLabel(g) {
  return { svab: '🪳 Švábi', rohac: '🦌 Roháči', zlatohlavek: '✨ Zlatohlávci', mnohonozka: '🐛 Mnohonožky' }[g] || g;
}

function renderAnimals() {
  const grid = document.getElementById('animal-grid');
  let list = [...animals];
  if (animalFilter !== 'all') list = list.filter(a => a.group === animalFilter);
  if (animalSearch) list = list.filter(a =>
    a.name.toLowerCase().includes(animalSearch) ||
    a.latin.toLowerCase().includes(animalSearch) ||
    a.origin.toLowerCase().includes(animalSearch)
  );
  list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const counter = document.getElementById('stat-count');
  if (counter) counter.textContent = animals.length;

  if (!list.length) {
    grid.innerHTML = '<div class="no-results">🔍 Žádný druh neodpovídá hledání.</div>';
    return;
  }

  grid.innerHTML = list.map(a => {
    const mainImg = a.imgs && a.imgs[0];
    const photoCount = a.imgs ? a.imgs.filter(Boolean).length : 0;

    const imgHtml = mainImg
      ? `<img src="${mainImg}" alt="${a.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <div class="card-img-fallback" style="display:none">${a.emoji}</div>`
      : `<div class="card-img-fallback">${a.emoji}</div>`;

    return `
      <div class="animal-card ${a.featured ? 'featured' : ''}" onclick="openModal(${a.id})">
        <div class="card-img-wrap">
          ${imgHtml}
          <div class="badge-group">${groupLabel(a.group)}</div>
          <div class="badge-diff">${a.diff}</div>
          ${photoCount > 1 ? `<div class="badge-photos">📷 ${photoCount} fotek</div>` : ''}
        </div>
        <div class="card-body">
          <div class="card-name">${a.name}</div>
          <div class="card-latin">${a.latin}</div>
          <div class="card-short">${a.short}</div>
          <div class="card-meta">
            <div class="card-meta-item"><strong>${a.size}</strong>délka těla</div>
            <div class="card-meta-item"><strong>${a.origin}</strong>původ</div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterAnimals(group, btn) {
  animalFilter = group;
  document.querySelectorAll('.enc-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAnimals();
}

function searchAnimals(val) {
  animalSearch = val.toLowerCase().trim();
  renderAnimals();
}

/* =====================================================
   4. ANIMAL MODAL — photo gallery + tabs
   ===================================================== */
function openModal(id) {
  const a = animals.find(x => x.id === id);
  if (!a) return;

  modalPhotos   = (a.imgs || []).filter(Boolean);
  modalPhotoIdx = 0;

  const slideHtml = modalPhotos.length
    ? modalPhotos.map((url, i) =>
        `<div class="gallery-slide">
           <img src="${url}" alt="${a.name} foto ${i+1}"
             onerror="this.parentElement.innerHTML='<div class=\\'gallery-slide-fb\\'>${a.emoji}</div>'">
         </div>`
      ).join('')
    : `<div class="gallery-slide"><div class="gallery-slide-fb">${a.emoji}</div></div>`;

  const navHtml = modalPhotos.length > 1
    ? `<button class="gallery-nav prev" onclick="shiftPhoto(-1)">‹</button>
       <button class="gallery-nav next" onclick="shiftPhoto(1)">›</button>`
    : '';

  const dotsHtml = modalPhotos.length > 1
    ? `<div class="gallery-dots">
         ${modalPhotos.map((_, i) =>
           `<button class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="goToPhoto(${i})"></button>`
         ).join('')}
       </div>`
    : '';

  const thumbsHtml = modalPhotos.length > 1
    ? `<div class="gallery-thumbs">
         ${modalPhotos.map((url, i) =>
           `<img class="gallery-thumb ${i === 0 ? 'active' : ''}"
              src="${url}" onclick="goToPhoto(${i})"
              onerror="this.style.display='none'">`
         ).join('')}
       </div>`
    : '';

  const careLines = (a.care || '').split('\n').filter(Boolean);
  const careGridHtml = careLines.map(line => {
    const colonIdx = line.indexOf(':');
    const label = colonIdx > -1 ? line.slice(0, colonIdx).trim() : line;
    const value = colonIdx > -1 ? line.slice(colonIdx + 1).trim() : '';
    return `<div class="care-item">
      <div class="care-item-label">${label}</div>
      <div class="care-item-value">${value || label}</div>
    </div>`;
  }).join('');

  const descHtml = (a.desc || '').split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-gallery">
      <div class="gallery-track" id="gallery-track">${slideHtml}</div>
      ${navHtml}
      ${dotsHtml}
    </div>
    ${thumbsHtml}
    <div class="modal-body">
      <div class="modal-group">${groupLabel(a.group)}</div>
      <div class="modal-name">${a.name}</div>
      <div class="modal-latin">${a.latin}</div>
      <div class="modal-stats">
        <div class="modal-stat"><label>Délka těla</label><strong>${a.size}</strong></div>
        <div class="modal-stat"><label>Původ</label><strong>${a.origin}</strong></div>
        <div class="modal-stat"><label>Náročnost</label><strong>${a.diff}</strong></div>
        <div class="modal-stat"><label>Fotek</label><strong>${modalPhotos.length} ks</strong></div>
      </div>
      <div class="modal-tabs">
        <button class="modal-tab active" onclick="switchModalTab('popis',this)">📖 Popis</button>
        <button class="modal-tab"        onclick="switchModalTab('pece',this)">🌿 Péče</button>
      </div>
      <div class="modal-tab-content active" id="mt-popis">
        <div class="modal-desc">${descHtml}</div>
      </div>
      <div class="modal-tab-content" id="mt-pece">
        <div class="care-grid-modal">
          ${careGridHtml || '<p style="color:#888">Informace o péči nejsou k dispozici.</p>'}
        </div>
      </div>
    </div>`;

  document.getElementById('animal-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function switchModalTab(tab, btn) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('mt-' + tab).classList.add('active');
}

function shiftPhoto(dir) {
  modalPhotoIdx = (modalPhotoIdx + dir + modalPhotos.length) % modalPhotos.length;
  updatePhotoUI();
}

function goToPhoto(index) {
  modalPhotoIdx = index;
  updatePhotoUI();
}

function updatePhotoUI() {
  const track = document.getElementById('gallery-track');
  if (track) track.style.transform = `translateX(-${modalPhotoIdx * 100}%)`;
  document.querySelectorAll('.gallery-dot').forEach((d, i) =>
    d.classList.toggle('active', i === modalPhotoIdx)
  );
  document.querySelectorAll('.gallery-thumb').forEach((t, i) =>
    t.classList.toggle('active', i === modalPhotoIdx)
  );
}

function closeModal(e) {
  if (!e || e.target.id === 'animal-modal' || e.target.classList.contains('modal-close')) {
    document.getElementById('animal-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* =====================================================
   5. CARE SECTION
   ===================================================== */
function showCareTab(tab, btn) {
  activeCare = tab;
  document.querySelectorAll('.care-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCare();
}

function renderCare() {
  const cards = careData[activeCare] || [];
  document.getElementById('care-content').innerHTML =
    `<div class="care-cards-grid">
      ${cards.map(c => `
        <div class="care-card">
          <div class="care-icon">${c.icon}</div>
          <h3>${c.title}</h3>
          <p>${c.text}</p>
        </div>`).join('')}
     </div>`;
}

/* =====================================================
   6. FACTS
   ===================================================== */
function renderFacts() {
  document.getElementById('facts-grid').innerHTML = facts.map(f => `
    <div class="fact-card">
      <div class="fact-icon">${f.emoji}</div>
      <div class="fact-title">${f.title}</div>
      <div class="fact-text">${f.text}</div>
    </div>`).join('');
}

/* =====================================================
   7. CONTACT
   ===================================================== */
function sendContact(e) {
  e.preventDefault();
  const name    = document.getElementById('c-name').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const subject = document.getElementById('c-subject').value;
  const msg     = document.getElementById('c-msg').value.trim();
  if (!name || !email || !msg) { notify('⚠️ Vyplňte povinná pole', 'warn'); return; }
  messages.push({ id: Date.now(), name, email, subject, msg, date: new Date().toLocaleDateString('cs-CZ'), read: false });
  notify('✅ Zpráva odeslána! Odpovíme do 24 hodin.');
  e.target.reset();
  updateDashboard();
}

/* =====================================================
   8. ADMIN
   ===================================================== */
function openAdmin() {
  document.getElementById('admin').classList.add('open');
  document.getElementById('today-date').textContent = 'Dnes: ' + new Date().toLocaleDateString('cs-CZ');
  updateDashboard();
  renderAnimalsTable();
  renderFactsTable();
  renderMessagesTable();
}

function closeAdmin() {
  document.getElementById('admin').classList.remove('open');
}

function showAdminSection(name, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  el.classList.add('active');
}

function updateDashboard() {
  document.getElementById('d-animals').textContent = animals.length;
  document.getElementById('d-facts').textContent   = facts.length;
  const unread = messages.filter(m => !m.read).length;
  document.getElementById('d-msgs').textContent = unread;

  const t = document.getElementById('dash-msgs-table');
  if (!messages.length) {
    t.innerHTML = '<tbody><tr><td colspan="3" style="color:#999;padding:1rem;text-align:center">Žádné zprávy</td></tr></tbody>';
    return;
  }
  t.innerHTML = `<thead><tr><th>Jméno</th><th>Předmět</th><th>Datum</th></tr></thead>
    <tbody>${messages.slice(0, 5).map(m => `
      <tr style="${m.read ? '' : 'font-weight:600'}">
        <td>${m.name}<br><small style="color:#888;font-weight:400">${m.email}</small></td>
        <td>${m.subject}</td>
        <td style="color:#888">${m.date}</td>
      </tr>`).join('')}
    </tbody>`;
}

/* ---- ANIMALS CRUD ---- */
function renderAnimalsTable(filterVal = '') {
  let list = [...animals];
  if (filterVal) list = list.filter(a =>
    a.name.toLowerCase().includes(filterVal) || a.latin.toLowerCase().includes(filterVal)
  );
  document.getElementById('animals-table').innerHTML = `
    <thead><tr><th>Druh</th><th>Skupina</th><th>Fotek</th><th>★</th><th>Akce</th></tr></thead>
    <tbody>${list.map(a => `
      <tr>
        <td>
          ${a.imgs && a.imgs[0]
            ? `<img src="${a.imgs[0]}" style="width:48px;height:36px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:6px" onerror="this.style.display='none'">`
            : a.emoji + ' '}
          <strong>${a.name}</strong><br>
          <small style="color:#888;font-style:italic;font-size:.78rem">${a.latin}</small>
        </td>
        <td style="color:#888;font-size:.8rem">${groupLabel(a.group)}</td>
        <td>${a.imgs ? a.imgs.filter(Boolean).length : 0}</td>
        <td>${a.featured ? '⭐' : '—'}</td>
        <td>
          <button class="btn-icon" onclick="editAnimal(${a.id})" title="Upravit">✏️</button>
          <button class="btn-icon" onclick="deleteAnimal(${a.id})" title="Smazat">🗑️</button>
        </td>
      </tr>`).join('')}
    </tbody>`;
}

function filterAdminAnimals(val) { renderAnimalsTable(val.toLowerCase()); }

function newAnimal() {
  editAnimalId = null;
  document.getElementById('animal-form-title').textContent = 'Nový druh';
  ['af-name','af-latin','af-img1','af-img2','af-img3','af-short','af-desc','af-care','af-emoji'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('af-group').value   = 'svab';
  document.getElementById('af-diff').value    = '⭐ Začátečník';
  document.getElementById('af-featured').checked = false;
  document.getElementById('af-id').value      = '';
}

function editAnimal(id) {
  const a = animals.find(x => x.id === id); if (!a) return;
  editAnimalId = id;
  document.getElementById('animal-form-title').textContent = 'Upravit druh';
  document.getElementById('af-name').value     = a.name;
  document.getElementById('af-latin').value    = a.latin;
  document.getElementById('af-group').value    = a.group;
  document.getElementById('af-emoji').value    = a.emoji || '';
  document.getElementById('af-size').value     = a.size;
  document.getElementById('af-origin').value   = a.origin;
  document.getElementById('af-img1').value     = (a.imgs && a.imgs[0]) || '';
  document.getElementById('af-img2').value     = (a.imgs && a.imgs[1]) || '';
  document.getElementById('af-img3').value     = (a.imgs && a.imgs[2]) || '';
  document.getElementById('af-short').value    = a.short;
  document.getElementById('af-desc').value     = a.desc || '';
  document.getElementById('af-care').value     = a.care || '';
  document.getElementById('af-diff').value     = a.diff;
  document.getElementById('af-featured').checked = !!a.featured;
  document.getElementById('af-id').value       = id;
  showAdminSection('animals', document.querySelector('[data-section="animals"]'));
  setTimeout(() => document.getElementById('animal-form').scrollIntoView({ behavior: 'smooth' }), 100);
}

function saveAnimal() {
  const name = document.getElementById('af-name').value.trim();
  if (!name) { notify('⚠️ Vyplňte název druhu', 'warn'); return; }

  const imgs = [
    document.getElementById('af-img1').value.trim(),
    document.getElementById('af-img2').value.trim(),
    document.getElementById('af-img3').value.trim(),
  ].filter(Boolean);

  const data = {
    name, imgs,
    latin:    document.getElementById('af-latin').value.trim(),
    group:    document.getElementById('af-group').value,
    emoji:    document.getElementById('af-emoji').value || '🪲',
    size:     document.getElementById('af-size').value.trim(),
    origin:   document.getElementById('af-origin').value.trim(),
    short:    document.getElementById('af-short').value.trim(),
    desc:     document.getElementById('af-desc').value.trim(),
    care:     document.getElementById('af-care').value.trim(),
    diff:     document.getElementById('af-diff').value,
    featured: document.getElementById('af-featured').checked,
  };

  if (editAnimalId) {
    const idx = animals.findIndex(a => a.id === editAnimalId);
    animals[idx] = { ...animals[idx], ...data };
    notify('✅ Druh upraven!');
  } else {
    data.id = Date.now();
    animals.push(data);
    notify('✅ Druh přidán!');
  }
  renderAnimalsTable();
  renderAnimals();
  updateDashboard();
  newAnimal();
}

function deleteAnimal(id) {
  if (!confirm('Smazat druh?')) return;
  animals = animals.filter(a => a.id !== id);
  renderAnimalsTable();
  renderAnimals();
  updateDashboard();
  notify('🗑️ Druh smazán');
}

/* ---- FACTS CRUD ---- */
function renderFactsTable() {
  document.getElementById('facts-table').innerHTML = `
    <thead><tr><th>Ikona</th><th>Nadpis</th><th>Kat.</th><th>Akce</th></tr></thead>
    <tbody>${facts.map(f => `
      <tr>
        <td style="font-size:1.3rem">${f.emoji}</td>
        <td>
          <strong style="font-size:.85rem">${f.title}</strong><br>
          <small style="color:#888">${f.text.substring(0, 60)}…</small>
        </td>
        <td style="color:#888;font-size:.78rem">${f.cat}</td>
        <td>
          <button class="btn-icon" onclick="editFact(${f.id})" title="Upravit">✏️</button>
          <button class="btn-icon" onclick="deleteFact(${f.id})" title="Smazat">🗑️</button>
        </td>
      </tr>`).join('')}
    </tbody>`;
}

function clearFactForm() {
  editFactId = null;
  ['ff-emoji','ff-title','ff-text'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('ff-id').value = '';
}

function editFact(id) {
  const f = facts.find(x => x.id === id); if (!f) return;
  editFactId = id;
  document.getElementById('ff-emoji').value = f.emoji;
  document.getElementById('ff-title').value = f.title;
  document.getElementById('ff-text').value  = f.text;
  document.getElementById('ff-cat').value   = f.cat;
  document.getElementById('ff-id').value    = id;
  showAdminSection('facts-admin', document.querySelector('[data-section="facts-admin"]'));
}

function saveFact() {
  const title = document.getElementById('ff-title').value.trim();
  const text  = document.getElementById('ff-text').value.trim();
  if (!title || !text) { notify('⚠️ Vyplňte nadpis a text', 'warn'); return; }
  const data = {
    emoji: document.getElementById('ff-emoji').value || '🔬',
    title, text,
    cat: document.getElementById('ff-cat').value,
  };
  if (editFactId) {
    const idx = facts.findIndex(f => f.id === editFactId);
    facts[idx] = { ...facts[idx], ...data };
    notify('✅ Zajímavost upravena!');
  } else {
    data.id = Date.now(); facts.push(data);
    notify('✅ Zajímavost přidána!');
  }
  clearFactForm();
  renderFactsTable();
  renderFacts();
  updateDashboard();
}

function deleteFact(id) {
  if (!confirm('Smazat?')) return;
  facts = facts.filter(f => f.id !== id);
  renderFactsTable();
  renderFacts();
  updateDashboard();
  notify('🗑️ Smazáno');
}

/* ---- MESSAGES ---- */
function renderMessagesTable() {
  const t = document.getElementById('messages-table');
  if (!messages.length) {
    t.innerHTML = '<tbody><tr><td colspan="5" style="color:#999;padding:1.5rem;text-align:center">Žádné zprávy</td></tr></tbody>';
    return;
  }
  t.innerHTML = `<thead><tr><th>Jméno</th><th>E-mail</th><th>Předmět</th><th>Zpráva</th><th>Datum</th><th>Akce</th></tr></thead>
    <tbody>${messages.map(m => `
      <tr style="${m.read ? '' : 'background:#fffdf5'}">
        <td><strong>${m.name}</strong></td>
        <td style="color:#888;font-size:.82rem">${m.email}</td>
        <td>${m.subject}</td>
        <td style="font-size:.8rem;color:#666;max-width:180px">${m.msg.substring(0,70)}${m.msg.length > 70 ? '…' : ''}</td>
        <td style="color:#888;font-size:.78rem">${m.date}</td>
        <td>
          ${!m.read ? `<button class="btn-icon" onclick="markRead(${m.id})" title="Přečteno">✅</button>` : ''}
          <button class="btn-icon" onclick="deleteMessage(${m.id})" title="Smazat">🗑️</button>
        </td>
      </tr>`).join('')}
    </tbody>`;
}

function markRead(id) {
  const m = messages.find(x => x.id === id); if (m) m.read = true;
  renderMessagesTable(); updateDashboard();
  notify('✅ Označeno jako přečtené');
}

function deleteMessage(id) {
  if (!confirm('Smazat zprávu?')) return;
  messages = messages.filter(m => m.id !== id);
  renderMessagesTable(); updateDashboard();
  notify('🗑️ Zpráva smazána');
}

/* =====================================================
   9. UTILITIES
   ===================================================== */
let notifTimer = null;
function notify(msg, type = '') {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.className = 'notif show' + (type ? ' ' + type : '');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

function toggleMob()  { document.getElementById('mob').classList.toggle('open'); }
function closeMob()   { document.getElementById('mob').classList.remove('open'); }

/* =====================================================
   10. INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initCrawlers();
  initHeroSlideshow();
  renderAnimals();
  renderCare();
  renderFacts();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('animal-modal').classList.remove('open');
      document.body.style.overflow = '';
      if (document.getElementById('admin').classList.contains('open')) closeAdmin();
    }
  });
});
