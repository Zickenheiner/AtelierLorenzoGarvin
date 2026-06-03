/// <reference types="vite-react-ssg" />
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

async function writeSpaFallback(outDir: string): Promise<void> {
  const html = await readFile(join(outDir, 'index.html'), 'utf-8');

  const hashMarker = '<script>window.__VITE_REACT_SSG_HASH__';
  const start = html.indexOf('<div id="root"');
  const hashPos = html.indexOf(hashMarker);

  let shell: string;
  if (start !== -1 && hashPos !== -1) {
    const closeRoot = html.lastIndexOf('</div>', hashPos);
    shell =
      html.slice(0, start) +
      '<div id="root"></div>' +
      html.slice(closeRoot + '</div>'.length);
  } else {
    shell = html
      .replace(/(<div id="root")[^>]*>[\s\S]*?<\/div>/, '$1></div>')
      .replace(
        /<script>window\.__staticRouterHydrationData[\s\S]*?<\/script>/,
        '',
      );
  }

  await writeFile(join(outDir, '200.html'), shell, 'utf-8');
}

function normalizePath(path: string): string {
  if (path === '/' || path === '') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

async function writeSeoFiles(
  outDir: string,
  paths: string[],
  siteUrl: string,
): Promise<void> {
  const base = siteUrl.replace(/\/+$/, '');

  const robots = [
    'User-agent: *',
    'Disallow: /admin',
    'Allow: /',
    ...(base ? [`Sitemap: ${base}/sitemap.xml`] : []),
    '',
  ].join('\n');
  await writeFile(join(outDir, 'robots.txt'), robots, 'utf-8');

  if (!base) {
    console.warn(
      '[SSG] sitemap.xml non généré : VITE_SITE_URL absent (URL absolue requise).',
    );
    return;
  }

  const urls = Array.from(new Set(paths.map(normalizePath)))
    .sort()
    .map((path) => `  <url>\n    <loc>${base}${path}</loc>\n  </url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf-8');
}

async function fetchProjetPaths(apiUrl?: string): Promise<string[]> {
  if (!apiUrl) return [];
  try {
    const base = apiUrl.replace(/\/+$/, '');
    const res = await fetch(`${base}/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projets = (await res.json()) as Array<{ slug?: string }>;
    return projets
      .map((p) => p.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => `/projets/${slug}`);
  } catch (error) {
    console.warn(
      '[SSG] Pages projets non pré-générées (API injoignable au build) :',
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || '';

  let renderedPaths: string[] = [];

  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      host: true,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    ssgOptions: {
      entry: 'src/main.tsx',
      dirStyle: 'nested',
      includedRoutes: async (paths) => {
        const isAdmin = (path: string) =>
          path === 'admin' ||
          path.startsWith('admin/') ||
          path.startsWith('/admin');
        const staticPaths = paths.filter(
          (path) => !isAdmin(path) && !path.includes(':'),
        );
        const apiUrl = env.VITE_API_URL || process.env.VITE_API_URL;
        const projetPaths = await fetchProjetPaths(apiUrl);
        renderedPaths = [...staticPaths, ...projetPaths];
        return renderedPaths;
      },
      onFinished: async (dir) => {
        await writeSeoFiles(dir, renderedPaths, siteUrl);
        await writeSpaFallback(dir);
      },
    },
  };
});
