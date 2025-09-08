# Specification: Lesson Enrichment Automation Script

**Prepared by:** Aronui, Lead Overseer
**For:** Cursor, Lead Technical Implementer

**Version:** 1.0
**Date:** 2025-09-08

---

## 1. Objective

To create a script that automates the enrichment of all lesson skeleton JSON files located in `/src/content/lessons/`. The script will systematically transform each generic lesson file into a high-quality, culturally-responsive, and pedagogically-rich resource, following the standard established in the pilot lesson (`lesson-1755683030316-kqepwjlxz.json`).

---

## 2. Core Logic & Requirements

The script should be designed to be robust, scalable, and restartable.

### Input:
- The script will target all `.json` files within `/src/content/lessons/`, excluding `index.json`.

### Process Flow:

1.  **Identify Target Files:** The script must first scan the directory and create a list of all lesson files that have not yet been enriched. (Hint: The enriched pilot lesson contains an `"enrichedAt"` timestamp; unenriched files will not have this key).

2.  **Iterate and Process:** For each target file, the script will perform the following steps:
    a.  **Read & Parse:** Read the raw JSON content of the lesson skeleton.
    b.  **Extract Key Data:** Extract the essential fields: `subject`, `yearLevel`, and `title`.
    c.  **Generate LLM Prompt:** Dynamically construct a detailed, role-based prompt for a large language model. This is the core of the "teaching" intelligence. The prompt must instruct the LLM to act as a specific specialist agent based on the lesson's subject. (See Section 3: Prompt Architecture).
    d.  **Execute LLM Call:** Send the generated prompt to a powerful LLM endpoint to generate the enriched lesson content.
    e.  **Validate Response:** Upon receiving the response, validate that it is well-formed JSON and contains the necessary fields of the enriched schema (e.g., `activities` as an array of objects, `assessment` as an object). If validation fails, log the error and skip to the next file.
    f.  **Overwrite File:** Replace the content of the original lesson file with the new, validated, enriched JSON.
    g.  **Update Status:** After each successful enrichment, the script must update the progress counters in `/src/content/ENRICHMENT_STATUS_REPORT.md`. This should be an atomic operation to prevent data corruption.

### Error Handling:
- The script must be resilient to LLM API errors (e.g., rate limiting, server errors). It should implement a retry mechanism with exponential backoff.
- Invalid JSON responses from the LLM must be logged, and the corresponding file should be skipped.
- A log file should be created (`enrichment_log.txt`) to record successes, failures, and any errors encountered.

---

## 3. Prompt Architecture (The "Aronui" Intelligence)

This is the most critical component. The script will use the following template to generate a prompt for the LLM. This ensures the generated content meets our high pedagogical and cultural standards.

**Prompt Template:**

```
You are {AGENT_ROLE}, a world-class curriculum designer and subject matter expert for Mangakōtukutuku College in New Zealand. Your task is to enrich a skeleton lesson plan into a deep, culturally-responsive, and engaging learning experience.

**Your Persona ({AGENT_ROLE}):**
- You have profound pedagogical content knowledge (PCK).
- You are an expert in the New Zealand Curriculum (NZC).
- You specialize in creating content that is deeply connected to the local culture and environment of Ngāti Kahungunu.
- You will follow the high-quality example set by the enriched lesson on "Te Awa o Mangakōtukutuku".

**Lesson Skeleton Details:**
- **Subject:** {SUBJECT}
- **Year Level:** {YEAR_LEVEL}
- **Original Title:** {TITLE}

**Your Task:**
Rewrite the provided JSON lesson skeleton. The new JSON must be a complete, valid JSON object and nothing else.

1.  **`title`:** Create a new, evocative title in both English and Te Reo Māori that reflects the lesson's new, specific focus.
2.  **`culturalContext`:** Make the context highly specific to Mangakōtukutuku College. Connect it to a local landmark, story, person, or environmental feature.
3.  **`learningObjectives`:** Write 3-4 specific, measurable, and achievable learning objectives.
4.  **`activities`:** Design a sequence of 4-5 detailed activities. Each activity must be an object with a `title` and a `description`. The activities should be practical, engaging, and culturally relevant.
5.  **`resources`:** List at least 4 specific, real-world resources (e.g., local experts, websites, specific books, tools).
6.  **`assessment`:** Describe a meaningful assessment task (summative or formative). This should be an object with `type` and `tasks` keys.
7.  **`nzcAlignment`:** List specific, relevant strands and achievement objectives from the New Zealand Curriculum.
8.  **Add Metadata:** Include `"enrichedAt": "{CURRENT_ISO_TIMESTAMP}"` and `"enrichedBy": "Aronui_{AGENT_ROLE_SHORTNAME}"`.

**Output Format:**
You must respond with ONLY the raw, valid JSON object for the enriched lesson. Do not include any explanatory text, markdown formatting, or anything else outside of the JSON structure.

**Original JSON Skeleton to Enrich:**
{ORIGINAL_JSON_CONTENT}
```

**Example Agent Roles:**
- If `subject` is "Mathematics", `AGENT_ROLE` is `Pāngarau_Kaitiaki`.
- If `subject` is "Science", `AGENT_ROLE` is `Pūtaiao_Kaitiaki`.
- ...and so on, as defined in `ARONUI_AGENT_HIRING_PROTOCOL.md`.

---

## 4. Recommended Technology

- **Language:** Node.js (preferred due to its asynchronous nature and strong JSON support) or Python.
- **Libraries:**
    - A robust library for making HTTP requests to the LLM API (e.g., `axios` for Node.js, `requests` for Python).
    - A library for file system operations.

This specification provides the educational and logical framework. I trust you, Cursor, to handle the technical implementation with your superior coding expertise. Let us begin.
