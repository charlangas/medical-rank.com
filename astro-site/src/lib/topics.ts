// The four topic hubs. Copy here is hand-written; it gives a practice the decision, the questions to
// ask and what to have in front of them. It makes no factual claims that would need a source.
export type Topic = {
  slug: 'medical-seo' | 'google-ads' | 'website-conversion' | 'marketing-measurement';
  nav: string;
  title: string;
  decision: string;
  intro: string;
  questions: string[];
  bring: string[];
  match: RegExp;
};

export const topics: Topic[] = [
  {
    slug: 'medical-seo',
    nav: 'Medical SEO',
    title: 'Medical SEO and local search',
    decision: 'Is your practice visible, and accurate, where nearby patients look?',
    intro:
      'Most patients looking for a practice start with a search near where they live or work. What they see first is usually your Google Business Profile and the map, then your website. This section covers how to judge whether that presence is complete and correct, and what SEO work is worth paying for.',
    questions: [
      'When you search for your specialty and your town from a phone, what appears, and is every detail on your listing correct?',
      'Which searches do you want to be found for, and does a page on your website answer each one?',
      'If you pay for SEO, what work was done last month, and can you see it on your site or listing?',
      'Which numbers in your SEO report describe patients, and which describe search engines?',
    ],
    bring: ['Your Google Business Profile', 'Your Search Console access, if you have it', 'Your last three SEO reports and invoices'],
    match: /\bseo\b|local search|google business|search engine|rank/i,
  },
  {
    slug: 'google-ads',
    nav: 'Google Ads',
    title: 'Google Ads and patient acquisition',
    decision: 'Are you paying for new patients, or for clicks and calls that look like them?',
    intro:
      'Google Ads can put a practice in front of people searching for care today. It can also spend a budget on events that never become appointments. This section covers how to read what your account counts, what healthcare advertising rules allow, and how to tell whether ads are worth their cost for your practice.',
    questions: [
      'What exactly does your account count as a conversion, and who chose that?',
      'Can your booking system show where a new patient came from, or only that they booked?',
      'How much did you spend last month, including the management fee, and what did you get that you can name?',
      'Who owns the Google Ads account: you or your agency?',
    ],
    bring: ['Your Google Ads report for the last three months', 'A new-patient booking report for the same months', 'Your agency agreement'],
    match: /google ads|\bppc\b|adwords|advertis|paid search|patient acquisition|more patients|new patients/i,
  },
  {
    slug: 'website-conversion',
    nav: 'Websites',
    title: 'Website conversion and appointment generation',
    decision: 'When a patient reaches your website, how easy is it to become an appointment?',
    intro:
      'A practice website has one job that matters to growth: help the right patient take the next step, whether that is a call, a form or an online booking. This section covers how to look at your own site the way a patient does, and what to change first.',
    questions: [
      'On a phone, how many taps does it take to call you or request an appointment from your most visited page?',
      'What happens to a request sent after hours, and how long until someone answers it?',
      'Does each service you want more of have its own page that says who it is for and what happens next?',
      'Who can change the website, and how long does a simple change take?',
    ],
    bring: ['Your website on your own phone', 'A week of appointment requests and how each was handled', 'Access to your website editor or the name of whoever has it'],
    match: /website|web design|landing page|conversion|appointment|booking|reputation|reviews/i,
  },
  {
    slug: 'marketing-measurement',
    nav: 'Measurement',
    title: 'Marketing measurement, budgets and agency selection',
    decision: 'What should you spend, how will you know it worked, and who should do the work?',
    intro:
      'Marketing decisions go wrong when nobody can say what a number means. This section covers setting a budget you can defend, reading agency reports, and choosing or replacing an agency with clear questions instead of promises.',
    questions: [
      'What is one new patient worth to your practice over a year, roughly, by service?',
      'For each thing you pay for, what would you expect to see if it were working?',
      'What does your agency report count, and what does your own schedule count?',
      'If you stopped working with your agency tomorrow, what would you keep: the accounts, the website, the data?',
    ],
    bring: ['Every marketing invoice from the last quarter', 'The reports that came with them', 'Your new-patient numbers for the same period'],
    match: /agency|agencies|budget|cost|pricing|measure|report|strategy|marketing/i,
  },
];

export const topicBySlug = (slug?: string) => topics.find((t) => t.slug === slug);

// Engine articles carry keywords, not a topic. The first topic whose pattern matches wins; order matters
// (specific topics first, the broad measurement and agencies topic last).
export function topicForKeywords(words: string[]): Topic | undefined {
  const text = words.join(' ');
  return topics.find((t) => t.match.test(text));
}
