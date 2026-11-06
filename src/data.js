// ============================================================
//  EDIT THIS FILE to change all the content on the website.
//  For images: put files in the /public folder and use "/my-photo.jpg"
// ============================================================

export const profile = {
  name: 'Maheswari',
  role: 'Content Writer & Copywriter',
  // the three items in the thin strip at the top of the home page
  masthead: ['A study of self & symbolism', 'Vedic astrology · Tarot', 'India · By Maheswari'],
  // big hero headline: the middle line is shown in coral italics
  headline: ['I explore the patterns', 'that make you,', 'you.'],
  headlineNote: 'Look a little closer.', // handwritten note next to the headline
  headlineAside: 'A little curiosity goes a long way.',
  intro:
    'I explore Vedic astrology and tarot through thoughtful interpretations, meaningful conversations and a deep curiosity about what makes us who we are. A space to understand your patterns, question the familiar and see yourself from a different perspective.',
  highlight: 'understand your patterns', // this part of the intro gets a highlighter effect
  badge: 'OBSERVER · INTERPRETER · STORYTELLER ·', // the spinning circle badge
  location: 'India',
  since: '2022',
  availability: 'Available for consultations',
  email: 'hello@mahu.com',
  phone: '+91 00000 00000',
  photo: '', // e.g. '/mahu.jpg' (leave empty to show initials)
  resume: '', // e.g. '/resume.pdf'
  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'Medium', url: 'https://medium.com/' },
  ],
}

export const about = {
  // each item is one line of the About headline; the last line is shown in coral italics
  headline: ['A curious mind,', 'drawn to', 'the patterns beneath.'],
  paragraphs: [
    "Hi, I'm Maheswari — a writer, storyteller and lifelong observer of the human experience. My curiosity lies in understanding who we are, why we think the way we do, and the patterns that shape our lives.",
    "My journey through Philosophy, Psychology and eventually Vedic astrology led me to explore these questions through different lenses. Today, I bring together traditional astrological knowledge, intuitive interpretation and a writer's instinct for finding meaning in the details. Tarot has become another language I'm enjoying learning and exploring.",
  ],
  quote: 'If the Moon moves the tides, why shouldn’t I wonder about its influence on us?',
  quoteAuthor: 'Maheswari',
  // numbers like "12+" count up; words are shown as they are
  stats: [
    { value: '12+', label: 'Years with words' },
    { value: 'Philosophy', label: 'Academic foundation' },
    { value: 'Vedic · Tarot', label: 'Fields of exploration' },
  ],
  // shown in the scrolling band below the hero
  skills: [
    'Vedic Astrology',
    'Birth Chart Readings',
    'Tarot',
    'Dasha Analysis',
    'Relationship Insights',
    'Written Chart Interpretations',
  ],
}

export const services = [
  { title: 'Blog & Articles', text: 'Well-researched, engaging long-form pieces that build trust and authority.' },
  { title: 'SEO Content', text: 'Keyword-smart content that ranks on Google and brings steady organic traffic.' },
  { title: 'Website Copy', text: 'Clear, persuasive copy for home, about, service and landing pages.' },
  { title: 'Social Media', text: 'Captions, carousels and threads that grow engagement and followers.' },
  { title: 'Email Newsletters', text: 'Newsletters and email sequences readers actually look forward to opening.' },
  { title: 'Editing & Proofreading', text: 'Polishing your drafts for grammar, flow, tone and readability.' },
]

export const process = [
  { title: 'The Brief', text: 'We talk about your brand, audience, goals and the tone you want.' },
  { title: 'Research', text: 'I dig into your topic, competitors and keywords before writing a word.' },
  { title: 'First Draft', text: 'A complete, well-structured draft delivered on the agreed date.' },
  { title: 'Polish & Deliver', text: 'Revisions until it feels just right — ready to publish.' },
]

// category is used for the filter buttons
// tone sets the card colour: ink | red | yellow | sage | sky | paper
export const samples = [
  {
    title: '10 Morning Habits That Quietly Change Your Life',
    category: 'Blog',
    client: 'LifeWell Magazine',
    excerpt: 'A research-backed guide to building a morning routine that actually sticks.',
    readTime: '6 min read',
    tone: 'ink',
    link: '#',
  },
  {
    title: 'The Complete Guide to Home Loans in India',
    category: 'SEO',
    client: 'FinEasy',
    excerpt: 'Long-form SEO article that reached page one of Google for its main keyword.',
    readTime: '12 min read',
    tone: 'yellow',
    link: '#',
  },
  {
    title: 'Bloom Cafe — Website Copy',
    category: 'Copywriting',
    client: 'Bloom Cafe',
    excerpt: 'Warm, inviting copy for a neighbourhood cafe’s new website.',
    readTime: 'Website',
    tone: 'red',
    link: '#',
  },
  {
    title: 'Sustainable Fashion: Why It Matters',
    category: 'Blog',
    client: 'Urban Wear',
    excerpt: 'Explaining slow fashion to a young, style-conscious audience.',
    readTime: '5 min read',
    tone: 'sage',
    link: '#',
  },
  {
    title: 'Festive Season Campaign',
    category: 'Social Media',
    client: 'Green Leaf Organics',
    excerpt: 'A 30-day Instagram caption series that doubled engagement.',
    readTime: '30 posts',
    tone: 'paper',
    link: '#',
  },
  {
    title: 'Best Travel Destinations for 2026',
    category: 'SEO',
    client: 'WanderNest',
    excerpt: 'A destination roundup optimised for search, packed with local tips.',
    readTime: '9 min read',
    tone: 'sky',
    link: '#',
  },
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder, Bloom Cafe',
    text: 'Maheswari captured our cafe’s personality perfectly. Customers keep telling us how much they love reading our website.',
  },
  {
    name: 'Rahul Verma',
    role: 'Marketing Lead, FinEasy',
    text: 'Her SEO articles brought us steady organic traffic within months. Well researched, and always on time.',
  },
  {
    name: 'Anita Das',
    role: 'Editor, LifeWell Magazine',
    text: 'Clean drafts, fresh ideas and a reader-first approach. Honestly one of the easiest writers I’ve worked with.',
  },
]

// ------------------------------------------------------------
//  BLOG (powered by WordPress)
//  Put the WordPress site address here, e.g.
//    'maheswari.wordpress.com'   (free WordPress.com site)
//    'cms.minnxx.com'            (self-hosted WordPress, e.g. on Hostinger)
//  Leave it empty to hide the blog from the website.
// ------------------------------------------------------------
export const blog = {
  wordpressSite: 'maheswariwrites.wordpress.com',
  title: 'The Journal',
  intro: 'Notes on writing, content and storytelling — straight from my desk.',
}
