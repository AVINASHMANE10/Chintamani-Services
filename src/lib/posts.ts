/**
 * Blog post source — file-based.
 *
 * To add a new post:
 *   1. Append a new object to the POSTS array below.
 *   2. Commit & push — Netlify rebuilds and the post is live.
 *
 * To edit a post:
 *   1. Edit the object in this file.
 *   2. Commit & push.
 *
 * That's it. No CMS, no database, no admin login.
 *
 * For the body, use plain text with double-newlines between paragraphs.
 * Use lines starting with "• " for bullet points.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string; // YYYY-MM-DD
  coverImage?: string;
  readingMinutes: number;
  category: string;
};

const POSTS: Post[] = [
  {
    slug: 'how-often-should-an-stp-be-cleaned',
    title: 'How often should an STP be cleaned? A practical guide for facility managers',
    excerpt:
      'The honest answer depends on load, capacity and design — but here are the rules of thumb we use after a decade of cleaning STPs across Pune.',
    body: `Most facility managers ask us the same question on the first call: "How often does our STP actually need cleaning?" The textbook answer is "every 3 to 6 months." The honest answer is: it depends — and the cost of getting it wrong is much higher than the cost of cleaning a little more often.

Here is what we tell our regular society and factory clients.

Every 3 months — high-load STPs:
• Hotels, banquet halls, hospitals, large IT campuses
• Factories with food, dairy, beverage or pharma waste
• Societies with more than 200 flats
• Any STP that has had odour complaints in the last 30 days

Every 6 months — standard residential STPs:
• Apartment societies up to 200 flats
• Office buildings with regular occupancy
• Schools and small institutions

Annually, with a minor desludge every 6 months:
• Backup/standby STPs used only intermittently
• Very small STPs serving 30–50 units

Signs your STP needs cleaning today, regardless of schedule:
• Foul smell coming from the chambers or vents
• Sludge level above the mid-point of the equalisation tank
• Treated water looks cloudy, grey or has visible particles
• Aerators not pushing diffuser bubbles evenly
• MPCB or society audit due in the next 30 days

The cost of skipping a cleaning round is rarely the cleaning itself — it is the damage that builds up. Sludge that sits hardens. Diffusers choke. Aerator motors burn out trying to push air through blocked lines. A ₹40,000 cleaning postponed becomes a ₹2 lakh repair six months later.

The other reason to stick to a schedule: regulators. MPCB and CPCB audits go faster, and quote less, when you can hand over a clean log of dated service reports. We provide digital service certificates with every job for exactly this reason.

If you are not sure where your STP is on this scale, ask for a free site visit. We will check sludge levels, look at the diffusers, and give you a written recommendation — and a quote, if needed.`,
    publishedAt: '2026-04-22',
    readingMinutes: 5,
    category: 'STP Maintenance',
    coverImage: '/images/services/stp-workers-2.jpg',
  },
  {
    slug: 'cooling-tower-cleaning-frequency-and-savings',
    title: 'Cooling tower cleaning: why every 6 months saves more than it costs',
    excerpt:
      'Algae, scale and biofilm cut cooling efficiency by up to 30%. Here is what regular cleaning actually looks like, and what it does to your power bill.',
    body: `Most plant managers know cooling towers need cleaning. Few know just how fast a tower loses efficiency when it does not get one.

A 100 TR tower running 12 hours a day in Pune's climate accumulates around 2–4 mm of scale and biofilm on the fills inside 6 months. That layer acts like an insulator on the heat-transfer surface — the water sheets that should release heat into the air just slide off the deposits, untouched. We have seen towers that should be giving an 8°C drop deliver only 5°C, simply because the fills were dirty.

What that looks like on your electricity bill: the chiller compressor has to run longer to compensate. We typically see a 10–20% increase in chiller load on a neglected tower. On a 100 TR system in Pune at ₹9/unit, that's roughly ₹40,000 to ₹70,000 of extra electricity per month — far more than the cost of cleaning the tower twice a year.

What a proper cleaning includes:
• High-pressure jet washing of every fill pack — both sides
• Basin desludging — algae, mud and rust scraped and removed
• Louver cleaning — the screens that air enters through
• Drift eliminator inspection — these often crack and let water escape
• Distribution tray inspection — clogged nozzles spray unevenly
• Fan inspection — bearings, belts, blades

What it does NOT include in our standard scope (but we will quote separately if needed):
• Fill pack replacement when fills are physically damaged or warped
• Chemical descaling for very heavy scale (separate booking)
• Fan motor replacement

Best frequency for Pune conditions:
• Process cooling (factories, foundries, plastics): every 3 months
• HVAC cooling (hotels, hospitals, malls): every 6 months
• Office/light commercial: every 6 months, with a basin check at 3 months

A small detail worth mentioning: Legionella bacteria thrive in dirty cooling towers, and Indian hospitals and large hotels now treat this as a real audit risk. Regular cleaning is the single most effective control.

If your tower has not been cleaned in over 6 months, ask for a site visit. We can usually tell from the basin alone whether you are losing money on every shift.`,
    publishedAt: '2026-03-18',
    readingMinutes: 5,
    category: 'Cooling Towers',
    coverImage: '/images/services/cooling-tower-2.jpg',
  },
  {
    slug: 'water-tank-cleaning-checklist-for-housing-societies',
    title: 'Water tank cleaning: a simple checklist every housing society should follow',
    excerpt:
      'A short, no-nonsense checklist for society secretaries and facility teams — what to ask for, what to verify, and what a real cleaning report should contain.',
    body: `Most housing societies in Pune clean their water tanks twice a year. Some clean once. A few do not clean at all until residents complain about taste, smell or stomach upsets. Whichever camp your society is in, here is a checklist that takes the guesswork out of it.

Before the cleaning visit:
• Get written quotes from at least 2 vendors — and check if they are ISO certified
• Ask whether they bring their own pumps, pipes and disinfectants, or expect you to supply
• Confirm whether confined-space safety equipment (gas detectors, harness, PPE) is included
• Ask for a sample of the digital service report from a previous job
• Schedule the cleaning when residents will use the least water — most societies pick Sunday mornings

On the day of cleaning:
• Inform residents 24 hours in advance — most will store a day's water in advance
• Drain the tank fully through the outlet — never through the overflow (this floods the terrace)
• Watch the team set up safety: PPE, ventilation, gas check before any operator enters the tank
• If they enter without these — stop the job. Confined-space accidents are real and have killed cleaners in Pune.

What proper cleaning actually involves:
• Manual removal of mud, scale and sediment from the floor (jet cannot reach corners)
• High-pressure washing of all walls and the floor — top to bottom
• Inspection of the inlet, outlet, overflow and ball-valve assembly
• Inspection of the manhole cover gasket — most are torn and let dust in
• Food-grade disinfection — the chemical name should be on the bill
• Rinse to neutral pH before the tank is refilled

After cleaning — what the report should contain:
• Date and time of service
• Tank capacity in litres
• Photos of the tank before cleaning, mid-cleaning and after
• Names of operators and supervisor
• Disinfectant used and concentration
• Any defects observed (cracks, leaks, missing gaskets)
• Recommendations and next-due date

Refill the tank with fresh municipal water. The first 100 litres should be drained from each outlet — that flushes the supply pipes. Residents can use the water normally after that.

How often: every 6 months for most overhead tanks; every 3 months for underground sumps in summer; immediately if there is any change in taste, smell, or colour of the water.

If your society has not had a written cleaning report in the last 12 months, you are overdue.`,
    publishedAt: '2026-02-11',
    readingMinutes: 6,
    category: 'Water Tank Care',
    coverImage: '/images/services/water-tank-illustration.svg',
  },
  {
    slug: 'solar-water-heater-not-working',
    title: 'Solar water heater not heating? Five things to check before calling a technician',
    excerpt:
      'Most solar water heater problems in Pune come down to five fixable issues. Walk through them yourself before paying for a service call.',
    body: `Pune homes lose hot water from rooftop solar systems for a handful of common reasons. Many of them can be checked, and sometimes fixed, in 10 minutes — before you spend on a service call. Here is the short version.

1. Scale build-up in the tank
After 2–3 years, hard water leaves a thick layer of calcium and magnesium scale inside the tank. This insulates the water from the heating tubes — the sun heats the tubes, the tubes try to heat the tank, but the scale stops the transfer. You feel "barely warm" water in the morning when it should be steaming.

Quick check: open the bottom drain valve briefly. If white or yellow flakes come out, you have scale. Tank descaling fixes this — typically every 2 to 3 years.

2. Broken or empty evacuated tubes
Tubes can crack from hail, monkeys, falling branches or simple temperature shock. Even one missing tube means lost capacity. Empty tubes (where the inner glass has fogged or filled with water) are dead — they will not heat at all.

Quick check: go to the terrace mid-morning. All working tubes should feel uniformly hot near the top end. Cold tubes are dead and need replacement.

3. Stuck or scaled-up pressure-relief valve
The PRV at the top of the tank is supposed to release excess pressure on hot days. When it scales up, water either leaks continuously (a small but constant drip) or builds dangerous pressure inside. Either way, the system underperforms.

Quick check: look for water dripping from the small pipe coming out of the tank top. If it's dripping when the tank is not being used, the valve needs cleaning or replacing.

4. Choked inlet/outlet pipes
Hard water deposits build up inside the cold inlet pipe over years. Eventually water cannot flow in to be heated, or hot water cannot reach your tap.

Quick check: turn on the hot tap furthest from the tank. If the flow is much weaker than the cold side, you have a choke.

5. Controller, sensor or pump failure (pressurised systems)
If you have a pressurised system with a circulation pump and digital controller, any of these can fail. The display will show error codes — refer to your manual or send us a photo of the screen.

When to call us: if all five checks come back okay and the water is still not heating, call us. Most service jobs take a single visit. We service all brands — Racold, V-Guard, Tata Power Solar, Anu Solar, Supreme, and others.

A general rule: solar water heaters last 12–15 years if serviced once a year. The annual service costs less than a single big repair, so an AMC pays for itself quickly. We offer one for both households and societies.`,
    publishedAt: '2026-01-15',
    readingMinutes: 5,
    category: 'Solar Heaters',
    coverImage: '/images/services/solar-heater-illustration.svg',
  },
];

export async function getAllPosts(): Promise<Post[]> {
  // Sort newest first
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return POSTS.find((p) => p.slug === slug) ?? null;
}
