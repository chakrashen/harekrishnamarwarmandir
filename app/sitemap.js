export default function sitemap() {
  return [
    { url: 'https://harekrishnamarwar.org', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://harekrishnamarwar.org/donate', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://harekrishnamarwar.org/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://harekrishnamarwar.org/seva/gau-seva', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://harekrishnamarwar.org/seva/anna-daan', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://harekrishnamarwar.org/seva/mandir-nirman', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://harekrishnamarwar.org/events', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://harekrishnamarwar.org/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://harekrishnamarwar.org/gallery', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://harekrishnamarwar.org/visit', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
