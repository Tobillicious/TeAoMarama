# Te Kete Ako Utility Scripts

This directory contains scripts for maintaining and managing the Te Kete Ako project.

## `catalog.js`

### Purpose

The `catalog.js` script is a powerful tool for automatically scanning all the static HTML resources (handouts, games, etc.) in the project and generating a complete SQL seed file. This script is essential for keeping the `resources` database table in sync with the content on the site.

It performs the following actions:
1.  Scans the project for all relevant `.html` files.
2.  Parses each file to extract metadata like title and description.
3.  Intelligently infers additional metadata such as resource type, subject, year levels, and tags.
4.  Cross-references the content against curriculum data (`nzc.json` and `temataiaho.json`) to create links to achievement objectives.
5.  Generates a single, clean SQL file (`supabase/seed_data/insert_resources.sql`) containing `INSERT` statements for all 166+ resources.

### Usage

1.  **Navigate to the scripts directory:**
    ```bash
    cd scripts
    ```

2.  **Install dependencies (only needs to be done once):**
    ```bash
    npm install
    ```

3.  **Run the script:**
    ```bash
    npm run catalog
    ```

The script will overwrite the existing `insert_resources.sql` file with the latest data.
