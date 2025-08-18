
document.addEventListener('DOMContentLoaded', async () => {
    const resourceGrid = document.querySelector('.resource-grid');
    const { createClient } = supabase;
    const supabaseClient = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

    async function loadGames() {
        if (!resourceGrid) return;

        try {
            const { data, error } = await supabaseClient.rpc('get_resources_by_type', { resource_type: 'game' });

            if (error) {
                console.error('Error fetching games:', error);
                resourceGrid.textContent = '<p class="error-message">Could not load games. Please try again later.</p>';
                return;
            }

            if (data.length === 0) {
                resourceGrid.textContent = '<p>No games found. Check back soon!</p>';
                return;
            }

            // Clear existing static content
            resourceGrid.textContent = '';

            data.forEach(game => {
                const card = document.createElement('a');
                card.href = game.path;
                card.className = 'resource-card';
                card.setAttribute('data-subject', game.subject.toLowerCase().replace(' ', '-'));
                card.setAttribute('data-type', 'interactive'); // Assuming all are interactive for now
                card.setAttribute('data-duration', getDurationCategory(game.estimated_duration_minutes));

                card.textContent = `
                    <h3 class="resource-card-title">${game.title}</h3>
                    <p class="resource-card-description">${game.description}</p>
                    <div class="resource-card-meta">
                        <span class="resource-tag" style="background: var(--color-primary); color: white;">${game.subject}</span>
                        <span class="resource-tag">${game.level}</span>
                        <span class="resource-tag">${game.estimated_duration_minutes} min</span>
                    </div>
                `;
                resourceGrid.appendChild(card);
            });

        } catch (err) {
            console.error('An unexpected error occurred:', err);
            resourceGrid.textContent = '<p class="error-message">An unexpected error occurred while loading games.</p>';
        }
    }

    function getDurationCategory(minutes) {
        if (minutes <= 10) return 'quick';
        if (minutes <= 30) return 'standard';
        return 'extended';
    }

    loadGames();
});
