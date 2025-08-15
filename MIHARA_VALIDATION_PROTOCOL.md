# Mihara Validation Protocol
*Ensuring Accuracy and Cultural Integrity for all AI-Generated Content*

## 1. Purpose

This protocol is a mandatory procedure for all AI agents operating within the Te Ao Mārama project. Its purpose is to prevent the generation and propagation of "hallucinated" content, which includes factual inaccuracies, misinterpretations of cultural knowledge, and any information that is not verifiable.

The ultimate goal is to ensure that every educational resource is accurate, authentic, and culturally safe for the tamariki of Aotearoa.

## 2. Core Principles

-   **Source Before Creating**: All factual claims, statistics, historical accounts, and cultural concepts must be based on verifiable sources. If a source is not available, the content cannot be created.
-   **When in Doubt, Flag**: It is always better to flag content for human review than to risk inaccuracy. There is zero tolerance for guessing or invention.
-   **Human Expertise is Final**: The specialized Kaitiaki team holds the final authority on content accuracy and cultural appropriateness. No AI-generated content is considered "approved" until it has passed this human review.
-   **Transparency is Key**: All sources and review processes must be documented clearly in the `REVIEW_LOG.md`.

## 3. The Validation Procedure

All AI-generated educational content must pass through the following stages:

### Stage 1: Generation & Self-Annotation

1.  **Generate Content**: The agent creates the educational resource based on its assigned task.
2.  **Annotate Sources**: The agent MUST add comments or footnotes directly within the markdown file, citing the source for any specific data, quotes, or factual information.
    -   *Example*: `<!-- Source: Statistics NZ 2023 Census (Simplified for educational use) -->`
3.  **Flag Cultural Content**: The agent MUST add a `CULTURAL CONTENT FLAG` notice to any resource that touches upon Te Ao Māori, tikanga, Te Reo, or other cultural concepts.
    -   *Example*: `🚩 CULTURAL CONTENT FLAG: This resource includes the concept of whakapapa and requires review by a cultural expert.`

### Stage 2: Formal Logging for Review

1.  **Create Log Entry**: Immediately after creating a resource, the agent must add a new entry to the `/migration/cultural_review/REVIEW_LOG.md` file.
2.  **Assign Kaitiaki**: The agent must assign a primary reviewer from the `KAITIAKI_TEAM_ROSTER.md`, choosing the Kaitiaki whose specialization best matches the content.

### Stage 3: Human Verification

1.  **Kaitiaki Review**: The assigned human Kaitiaki will review the content against the cited sources and their own expert knowledge.
2.  **Provide Feedback**: The Kaitiaki will assess the content for:
    -   Factual Accuracy
    -   Cultural Authenticity & Safety
    -   Pedagogical Soundness
3.  **Update Log**: The Kaitiaki will update the `REVIEW_LOG.md` entry with the status:
    -   `✅ Approved`
    -   `🟠 Needs Revision` (with specific feedback)
    -   `❌ Rejected` (with explanation)

### Stage 4: Finalization

1.  **Revision (if necessary)**: If the status is `🟠 Needs Revision`, the task is returned to an AI agent to perform the required changes. The content then re-enters the review loop at Stage 2.
2.  **Archiving**: Approved content is considered finalized and ready for the next stage of integration. Rejected content is archived for analysis.

---

**This protocol is non-negotiable. Adherence to this process is the primary measure of an agent's performance and trustworthiness within the Mihara ecosystem.**
