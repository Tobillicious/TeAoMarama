import fs from 'fs/promises';
import path from 'path';

// This is a placeholder for the actual tool call.
// In a real environment, you would import and use the 'replace' tool.
async function replace(filePath: string, oldString: string, newString: string) {
  console.log(`Replacing content in ${filePath}`);
  const content = await fs.readFile(filePath, 'utf-8');
  const updatedContent = content.replace(oldString, newString);
  await fs.writeFile(filePath, updatedContent);
  console.log(`Successfully updated ${filePath}`);
}


async function migrateResource(filePath: string) {
  const filename = path.basename(filePath);
  const category = getCategoryFromFilename(filename);

  const oldContent = await fs.readFile(filePath, 'utf-8');
  let newContent = '';

  switch (category) {
    case 'Close Reading':
      newContent = generateCloseReadingContent();
      break;
    case 'Narrative Writing':
      newContent = generateNarrativeWritingContent();
      break;
    default:
      console.log(`Skipping ${filename} - no template for category: ${category}`);
      return;
  }

  // The 'old_string' in a real scenario would need to be the exact content
  // of the template part of the file. For this example, we'll replace the whole file content.
  await replace(filePath, oldContent, newContent);
}

function getCategoryFromFilename(filename: string): string | null {
    if (filename.includes('Close_Reading')) {
        return 'Close Reading';
    }
    if (filename.includes('Narrative_Writing')) {
        return 'Narrative Writing';
    }
    if (filename.includes('Poetry')) {
        return 'Poetry';
    }
    if (filename.includes('Formal_Writing')) {
        return 'Formal Writing';
    }
    return null;
}

function generateCloseReadingContent(): string {
    // In a real scenario, this would generate dynamic content.
    // For now, it returns a static template.
    return `# English Y7 - Close Reading in Aotearoa
*Te Kura o TeAoMarama - English*

**Year Level**: 7
**Subject**: English  
**Duration**: 45 minutes
**NZ Curriculum**: Language & Literature

**Cultural Context**: None
**Te Reo Integration**: greetings, whakataukī references
**Tikanga Connection**: respectful classroom protocols

---

## 🎯 Learning Intentions

**WALT** (We Are Learning To):
- Analyse a poem by a significant New Zealand writer.
- Identify and explain the use of personification and imagery.

**WALA** (We Are Learning About):
- The poem "Sea Song" by Katherine Mansfield.
- How poets use literary devices to explore themes of memory.

**Success Criteria**:
- [ ] I can explain the main ideas and mood of "Sea Song".
- [ ] I can identify examples of personification and imagery in the poem.
- [ ] I can discuss how the poem connects the sea to the theme of memory.

---

## 📚 Learning Content

### Context
This resource explores close reading through the poem "Sea Song" by the famous New Zealand writer Katherine Mansfield (1888-1923). The poem uses the sea as a powerful symbol to explore ideas about memory and the past.

**Sea Song**
By Katherine Mansfield

I will think no more of the sea!
Of the big green waves
And the hollowed shore,
Of the brown rock caves
No more, no more
Of the swell and the weed
And the bubbling foam.
Memory dwells in my far away home,
She has nothing to do with me.
She is old and bent
With a pack
On her back.
Her tears all spent,
Her voice, just a crack.
With an old thorn stick
She searches for something,
Her withered claw
Tumbles the seaweed.
She is so old, she is so old,
I have forgotten her name.

### Worked Example
Let's do a close reading of these lines:

> Memory dwells in my far away home,
> She has nothing to do with me.
> She is old and bent
> With a pack
> On her back.

1.  **Identify the technique**: The poet writes about "Memory" as if it is a person. This is called **personification**.
2.  **Analyse the description**: Memory is described as "old and bent" with a "pack on her back". This creates an image of a weary old woman, burdened by the things she carries.
3.  **Interpret the meaning**: This suggests that for the speaker, memory is not a happy thing. It is a heavy burden that has become old and tired. The speaker tries to distance themselves from it by saying "She has nothing to do with me."

### Practice
Read the rest of the poem and think about these questions:
- What other words does the poet use to describe Memory?
- What is Memory doing on the shore?
- Why do you think the speaker has "forgotten her name"?

---

## 🏃‍♀️ Activities

### Activity 1: Classroom Investigation
**Instructions**: In pairs, analyse the first stanza (the first 7 lines).
1.  List all the words the speaker uses to describe the sea.
2.  What kind of mood or feeling do these words create? (e.g., peaceful, wild, dangerous)
3.  The speaker says "I will think no more of the sea!". Do you think they will be successful? Why or why not?
**Extension**: Re-write the first stanza from the perspective of someone who has happy memories of the sea.

### Activity 2: Local Connection
**Instructions**: Think about a place in your local area that holds strong memories for you (e.g., a beach, a park, a marae, a grandparent's house).
- Write a short paragraph describing the place.
- Then, write a few lines of poetry personifying the memory of that place. For example: "The memory of the park is a child, always wanting to play on the swings."
**Success criteria**: Your writing is descriptive and uses personification effectively.

---

## 🤔 Reflection & Assessment

**Exit Ticket**:
1. What is one example of personification or imagery you found in "Sea Song"?
2. How does Katherine Mansfield connect the sea and memory in this poem?
3. What is one question you still have about the poem?

---

*Template compliance: ✅ | Cultural safety review: Required*
`;
}

function generateNarrativeWritingContent(): string {
    // In a real scenario, this would generate dynamic content.
    // For now, it returns a static template.
    return `# English Y7 - Narrative Writing in Aotearoa
*Te Kura o TeAoMarama - English*

**Year Level**: 7
**Subject**: English  
**Duration**: 45 minutes
**NZ Curriculum**: Language & Literature

**Cultural Context**: None
**Te Reo Integration**: greetings, whakataukī references
**Tikanga Connection**: respectful classroom protocols

---

## 🎯 Learning Intentions

**WALT** (We Are Learning To):
- Develop a compelling character for a narrative.
- Use descriptive language to show a character's personality.

**WALA** (We Are Learning About):
- The key elements of character creation (appearance, actions, dialogue).
- How to create a character sketch.

**Success Criteria**:
- [ ] I can describe a character's appearance and personality.
- [ ] I can write a short piece of dialogue that reveals character.
- [ ] I can create a character sketch for a story set in New Zealand.

---

## 📚 Learning Content

### Context
This resource helps you create interesting and believable characters for your stories. A good story needs a character that the reader can connect with, and we'll learn how to build one from the ground up, using examples from Aotearoa.

### Worked Example
Let's create a character sketch for a young person living in a small town in the South Island.

**Name**: Maia
**Age**: 12
**Appearance**:
- Messy brown hair, always tied back in a ponytail.
- Wears a faded Swanndri over her school uniform, even when it's not cold.
- Gumboots are her favourite shoes, usually muddy.

**Actions/Personality**:
- Spends her weekends exploring the bush behind her house.
- Is quiet in class, but can talk for hours about native birds.
- She's fiercely loyal to her friends and family.

**Dialogue**:
> "You reckon? Nah, that's not a kererū, the wings sound different. Too fast. It's just a regular old pigeon. Let's go deeper, the good birds are further in."

This sketch gives us a good starting point for a story. We know what Maia looks like, what she loves to do, and how she speaks.

### Practice
Now you try. Think of a character who might live in your town. What are they like?
- What do they wear?
- What do they do in their spare time?
- What is something they might say?

---

## 🏃‍♀️ Activities

### Activity 1: Character Profile
**Instructions**: In pairs, create a character profile for a new character. Use the following headings:
- Name and Age
- Appearance (3 details)
- Personality (3 details)
- A short piece of dialogue
**Materials**: Chromebooks or paper.
**Extension**: Swap your character profile with another pair. Write a short paragraph where your two characters meet for the first time.

### Activity 2: Local Connection
**Instructions**: Think about a person you have seen in your local community (e.g., a shopkeeper, a bus driver, a sports coach). You are not going to describe the real person, but use them as inspiration to create a fictional character.
- What is their job?
- What is their personality like? (e.g., friendly, grumpy, funny)
- Write a short description of your character at their place of work.
**Success criteria**: Your description is respectful and creates a vivid picture of the character.

---

## 🤔 Reflection & Assessment

**Exit Ticket**:
1. What are the three key elements of character creation we learned about today?
2. What is one thing you found easy about creating a character?
3. What is one thing you found challenging?

---

*Template compliance: ✅ | Cultural safety review: Required*
`;
}

async function main() {
  const directoryPath = process.argv[2];
  if (!directoryPath) {
    console.error('Please provide a directory path.');
    process.exit(1);
  }

  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    await migrateResource(filePath);
  }
}

main().catch(console.error);
