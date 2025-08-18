declare module 'front-matter' {
  interface FrontMatterResult<T = any> {
    attributes: T;
    body: string;
    bodyBegin: number;
    frontmatter?: string;
  }

  function frontMatter<T = any>(str: string): FrontMatterResult<T>;

  export = frontMatter;
}