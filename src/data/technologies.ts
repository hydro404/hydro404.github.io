export interface Technology {
  label: string;
  icons: readonly string[];
  aliases?: readonly string[];
}

export interface ToolkitGroup {
  title: string;
  items: readonly string[];
}

const iconDirectory = '/icons/technologies/';

/** Labels and local logos. A technology without a logo still shows its label. */
export const technologies: readonly Technology[] = [
  { label: 'TypeScript', icons: ['typescript.svg'] },
  { label: 'Python', icons: ['python.svg'] },
  { label: 'Java', icons: ['java.svg'] },
  { label: 'VB.NET', icons: ['vbnet.svg'], aliases: ['Visual Basic .NET', 'Visual Basic'] },
  { label: 'PHP', icons: ['php.svg'] },
  { label: 'React', icons: ['react.svg'], aliases: ['React.js', 'ReactJS'] },
  { label: 'Vue', icons: ['vue.svg'], aliases: ['Vue.js', 'VueJS'] },
  { label: 'Next.js', icons: ['nextjs.svg'], aliases: ['NextJS'] },
  { label: 'Astro', icons: ['astro.svg'] },
  { label: 'Tailwind CSS', icons: ['tailwindcss.svg'], aliases: ['Tailwind'] },
  { label: 'Bootstrap', icons: ['bootstrap.svg'] },
  { label: 'Laravel', icons: ['laravel.svg'] },
  { label: 'Node.js', icons: ['nodejs.svg'], aliases: ['NodeJS', 'Node'] },
  { label: '.NET', icons: ['dotnet.svg'], aliases: ['dotnet'] },
  { label: 'MySQL', icons: ['mysql.svg'] },
  { label: 'PostgreSQL', icons: ['postgresql.svg'], aliases: ['Postgres'] },
  { label: 'React Native', icons: ['react.svg'], aliases: ['React-Native', 'ReactNative'] },
  { label: 'Expo', icons: ['expo.svg'], aliases: ['Expo Go'] },
  { label: 'AWS', icons: ['aws.svg'], aliases: ['Amazon Web Services'] },
  { label: 'Microsoft Azure', icons: ['azure.svg'], aliases: ['Azure'] },
  { label: 'Google Cloud', icons: ['googlecloud.svg'], aliases: ['GCP'] },
  { label: 'Docker', icons: ['docker.svg'] },
  { label: 'Nginx', icons: ['nginx.svg'] },
  { label: 'Apache', icons: ['apache.svg'] },
  { label: 'Linux', icons: ['linux.svg'] },
  { label: 'GitHub', icons: ['github.svg'] },
  { label: 'n8n', icons: ['n8n.svg'] },
  { label: 'Tinkercad', icons: ['tinkercad.svg'] },
  { label: 'Onshape', icons: ['onshape.svg'] },
];

/** The tools named on the homepage. Each name must match a label above. */
export const homeStack: readonly string[] = ['Laravel', 'Vue', 'Bootstrap', 'MySQL', 'Node.js', 'n8n'];

/** The full tech stack on its own page, in display order. Each name must match a label above. */
export const toolkit: readonly ToolkitGroup[] = [
  { title: 'Languages', items: ['TypeScript', 'Python', 'Java', 'VB.NET'] },
  { title: 'Frontend', items: ['React', 'Vue', 'Next.js', 'Astro', 'Tailwind CSS'] },
  { title: 'Backend and databases', items: ['Laravel', 'Node.js', '.NET', 'MySQL', 'PostgreSQL'] },
  { title: 'Mobile', items: ['React Native', 'Expo'] },
  { title: 'Cloud and DevOps', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Nginx', 'Apache', 'Linux', 'GitHub'] },
  { title: 'Automation and 3D design', items: ['n8n', 'Tinkercad', 'Onshape'] },
];

const ignoredNames = new Set(['html', 'html5', 'css', 'css3', 'js', 'javascript']);
const byName = new Map<string, Technology>();

for (const technology of technologies) {
  for (const name of [technology.label, ...(technology.aliases ?? [])]) {
    byName.set(name.toLowerCase(), technology);
  }
}

/** Preserve the given order, omit basic web languages, and keep other names visible. */
export function visibleTechnologies(names: readonly string[]): Technology[] {
  const visible: Technology[] = [];
  const seen = new Set<string>();

  for (const name of names) {
    const label = name.trim();
    const key = label.toLowerCase();
    if (!label || ignoredNames.has(key)) continue;

    const technology = byName.get(key) ?? { label, icons: [] };
    const canonicalKey = technology.label.toLowerCase();
    if (seen.has(canonicalKey)) continue;

    seen.add(canonicalKey);
    visible.push(technology);
  }

  return visible;
}

export function technologyIconUrl(filename: string): string {
  return iconDirectory + filename;
}
