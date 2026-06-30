export type HeroFact = {
  label: string;
  value: string;
};

export type CardSection = {
  type: "cards";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    title: string;
    body: string;
  }>;
};

export type StatsSection = {
  type: "stats";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type GallerySection = {
  type: "gallery";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    title: string;
    caption: string;
  }>;
};

export type TestimonialsSection = {
  type: "testimonials";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    quote: string;
    author: string;
    role?: string;
  }>;
};

export type DocumentsSection = {
  type: "documents";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    name: string;
    meta: string;
  }>;
};

export type ContactSection = {
  type: "contact";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  panelTitle: string;
  panelBody: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type RichTextSection = {
  type: "richText";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  html: string;
};

export type SiteSection =
  | CardSection
  | StatsSection
  | GallerySection
  | TestimonialsSection
  | DocumentsSection
  | ContactSection
  | RichTextSection;

export type SitePage = {
  uri: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  metaTitle?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroFacts: HeroFact[];
  sections: SiteSection[];
};

export type WordPressNodeResponse = {
  nodeByUri?: {
    __typename: string;
    content?: string | null;
    title?: string | null;
    uri?: string | null;
  } | null;
};
