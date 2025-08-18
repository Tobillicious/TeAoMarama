// homepage.js
// Dynamic homepage functionality for Te Kete Ako

/**
 * Fetches the 3 most recently added resources from the database and renders them.
 */
async function loadFeaturedResources() {
  const container = document.getElementById('featured-resources-grid');
  
  if (!container) {
    console.log('Featured resources container not found on this page');
    return;
  }

  try {
    // Attempt to fetch the list of resources from the unified table
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    // Clear the container and render the cards if we have data
    container.innerHTML = '';
    if (resources && resources.length > 0) {
      resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
          <a href="${resource.path}" class="card-link">View Resource</a>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = '<p>No new resources found. Check back soon!</p>';
    }

  } catch (err) {
    console.error("Failed to load featured resources:", err);
    // Fallback to static content
    container.innerHTML = `
      <div class="card">
        <h3>Y8 Systems Unit (Gold Standard)</h3>
        <p>Complete 5-week social studies unit exploring how systems shape our lives</p>
        <a href="y8-systems-unit.html" class="card-link">View Resource</a>
      </div>
      <div class="card">
        <h3>Te Reo Māori Wordle</h3>
        <p>Interactive game to practice te reo Māori vocabulary</p>
        <a href="games/te-reo-wordle.html" class="card-link">Play Game</a>
      </div>
      <div class="card">
        <h3>PEEL Method Toolkit</h3>
        <p>Master the art of structuring powerful, persuasive paragraphs</p>
        <a href="handouts/writers-toolkit-peel-argument-handout.html" class="card-link">View Handout</a>
      </div>
    `;
  }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', loadFeaturedResources);