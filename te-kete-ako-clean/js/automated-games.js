// Te Kete Ako - Automated Educational Games Generator
// Create crosswords, word searches, and puzzles from lesson content

class AutomatedGamesGenerator {
    constructor() {
        this.gameTypes = ['wordsearch', 'crossword', 'matching', 'quiz'];
        this.vocabulary = new Map();
        this.culturalTerms = this.loadCulturalTerms();
        this.init();
    }

    init() {
        this.createGameGeneratorUI();
        this.extractVocabularyFromPage();
        this.bindEvents();
        console.log('🎮 Automated Games Generator ready!');
    }

    loadCulturalTerms() {
        return {
            'māori': { definition: 'Indigenous people of New Zealand', difficulty: 'easy' },
            'whakapapa': { definition: 'Genealogy, relationships, connections', difficulty: 'medium' },
            'kaitiakitanga': { definition: 'Guardianship, environmental stewardship', difficulty: 'hard' },
            'manaakitanga': { definition: 'Hospitality, care, respect for others', difficulty: 'medium' },
            'rangatiratanga': { definition: 'Chieftainship, leadership, sovereignty', difficulty: 'hard' },
            'whanaungatanga': { definition: 'Relationships, kinship, community', difficulty: 'medium' },
            'aroha': { definition: 'Love, compassion, empathy', difficulty: 'easy' },
            'mauri': { definition: 'Life force, vital essence', difficulty: 'medium' },
            'taonga': { definition: 'Treasures, valued possessions', difficulty: 'easy' },
            'tikanga': { definition: 'Customs, practices, traditions', difficulty: 'medium' }
        };
    }

    createGameGeneratorUI() {
        // Floating game generator button
        const gameBtn = document.createElement('button');
        gameBtn.id = 'game-generator-btn';
        gameBtn.innerHTML = '🎮';
        gameBtn.title = 'Game Generator - Kēmu Hua';
        gameBtn.style.cssText = `
            position: fixed;
            bottom: 180px;
            left: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
            transition: all 0.3s ease;
            z-index: 1001;
        `;

        // Game generator modal
        const gameModal = document.createElement('div');
        gameModal.id = 'game-generator-modal';
        gameModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
        `;

        const gameContent = document.createElement('div');
        gameContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        `;

        gameContent.innerHTML = this.createGameGeneratorHTML();
        gameModal.appendChild(gameContent);
        document.body.appendChild(gameBtn);
        document.body.appendChild(gameModal);

        // Event listeners
        gameBtn.addEventListener('click', () => this.openGameGenerator());
        gameModal.addEventListener('click', (e) => {
            if (e.target === gameModal) this.closeGameGenerator();
        });

        this.bindGameEvents();
    }

    createGameGeneratorHTML() {
        return `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
                <h2 style="color: #f59e0b; margin: 0; font-size: 2rem;">🎮 Game Generator</h2>
                <p style="color: #6b7280; margin: 10px 0 0 0;">Kēmu Hua - Create educational games from your content</p>
                <button id="close-game-generator" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">❌</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <button class="game-type-btn" data-type="wordsearch" style="padding: 20px; border: 2px solid #e5e7eb; border-radius: 12px; background: white; cursor: pointer; text-align: center; transition: all 0.3s ease;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                    <div style="font-weight: bold;">Word Search</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">Rapu Kupu</div>
                </button>
                
                <button class="game-type-btn" data-type="crossword" style="padding: 20px; border: 2px solid #e5e7eb; border-radius: 12px; background: white; cursor: pointer; text-align: center; transition: all 0.3s ease;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📝</div>
                    <div style="font-weight: bold;">Crossword</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">Kupu Tōmua</div>
                </button>
                
                <button class="game-type-btn" data-type="matching" style="padding: 20px; border: 2px solid #e5e7eb; border-radius: 12px; background: white; cursor: pointer; text-align: center; transition: all 0.3s ease;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔗</div>
                    <div style="font-weight: bold;">Matching</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">Hāngai</div>
                </button>
                
                <button class="game-type-btn" data-type="quiz" style="padding: 20px; border: 2px solid #e5e7eb; border-radius: 12px; background: white; cursor: pointer; text-align: center; transition: all 0.3s ease;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">❓</div>
                    <div style="font-weight: bold;">Quiz</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">Pātai</div>
                </button>
            </div>

            <div id="game-configuration" style="display: none;">
                <h3 style="color: #f59e0b; margin-bottom: 20px;">Game Configuration</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Game Title</label>
                        <input type="text" id="game-title" placeholder="Enter game title..." style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Difficulty Level</label>
                        <select id="game-difficulty" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="easy">Easy (Māmā)</option>
                            <option value="medium" selected>Medium (Waenga)</option>
                            <option value="hard">Hard (Uaua)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h4>Content Source</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="radio" name="content-source" value="current-page" checked>
                            Current Page Content
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="radio" name="content-source" value="cultural-terms">
                            Cultural Terms (Māori)
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="radio" name="content-source" value="custom">
                            Custom Words
                        </label>
                    </div>
                    
                    <div id="custom-words-section" style="display: none;">
                        <textarea id="custom-words" placeholder="Enter words/terms separated by commas..." style="width: 100%; height: 100px; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical;"></textarea>
                    </div>
                </div>

                <div id="vocabulary-preview" style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px 0;">Detected Vocabulary</h4>
                    <div id="vocabulary-list" style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <!-- Vocabulary terms will be populated here -->
                    </div>
                </div>

                <div style="text-align: center;">
                    <button id="generate-game" style="background: #f59e0b; color: white; border: none; border-radius: 12px; padding: 15px 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-right: 10px;">
                        🎮 Generate Game
                    </button>
                    <button id="preview-game" style="background: #6b7280; color: white; border: none; border-radius: 12px; padding: 15px 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">
                        👀 Preview
                    </button>
                </div>
            </div>

            <div id="game-output" style="display: none; margin-top: 30px;">
                <h3 style="color: #f59e0b;">Generated Game</h3>
                <div id="game-content" style="background: #f8f9fa; border-radius: 12px; padding: 20px; min-height: 300px;">
                    <!-- Generated game will appear here -->
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button id="download-game" style="background: #10b981; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; margin-right: 10px;">
                        📥 Download HTML
                    </button>
                    <button id="print-game" style="background: #dc2626; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; margin-right: 10px;">
                        🖨️ Print Game
                    </button>
                    <button id="new-game" style="background: #7c3aed; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer;">
                        🔄 Create Another
                    </button>
                </div>
            </div>
        `;
    }

    bindGameEvents() {
        // Close button
        document.getElementById('close-game-generator')?.addEventListener('click', () => {
            this.closeGameGenerator();
        });

        // Game type selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.game-type-btn')) {
                this.selectGameType(e.target.closest('.game-type-btn').dataset.type);
            }
        });

        // Content source radio buttons
        document.addEventListener('change', (e) => {
            if (e.target.name === 'content-source') {
                this.updateContentSource(e.target.value);
            }
        });

        // Generate game button
        document.getElementById('generate-game')?.addEventListener('click', () => {
            this.generateGame();
        });

        // Preview button
        document.getElementById('preview-game')?.addEventListener('click', () => {
            this.previewGame();
        });

        // Download button
        document.getElementById('download-game')?.addEventListener('click', () => {
            this.downloadGame();
        });

        // Print button
        document.getElementById('print-game')?.addEventListener('click', () => {
            this.printGame();
        });

        // New game button
        document.getElementById('new-game')?.addEventListener('click', () => {
            this.resetGameGenerator();
        });
    }

    extractVocabularyFromPage() {
        const content = document.body.textContent.toLowerCase();
        const words = content.split(/\s+/)
            .filter(word => word.length > 3)
            .filter(word => /^[a-zA-ZāēīōūĀĒĪŌŪ]+$/.test(word)); // Include Māori characters

        // Count word frequency
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        // Get most common words (excluding common English words)
        const commonWords = ['the', 'and', 'this', 'that', 'with', 'from', 'they', 'have', 'been', 'were'];
        const importantWords = Object.entries(wordCount)
            .filter(([word]) => !commonWords.includes(word))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([word]) => word);

        this.vocabulary.set('page-content', importantWords);
    }

    openGameGenerator() {
        document.getElementById('game-generator-modal').style.display = 'flex';
        this.updateVocabularyPreview();
    }

    closeGameGenerator() {
        document.getElementById('game-generator-modal').style.display = 'none';
    }

    selectGameType(gameType) {
        // Highlight selected game type
        document.querySelectorAll('.game-type-btn').forEach(btn => {
            if (btn.dataset.type === gameType) {
                btn.style.borderColor = '#f59e0b';
                btn.style.background = '#fffbeb';
            } else {
                btn.style.borderColor = '#e5e7eb';
                btn.style.background = 'white';
            }
        });

        this.selectedGameType = gameType;
        document.getElementById('game-configuration').style.display = 'block';
        document.getElementById('game-title').value = `${gameType.charAt(0).toUpperCase() + gameType.slice(1)} Game`;
    }

    updateContentSource(source) {
        const customSection = document.getElementById('custom-words-section');
        if (source === 'custom') {
            customSection.style.display = 'block';
        } else {
            customSection.style.display = 'none';
        }
        this.updateVocabularyPreview();
    }

    updateVocabularyPreview() {
        const source = document.querySelector('input[name="content-source"]:checked')?.value || 'current-page';
        const vocabularyList = document.getElementById('vocabulary-list');
        
        let words = [];
        
        switch (source) {
            case 'current-page':
                words = this.vocabulary.get('page-content') || [];
                break;
            case 'cultural-terms':
                words = Object.keys(this.culturalTerms);
                break;
            case 'custom':
                const customText = document.getElementById('custom-words')?.value || '';
                words = customText.split(',').map(w => w.trim()).filter(w => w.length > 0);
                break;
        }

        vocabularyList.innerHTML = words.map(word => 
            `<span style="background: #e5e7eb; padding: 4px 8px; border-radius: 12px; font-size: 0.9rem;">${word}</span>`
        ).join('');
    }

    generateGame() {
        const gameType = this.selectedGameType;
        const title = document.getElementById('game-title').value || 'Educational Game';
        const difficulty = document.getElementById('game-difficulty').value;
        const source = document.querySelector('input[name="content-source"]:checked').value;

        let words = this.getWordsForGame(source, difficulty);
        
        if (words.length === 0) {
            alert('No words available for game generation. Please check your content source.');
            return;
        }

        const gameHTML = this.createGameHTML(gameType, title, words, difficulty);
        
        document.getElementById('game-content').innerHTML = gameHTML;
        document.getElementById('game-output').style.display = 'block';
        
        // Scroll to output
        document.getElementById('game-output').scrollIntoView({ behavior: 'smooth' });
    }

    getWordsForGame(source, difficulty) {
        let words = [];
        
        switch (source) {
            case 'current-page':
                words = this.vocabulary.get('page-content') || [];
                break;
            case 'cultural-terms':
                words = Object.entries(this.culturalTerms)
                    .filter(([word, data]) => difficulty === 'easy' || data.difficulty !== 'easy')
                    .map(([word]) => word);
                break;
            case 'custom':
                const customText = document.getElementById('custom-words').value || '';
                words = customText.split(',').map(w => w.trim()).filter(w => w.length > 0);
                break;
        }

        // Limit number of words based on game type
        const maxWords = {
            'wordsearch': 15,
            'crossword': 10,
            'matching': 8,
            'quiz': 10
        };

        return words.slice(0, maxWords[this.selectedGameType] || 10);
    }

    createGameHTML(gameType, title, words, difficulty) {
        switch (gameType) {
            case 'wordsearch':
                return this.createWordSearchHTML(title, words);
            case 'crossword':
                return this.createCrosswordHTML(title, words);
            case 'matching':
                return this.createMatchingHTML(title, words);
            case 'quiz':
                return this.createQuizHTML(title, words);
            default:
                return '<p>Game type not supported yet.</p>';
        }
    }

    createWordSearchHTML(title, words) {
        const grid = this.generateWordSearchGrid(words);
        
        return `
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #f59e0b; margin-bottom: 10px;">${title}</h2>
                <p style="color: #6b7280;">Find the hidden words in the grid below</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 250px; gap: 30px;">
                <div>
                    <div style="display: inline-block; border: 2px solid #374151; font-family: monospace; font-size: 1.2rem; line-height: 1.2;">
                        ${grid.map(row => 
                            `<div>${row.map(cell => 
                                `<span style="display: inline-block; width: 25px; height: 25px; text-align: center; border: 1px solid #d1d5db; background: white;">${cell}</span>`
                            ).join('')}</div>`
                        ).join('')}
                    </div>
                </div>
                
                <div>
                    <h3 style="margin: 0 0 15px 0; color: #374151;">Words to Find:</h3>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${words.map(word => 
                            `<div style="padding: 8px; background: #f3f4f6; border-radius: 6px; text-transform: uppercase;">${word}</div>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <strong>Instructions:</strong> Words can be hidden horizontally, vertically, or diagonally. Circle each word when you find it!
            </div>
        `;
    }

    generateWordSearchGrid(words) {
        const size = 15;
        const grid = Array(size).fill().map(() => Array(size).fill(''));
        
        // Place words randomly
        words.forEach(word => {
            this.placeWordInGrid(grid, word.toUpperCase(), size);
        });
        
        // Fill empty cells with random letters
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === '') {
                    grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }
        
        return grid;
    }

    placeWordInGrid(grid, word, size) {
        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal down-right
            [-1, 1]   // diagonal up-right
        ];
        
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 50) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * size);
            const startCol = Math.floor(Math.random() * size);
            
            if (this.canPlaceWord(grid, word, startRow, startCol, direction, size)) {
                this.placeWord(grid, word, startRow, startCol, direction);
                placed = true;
            }
            attempts++;
        }
    }

    canPlaceWord(grid, word, row, col, direction, size) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];
            
            if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
                return false;
            }
            
            if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    placeWord(grid, word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];
            grid[newRow][newCol] = word[i];
        }
    }

    createMatchingHTML(title, words) {
        const pairs = words.slice(0, 8).map(word => ({
            term: word,
            definition: this.culturalTerms[word]?.definition || `Definition for ${word}`
        }));
        
        const shuffledDefinitions = [...pairs.map(p => p.definition)].sort(() => Math.random() - 0.5);
        
        return `
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #f59e0b; margin-bottom: 10px;">${title}</h2>
                <p style="color: #6b7280;">Match each term with its correct definition</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <h3 style="margin: 0 0 15px 0; color: #374151;">Terms</h3>
                    ${pairs.map((pair, index) => 
                        `<div style="padding: 12px; margin: 8px 0; background: #e8f5e8; border: 2px solid #10b981; border-radius: 8px; font-weight: bold;">
                            ${index + 1}. ${pair.term}
                        </div>`
                    ).join('')}
                </div>
                
                <div>
                    <h3 style="margin: 0 0 15px 0; color: #374151;">Definitions</h3>
                    ${shuffledDefinitions.map((definition, index) => 
                        `<div style="padding: 12px; margin: 8px 0; background: #fffbeb; border: 2px solid #f59e0b; border-radius: 8px;">
                            ${String.fromCharCode(65 + index)}. ${definition}
                        </div>`
                    ).join('')}
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #f0f8f4; border-radius: 8px; border-left: 4px solid #10b981;">
                <strong>Instructions:</strong> Write the letter of each definition next to its matching term number.
            </div>
        `;
    }

    createQuizHTML(title, words) {
        const questions = words.slice(0, 10).map(word => {
            if (this.culturalTerms[word]) {
                return {
                    question: `What does "${word}" mean?`,
                    correct: this.culturalTerms[word].definition,
                    options: this.generateQuizOptions(this.culturalTerms[word].definition, word)
                };
            } else {
                return {
                    question: `Which category does "${word}" belong to?`,
                    correct: 'Educational term',
                    options: ['Educational term', 'Random word', 'Technical jargon', 'Informal language']
                };
            }
        });
        
        return `
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #f59e0b; margin-bottom: 10px;">${title}</h2>
                <p style="color: #6b7280;">Choose the best answer for each question</p>
            </div>
            
            ${questions.map((q, index) => 
                `<div style="margin-bottom: 25px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background: white;">
                    <h4 style="margin: 0 0 15px 0; color: #374151;">Question ${index + 1}: ${q.question}</h4>
                    ${q.options.map((option, optIndex) => 
                        `<label style="display: block; margin: 8px 0; cursor: pointer;">
                            <input type="radio" name="q${index}" value="${option}" style="margin-right: 10px;">
                            ${String.fromCharCode(65 + optIndex)}. ${option}
                        </label>`
                    ).join('')}
                </div>`
            ).join('')}
            
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="alert('Quiz checking would be implemented with JavaScript!')" style="background: #10b981; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer;">
                    ✅ Check Answers
                </button>
            </div>
        `;
    }

    generateQuizOptions(correctAnswer, word) {
        const wrongAnswers = [
            'A type of food',
            'A place in New Zealand',
            'A modern invention',
            'A weather pattern'
        ];
        
        const options = [correctAnswer, ...wrongAnswers.slice(0, 3)];
        return options.sort(() => Math.random() - 0.5);
    }

    downloadGame() {
        const gameContent = document.getElementById('game-content').innerHTML;
        const title = document.getElementById('game-title').value || 'Educational Game';
        
        const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} | Te Kete Ako</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; line-height: 1.6; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${gameContent}
            <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9rem;">
                Generated by Te Kete Ako Game Generator | 🌿 Educational Games for Aotearoa
            </footer>
        </body>
        </html>`;
        
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }

    printGame() {
        const gameContent = document.getElementById('game-content').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Game</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    @media print {
                        body { margin: 0; }
                        @page { margin: 1cm; }
                    }
                </style>
            </head>
            <body>${gameContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    resetGameGenerator() {
        document.getElementById('game-configuration').style.display = 'none';
        document.getElementById('game-output').style.display = 'none';
        document.querySelectorAll('.game-type-btn').forEach(btn => {
            btn.style.borderColor = '#e5e7eb';
            btn.style.background = 'white';
        });
        this.selectedGameType = null;
    }

    bindEvents() {
        // Keyboard shortcut: Ctrl/Cmd + Shift + G for game generator
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
                e.preventDefault();
                this.openGameGenerator();
            }
        });

        // Add vocabulary terms on input change
        document.addEventListener('input', (e) => {
            if (e.target.id === 'custom-words') {
                this.updateVocabularyPreview();
            }
        });
    }
}

// Initialize Games Generator when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AutomatedGamesGenerator());
} else {
    new AutomatedGamesGenerator();
}