// ============================================================
//  EDIT THIS FILE to change all the content on the website.
//  For images: put files in the /public folder and use "/my-photo.jpg"
// ============================================================

export const profile = {
  name: 'Maheswari',
  role: 'Content Writer & Copywriter',
  // the hero types these words one by one: "I write words that ___"
  rotatingWords: ['sell', 'rank', 'stick', 'inspire'],
  intro:
    'I write blogs, website copy, SEO articles and social content that helps brands tell their story — and gets people to actually read it.',
  highlight: 'helps brands tell their story', // this part of the intro gets a highlighter effect
  location: 'India',
  since: '2022',
  availability: 'Available for work',
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
  paragraphs: [
    "Hi, I'm Maheswari — a content writer who believes every brand has a story worth telling. I turn ideas, research and rough notes into content people genuinely enjoy reading.",
    'From long-form blogs and SEO articles to punchy website copy and social captions, I adapt my voice to fit your brand while keeping your goals at the centre of every single piece.',
  ],
  quote: 'Good content doesn’t just inform. It makes people feel something — and then act on it.',
  stats: [
    { value: '3+', label: 'Years writing' },
    { value: '500+', label: 'Articles live' },
    { value: '60+', label: 'Happy clients' },
  ],
  // shown in the scrolling band below the hero
  skills: [
    'Blog Writing',
    'SEO Content',
    'Copywriting',
    'Website Content',
    'Social Media',
    'Email Newsletters',
    'Proofreading',
    'Research',
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
