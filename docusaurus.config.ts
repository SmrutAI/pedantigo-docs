import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Pedantigo',
  tagline: 'Pydantic-inspired validation for Go',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Production URL
  url: 'https://pedantigo.dev',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'SmrutAI',
  projectName: 'pedantigo',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'pedantigo/docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/SmrutAI/pedantigo/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/SmrutAI/pedantigo-docs/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        // Site metadata for llms.txt header
        siteTitle: 'Pedantigo',
        siteDescription:
          'Pydantic-inspired validation library for Go with JSON Schema generation, streaming support, and zero dependencies beyond stdlib.',

        // Categorization depth: 2 = /docs/concepts/* → "concepts" category
        depth: 2,

        // Include descriptions in llms.txt links
        enableDescriptions: true,

        // Content configuration
        content: {
          enableMarkdownFiles: true,
          enableLlmsFullTxt: true,
          relativePaths: true,
          includeDocs: true,
          includeVersionedDocs: false,
          includeBlog: true,
          includePages: false,
          includeGeneratedIndex: true,
          rehypeProcessTables: true,
          remarkGfm: true,
        },

        // Category ordering - getting started first
        includeOrder: [
          '/docs/intro',
          '/docs/getting-started/**',
          '/docs/concepts/**',
          '/docs/constraints/**',
          '/docs/api/**',
          '/docs/advanced/**',
          '/docs/examples/**',
          '/blog/**',
        ],

        // External links to include
        optionalLinks: [
          {
            title: 'GitHub Repository',
            url: 'https://github.com/SmrutAI/pedantigo',
            description: 'Source code and issue tracker',
          },
          {
            title: 'Go Package Reference',
            url: 'https://pkg.go.dev/github.com/SmrutAI/pedantigo',
            description: 'Official Go documentation',
          },
          {
            title: 'Benchmarks',
            url: 'https://pedantigo.dev/docs/benchmarks',
            description: 'Performance comparison with alternatives',
          },
        ],

        runOnPostBuild: true,
        onRouteError: 'warn',
        logLevel: 1,
      },
    ],
  ],

  themeConfig: {
    // Social card image
    image: 'img/social-card.png',

    // Color mode settings
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Navbar configuration
    navbar: {
      logo: {
        alt: 'Pedantigo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: '/docs/benchmarks',
          label: 'Benchmarks',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
        },
        {
          href: 'https://pkg.go.dev/github.com/SmrutAI/pedantigo',
          label: 'Go Reference',
          position: 'right',
        },
        {
          href: 'https://github.com/SmrutAI/pedantigo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    // Footer configuration
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/',
            },
            {
              label: 'Go Reference',
              href: 'https://pkg.go.dev/github.com/SmrutAI/pedantigo',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SmrutAI/pedantigo',
            },
            {
              label: 'Issues',
              href: 'https://github.com/SmrutAI/pedantigo/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SmrutAI/pedantigo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SmrutAI. Built with ❤️ by <a href="https://smrut.ai" target="_blank" rel="noopener noreferrer">smrut.ai</a>`,
    },

    // Syntax highlighting
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['go', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
