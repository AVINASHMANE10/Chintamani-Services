/**
 * Sanity CMS integration.
 *
 * For the MVP we serve a set of fallback posts from local data so the blog
 * renders as soon as the site is live. Once the client is ready to manage
 * content in Sanity Studio, uncomment the client code below and populate
 * NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_READ_TOKEN in .env.local.
 *
 * See README.md → "Setting up the blog" for step-by-step instructions.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  coverImage?: string;
  readingMinutes: number;
  category: string;
};

const FALLBACK_POSTS: Post[] = [
  {
    slug: 'how-often-should-you-clean-your-water-tank',
    title: 'How often should you clean your water tank?',
    excerpt:
      'A practical answer based on Indian conditions, tank material, and water source — plus the warning signs you should never ignore.',
    body: `The short answer: every six months for overhead domestic tanks, every three months for underground sumps, and immediately if you notice any change in taste, smell, or colour.

Why so frequent? In Indian urban conditions, a typical overhead tank accumulates 1–3 mm of biofilm per month — a slimy layer of bacteria and algae that forms on tank walls, invisible to the naked eye. Once biofilm reaches 5 mm, chlorine from municipal water can no longer penetrate it, and pathogens begin to shed into the water you drink.

Signs your tank needs cleaning today:
• Water tastes metallic, earthy, or "off"
• Visible sediment at the bottom of a glass of stored water
• Slimy feel on tank walls when you open the lid
• Unexplained stomach upsets in the household
• Water looks faintly yellow, green, or cloudy

What a professional cleaning actually does — and why DIY isn't enough — we'll cover in the next post. For now, mark your calendar for every six months and set a reminder. Your gut (quite literally) will thank you.`,
    publishedAt: '2026-03-12',
    readingMinutes: 4,
    category: 'Water Tank Care',
  },
  {
    slug: 'facade-cleaning-glass-vs-stone',
    title: 'Facade cleaning: why glass and stone need opposite treatments',
    excerpt:
      'The same pressure washer that restores a granite facade will strip the coating off a glass one. Here is what separates them.',
    body: `Every facade-cleaning job begins with one question: what is the surface? The answer dictates everything — pressure, chemistry, dwell time, even the ladder type.

Glass facades are coated. Most modern glass towers use a low-emissivity coating on the outer face to cut heat gain — a coating softer than the glass itself. Hit it with a 3,000 PSI jet and you have just turned a transparent panel into a cloudy one. The right approach: purified-water poles at 300 PSI, no surfactants that can leave a film, and a soft-bristle rotary brush.

Stone facades are porous. Granite and sandstone absorb the very chemicals we use to clean them. A strong acid-based cleaner looks effective on day one, but leaves salts inside the stone that re-emerge as white efflorescence two weeks later. The right approach: pH-neutral biodegradable agents, longer dwell time, and a final de-ionised water rinse.

Composite panels (ACP) are somewhere in between — painted aluminium that chips if you scrub too hard and streaks if you don't dry it properly. Treat it like a car: soft sponges, neutral soap, clean water rinse, microfibre dry.

The principle across all three: match the chemistry to the material, not the stain.`,
    publishedAt: '2026-02-28',
    readingMinutes: 5,
    category: 'Facade Cleaning',
  },
  {
    slug: 'is-0.5-ppm-chlorine-really-safe',
    title: 'Is 0.5 ppm chlorine really safe for drinking water?',
    excerpt:
      'The WHO number you have heard a hundred times. What it actually measures, where it fails, and why residuals matter more than free chlorine.',
    body: `The 0.5 ppm figure refers to free residual chlorine — the chlorine left over after the initial demand has been met. WHO set it as a minimum, not a target, and the full safe range is 0.2–1.0 ppm at the tap.

What it measures: the ability of the water to kill pathogens if they enter the system downstream. Below 0.2 ppm, that buffer is gone. Above 1.0 ppm, most people can taste and smell it.

What it doesn't measure: anything already removed by filtration, anything that doesn't react with chlorine (protozoa like Cryptosporidium), or the state of the pipe between the treatment plant and your tap.

In buildings with intermittent supply — common across most Indian cities — water sits in the tank for hours between fills. Free chlorine decays quickly in warm, stationary water. By the time it reaches your kitchen, the 0.5 ppm at the municipal supply may be 0.05 ppm at your tap. That's why tank hygiene matters more than treatment-plant chemistry for most urban households.

Quick rule: if your water smells strongly of chlorine, it's fresh. If it doesn't, it's either been filtered — or it's been sitting too long.`,
    publishedAt: '2026-02-10',
    readingMinutes: 4,
    category: 'Water Quality',
  },
];

export async function getAllPosts(): Promise<Post[]> {
  // TODO: replace with Sanity query once connected
  // if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  //   return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc)`);
  // }
  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
