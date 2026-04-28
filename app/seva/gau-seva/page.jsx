import GauSevaClient from './GauSevaClient';

export const metadata = {
  title: "Gau Seva — Donate for Cow Protection | Hare Krishna Marwar Jodhpur",
  description: "Support the care and protection of desi cows at our gaushala in Jodhpur. Every donation feeds and shelters sacred cows. 80G tax benefit available.",
  alternates: { canonical: "https://harekrishnamarwar.org/seva/gau-seva" }
};

export default function GauSevaPage() {
  return <GauSevaClient />;
}
