# Codebase Breadcrumbs

This document tracks the investigation into restoring and enriching the teaching content for the Mangakōtukutuku College project.

## Initial Analysis (2025-08-30)

### File Structure Overview

Based on the initial directory listing, the following folders are of high interest:

- **`src`**: Likely contains the main application source code, including React components and business logic. This is a primary area for investigation.
- **`database`**: May hold database schemas, migrations, or seed data. Understanding the data model is crucial.
- **`docs`**: Could provide documentation on the project's architecture and content management workflows.
- **`migrated-content` / `migration`**: These folders strongly suggest a content migration has occurred. This is a potential source of the content loss and a key area to investigate. The "overhead reason" for the failure might be related to a faulty or incomplete migration process.
- **`real-resources`**: The name suggests this directory might contain the actual, unprocessed educational resource files (e.g., markdown, PDFs, images). This could be a goldmine for content restoration.
- **`scripts`**: Might contain automation scripts for content processing, deployment, or data management. These could reveal how content is supposed to be handled.
- **`supabase`**: Indicates the use of Supabase for the backend. This is likely where the structured teaching content (e.g., lesson metadata, student progress) is stored. I'll need to investigate the Supabase schema and data.

### Next Steps

1. **Analyze `package.json`**: To understand the project's dependencies (e.g., React, UI libraries, data fetching libraries) and available scripts (e.g., `dev`, `build`, `test`). This will provide a clear picture of the technology stack.
2. **Explore the `src` directory**: To understand the component structure and how educational content is rendered.
3. **Investigate the `migration` and `real-resources` directories**: To trace the path of the content and identify potential points of failure.
4. **Examine the `database` and `supabase` directories**: To understand the data models for educational content.

## `package.json` Analysis (2025-08-30)

The `package.json` file reveals a modern tech stack and provides critical clues about the content pipeline.

### Key Dependencies:

- **Frontend**: React, Vite, Tailwind CSS. This is a standard, modern web stack.
- **Backend/Data**: `@supabase/supabase-js` is a key dependency, confirming the use of Supabase. `pg` (PostgreSQL) and `weaviate-client` suggest direct database interaction and vector search capabilities, likely for advanced content retrieval.
- **Content Processing**: `marked` and `sanitize-html` indicate that content is likely authored in Markdown and then processed for safe rendering in the application.
- **Tooling**: `tsx` and `ts-node` are used for running TypeScript scripts, which is how the project's automation is handled. `playwright` is used for end-to-end testing, which will be valuable for verifying fixes.

### Key Scripts & Hypotheses:

- **`build: "tsx scripts/build-resources.ts && vite build"`**: This is the most significant finding. A script, `scripts/build-resources.ts`, is executed *before* the application is built.
  - **Hypothesis**: This script is the core of the content pipeline. It likely reads raw content from a source directory (e.g., `real-resources`), processes it (e.g., converts Markdown to HTML, extracts metadata), and places it in a location accessible to the Vite build process (e.g., the `public` or `src` directory). **The root cause of the content loss is very likely within this script or its dependencies.**
- **Migration & Agent Scripts (`mig:*`, `mihara:*`, `agents:*`)**: The large number of these scripts points to a complex, automated system for managing and migrating content.
  - **Hypothesis**: The "overhead reason" for the failure is likely a bug or misconfiguration in this agentic migration system. The system might be too complex, poorly documented, or have a critical flaw that leads to data corruption or deletion. The "cursor" being killed could be one of these agents failing.
- **`import:te-kete`**: Suggests that content is also imported from an external source, adding another layer to the content pipeline.
- **`gen:resources`**: The ability to generate bulk resources will be useful for testing the content pipeline once I have a better understanding of it.

### Next Steps

1. **Examine `scripts/build-resources.ts`**: This is the top priority. Understanding this script is key to solving the mystery of the lost content.
2. **List the contents of the `scripts` and `migration` directories**: To get a full picture of the automation landscape.
3. **Explore the `src` directory**: To see how the processed content is consumed by the frontend components.
4. **Investigate the `real-resources` directory**: To find the original, unprocessed source of the teaching materials.

## `scripts/build-resources.ts` Analysis (2025-08-30)

This script is the heart of the content indexing pipeline and a likely source of the problem.

### How it Works:

1. **Scans Directories**: It reads the contents of three directories: `public/resources`, `migration/recovered_resources`, and `real-resources`.
2. **Generates Metadata**: For each file found, it extracts metadata (ID, title, category) based on the filename. It does **not** read the file's content.
3. **Creates an Index**: It compiles all the metadata into a single `index.json` file located in `public/resources`. This file acts as the manifest that the application uses to find and display educational resources.
4. **Overwrites Existing Index**: The script overwrites the `index.json` file every time it runs.

### Critical Flaws & Hypotheses:

- **Silent Error Handling**: The script uses empty `try...catch` blocks (`/* Borg Collective: Empty block assimilated */`). If any of the scanned directories are missing or if there's a file system error, the script will fail silently and likely generate an incomplete or empty `index.json`. **This is a major red flag and a probable cause of the "disappearing" content.**
- **Dependency on Upstream Processes**: The script's success is entirely dependent on the resource directories (`public/resources`, `migration/recovered_resources`, `real-resources`) being correctly populated *before* it runs.
- **Overwriting Behavior**: Because the script overwrites the index, a failure in an upstream process (like an agent failing to copy files) will cause the script to generate a new, incomplete index, effectively wiping out the valid content from the application's perspective.

### Core Hypothesis:

The "overhead reason" for the content loss is a **brittle and non-resilient content pipeline**. Automated agents (the "cursors") are likely responsible for populating the resource directories. If these agents fail, are interrupted, or run into errors, the directories are left in an incomplete state. The `build-resources.ts` script then runs, sees the incomplete state, and silently generates a faulty `index.json`, which causes the user-facing content to disappear. The problem isn't that the content is being deleted, but rather that the index that points to it is being corrupted due to silent failures in the pipeline.

### Next Steps:

1. **List contents of `scripts` and `migration` directories**: To understand the full pipeline and identify the agent scripts responsible for populating the resource directories.
2. **Inspect the resource directories**: Check the current state of `public/resources`, `migration/recovered_resources`, and `real-resources` to see if they are populated correctly.
3. **Propose a fix**: The fix will likely involve adding robust error handling to `build-resources.ts` and potentially adding checks to ensure the resource directories are valid before generating the index.
