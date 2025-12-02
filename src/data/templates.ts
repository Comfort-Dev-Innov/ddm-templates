export interface Template {
  name: string;
  fileName: string;
  category: 'base-temp' | 'combined-temp';
  path: string;
  brand?: string;  // For motive templates
  project?: string | null;  // For motive templates - null if file is directly in brand folder
}

export const baseTemplates: Template[] = [
  { name: 'BG Circle', fileName: 'bg-circle.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/bg-circle.html' },
  { name: 'Bullet 01', fileName: 'bullet-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/bullet-01.html' },
  { name: 'Bullet 02', fileName: 'bullet-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/bullet-02.html' },
  { name: 'Comparison 01', fileName: 'comparison-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/comparison-01.html' },
  { name: 'Comparison 02', fileName: 'comparison-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/comparison-02.html' },
  { name: 'Copyright 01', fileName: 'copyright-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/copyright-01.html' },
  { name: 'CTA 01', fileName: 'cta-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/cta-01.html' },
  { name: 'CTA 02', fileName: 'cta-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/cta-02.html' },
  { name: 'CTA 03', fileName: 'cta-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/cta-03.html' },
  { name: 'Features 01', fileName: 'features-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/features-01.html' },
  { name: 'Features 02', fileName: 'features-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/features-02.html' },
  { name: 'Features 03', fileName: 'features-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/features-03.html' },
  { name: 'Features 04', fileName: 'features-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/features-04.html' },
  { name: 'Final Section 01', fileName: 'final-section-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/final-section-01.html' },
  { name: 'Heading 01', fileName: 'heading-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/heading-01.html' },
  { name: 'Heading 02', fileName: 'heading-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/heading-02.html' },
  { name: 'Heading 03', fileName: 'heading-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/heading-03.html' },
  { name: 'Heading 04', fileName: 'heading-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/heading-04.html' },
  { name: 'HRs', fileName: 'hrs.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/hrs.html' },
  { name: 'Intro 01', fileName: 'intro-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/intro-01.html' },
  { name: 'Intro 02', fileName: 'intro-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/intro-02.html' },
  { name: 'Intro 03', fileName: 'intro-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/intro-03.html' },
  { name: 'Intro 04', fileName: 'intro-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/intro-04.html' },
  { name: 'Intro 05', fileName: 'intro-05.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/intro-05.html' },
  { name: 'Long Image', fileName: 'long-image.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/long-image.html' },
  { name: 'Newspaper 01', fileName: 'newspaper-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/newspaper-01.html' },
  { name: 'Numbered 01', fileName: 'numbered-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/numbered-01.html' },
  { name: 'Numbered 02', fileName: 'numbered-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/numbered-02.html' },
  { name: 'Numbered 03', fileName: 'numbered-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/numbered-03.html' },
  { name: 'Numbered 04', fileName: 'numbered-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/numbered-04.html' },
  { name: 'Numbered 05', fileName: 'numbered-05.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/numbered-05.html' },
  { name: 'Paragraph 01', fileName: 'paragraph-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/paragraph-01.html' },
  { name: 'Paragraph 02', fileName: 'paragraph-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/paragraph-02.html' },
  { name: 'Paragraph 03', fileName: 'paragraph-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/paragraph-03.html' },
  { name: 'Quote 01', fileName: 'quote-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/quote-01.html' },
  { name: 'Table 01', fileName: 'table-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/table-01.html' },
  { name: 'Table 02', fileName: 'table-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/table-02.html' },
  { name: 'Table 03', fileName: 'table-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/table-03.html' },
  { name: 'Table 04', fileName: 'table-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/table-04.html' },
  { name: 'Timeline 01', fileName: 'timeline-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/timeline-01.html' },
  { name: 'TOC 01', fileName: 'toc-01.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-01.html' },
  { name: 'TOC 02', fileName: 'toc-02.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-02.html' },
  { name: 'TOC 03', fileName: 'toc-03.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-03.html' },
  { name: 'TOC 04', fileName: 'toc-04.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-04.html' },
  { name: 'TOC 05', fileName: 'toc-05.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-05.html' },
  { name: 'TOC 06', fileName: 'toc-06.html', category: 'base-temp', path: '/src/content/motive/templates/base-temp/toc-06.html' },
];

export const combinedTemplates: Template[] = [
  { name: 'Comparison Heading 01', fileName: 'comparison-heading-01.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/comparison-heading-01.html' },
  { name: 'Section Bullet 01', fileName: 'section-bullet-01.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-bullet-01.html' },
  { name: 'Section Bullet 02', fileName: 'section-bullet-02.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-bullet-02.html' },
  { name: 'Section Bullet Logo CTA', fileName: 'section-bullet-logo-cta.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-bullet-logo-cta.html' },
  { name: 'Section Circle Img', fileName: 'section-circle-img.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-circle-img.html' },
  { name: 'Section Features 01', fileName: 'section-features-01.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-features-01.html' },
  { name: 'Section Features 02', fileName: 'section-features-02.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-features-02.html' },
  { name: 'Section Timeline 01', fileName: 'section-timeline-01.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/section-timeline-01.html' },
  { name: 'Subsections', fileName: 'subsections.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/subsections.html' },
  { name: 'Two Sections', fileName: 'two-sections.html', category: 'combined-temp', path: '/src/content/motive/templates/combined-temp/two-sections.html' },
];

export const allTemplates: Template[] = [...baseTemplates, ...combinedTemplates];

// Wix Templates (blocks)
export const wixBaseTemplates: Template[] = [
  { name: 'Image 01', fileName: 'image01.html', category: 'base-temp', path: '/src/content/wix/templates/base-temp/image01.html' },
  { name: 'Introduction', fileName: 'introduction.html', category: 'base-temp', path: '/src/content/wix/templates/base-temp/introduction.html' },
  { name: 'TOC 01', fileName: 'toc01.html', category: 'base-temp', path: '/src/content/wix/templates/base-temp/toc01.html' },
];

// Wix Pages
export const wixPages: Template[] = [
  { name: '3-misleading-google-ads / all-code', fileName: 'all-code.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/all-code.html' },
  { name: '3-misleading-google-ads / closing', fileName: 'closing.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/closing.html' },
  { name: '3-misleading-google-ads / myth1', fileName: 'myth1.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/myth1.html' },
  { name: '3-misleading-google-ads / myth2', fileName: 'myth2.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/myth2.html' },
  { name: '3-misleading-google-ads / myth3', fileName: 'myth3.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/myth3.html' },
  { name: '3-misleading-google-ads / section1', fileName: 'section1.html', category: 'base-temp', path: '/src/content/wix/pages/3-misleading-google-ads/section1.html' },
  { name: 'car-dealers', fileName: 'car-dealers.html', category: 'base-temp', path: '/src/content/wix/pages/car-dealers.html' },
  { name: 'car-dealerships', fileName: 'car-dealerships.html', category: 'base-temp', path: '/src/content/wix/pages/car-dealerships.html' },
  { name: 'geo', fileName: 'geo.html', category: 'base-temp', path: '/src/content/wix/pages/geo.html' },
];

// WP Templates (blocks)
export const wpBaseTemplates: Template[] = [
  { name: 'Buttons', fileName: 'buttons.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/buttons.html' },
  { name: 'Hero Section 01', fileName: 'hero-section-01.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/hero-section-01.html' },
  { name: 'Image Section 01', fileName: 'img-section-01.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/img-section-01.html' },
  { name: 'Image Section 02', fileName: 'img-section-02.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/img-section-02.html' },
  { name: 'Intro 01', fileName: 'intro-01.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/intro-01.html' },
  { name: 'Reservation', fileName: 'reservation.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/reservation.html' },
  { name: 'Table Section 01', fileName: 'table-sec-01.html', category: 'base-temp', path: '/src/content/wp/templates/base-temp/table-sec-01.html' },
];

// WP Pages - Import from separate file
import { wpTemplates as wpPagesImport } from './wp-templates';
export const wpPages = wpPagesImport;

// Motive Pages - Import from separate file
import { motiveTemplates as motivePagesImport } from './motive-templates';
export const motivePages = motivePagesImport;

// Combined list of all templates & pages
export const allAvailableTemplates: Template[] = [
  ...baseTemplates,
  ...combinedTemplates,
  ...wixBaseTemplates,
  ...wpBaseTemplates,
  ...motivePages,
  ...wixPages,
  ...wpPages,
];
