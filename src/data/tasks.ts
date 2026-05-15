export type TaskMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
};

export const tasks: TaskMeta[] = [
  {
    slug: 'task-1',
    title: 'Task 1: Age Form',
    summary:
      'Test a numeric age input and the routing/screens it produces for different age ranges.',
    tags: ['Form validation', 'Routing', 'Network'],
    href: '/task-1/',
  },
  {
    slug: 'task-2',
    title: 'Task 2: Login Validation',
    summary:
      'Test client-side validation, error handling, and UX of a typical sign-in form.',
    tags: ['Form validation', 'UX', 'Accessibility'],
    href: '/task-2/',
  },
  {
    slug: 'task-3',
    title: 'Task 3: Eternal Loader',
    summary:
      'Debug a dashboard that gets stuck on an infinite spinner after sign-in.',
    tags: ['Debug', 'Network', 'Caching'],
    href: '/task-3/',
  },
  {
    slug: 'task-4',
    title: 'Task 4: Analytics Events',
    summary:
      'Verify analytics events fired throughout an onboarding wizard.',
    tags: ['Analytics', 'Network', 'Multi-step flow'],
    href: '/task-4/',
  },
  {
    slug: 'task-5',
    title: 'Task 5: Localization',
    summary:
      'Test a 3-step onboarding in English, Spanish (MX) and Ukrainian — translations, formatting, layout, switcher.',
    tags: ['i18n', 'L10n', 'Formatting'],
    href: '/task-5/',
  },
];
