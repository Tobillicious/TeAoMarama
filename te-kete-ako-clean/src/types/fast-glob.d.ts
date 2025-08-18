declare module 'fast-glob' {
  interface Options {
    cwd?: string;
    deep?: number;
    ignore?: string[];
    dot?: boolean;
    stats?: boolean;
    onlyFiles?: boolean;
    onlyDirectories?: boolean;
    followSymlinkedDirectories?: boolean;
    unique?: boolean;
    markDirectories?: boolean;
    absolute?: boolean;
    globstar?: boolean;
    expandDirectories?: boolean | string[];
    fs?: any;
    braceExpansion?: boolean;
    caseSensitiveMatch?: boolean;
    extglob?: boolean;
    suppressErrors?: boolean;
  }

  interface Entry {
    name: string;
    path: string;
    dirent: any;
    stats?: any;
  }

  function glob(patterns: string | string[], options?: Options): Promise<string[]>;
  function globSync(patterns: string | string[], options?: Options): string[];
  function globStream(patterns: string | string[], options?: Options): NodeJS.ReadableStream;

  namespace glob {
    export { globSync as sync, globStream as stream };
    export function generateTasks(patterns: string | string[], options?: Options): any[];
    export function isDynamicPattern(pattern: string, options?: Options): boolean;
    export function escapePath(path: string): string;
  }

  export = glob;
}