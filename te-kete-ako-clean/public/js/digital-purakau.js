document.addEventListener('DOMContentLoaded', function() {
    const storyGrid = document.getElementById('story-selection-grid');
    const modal = document.getElementById('story-modal');
    const closeModal = document.querySelector('.close-button');
    let stories = [];

    // Fetch story data
    fetch('data/digital-purakau.json')
        .then(response => response.json())
        .then(data => {
            stories = data;
            displayStories(stories);
        });

    function displayStories(stories) {
        storyGrid.textContent = '';
        stories.forEach(story => {
            const card = document.createElement('div');
            card.className = 'story-card';
            card.dataset.storyId = story.id;
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Select interactive story: ${story.title_english}`);

            let metaTags = '';
            story.tags.forEach((tag, index) => {
                metaTags += `<span class="meta-tag">${story.icons[index]} ${tag}</span>`;
            });

            card.textContent = `
                <div class="story-title-te-reo">${story.title_te_reo}</div>
                <div class="story-title">${story.title_english}</div>
                <div class="story-preview">${story.preview}</div>
                <div class="story-meta">${metaTags}</div>
                <div class="story-progress">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(story));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(story);
                }
            });

            storyGrid.appendChild(card);
        });
    }

    function openModal(story) {
        document.getElementById('modal-title').textContent = story.title_english;
        document.getElementById('modal-title-te-reo').textContent = story.title_te_reo;
        document.getElementById('modal-preview').textContent = story.preview;
        
        const metaContainer = document.getElementById('modal-meta');
        metaContainer.textContent = '';
        story.tags.forEach((tag, index) => {
            const metaTag = document.createElement('span');
            metaTag.className = 'meta-tag';
            metaTag.textContent = `${story.icons[index]} ${tag}`;
            metaContainer.appendChild(metaTag);
        });

        modal.style.display = 'flex';
    }

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});