``javascript
// FILE: js/script.js
// This file contains the interactivity and logic for your website.

document.addEventListener('DOMContentLoaded', function() {

    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Vowel Team Activity ---
    const vowelTeamActivity = {
        words: [
            { word: "rain", team: "ai", sound: "Long A" },
            { word: "beach", team: "ea", sound: "Long E" },
            { word: "night", team: "igh", sound: "Long I" },
            { word: "boat", team: "oa", sound: "Long O" },
            { word: "grew", team: "ew", sound: "Long U" }
        ],
        container: document.getElementById('vowelTeamActivity'),
        feedbackEl: document.getElementById('vowelTeamFeedback'),

        init: function() {
            if (!this.container) {
                console.error("Vowel team activity container not found!");
                return; 
            }
            this.renderWords();
        },

        renderWords: function() {
            this.container.innerHTML = ''; 
            this.words.forEach(item => {
                const div = document.createElement('div');
                div.className = 'flex items-center space-x-4 mb-2 p-3 bg-white rounded-md shadow-sm';
                
                const wordSpan = document.createElement('span');
                wordSpan.className = 'text-lg font-medium w-24';
                
                const teamIndex = item.word.indexOf(item.team);
                if (teamIndex === -1) {
                    console.error(`Vowel team "${item.team}" not found in word "${item.word}".`);
                    wordSpan.textContent = item.word; 
                } else {
                    wordSpan.innerHTML = 
                        item.word.substring(0, teamIndex) +
                        `<span class="clickable-vowel-team" data-word="${item.word}" data-team="${item.team}">${item.team}</span>` +
                        item.word.substring(teamIndex + item.team.length);
                }

                div.appendChild(wordSpan);
                this.container.appendChild(div);
            });
            this.addClickListeners();
        },

        addClickListeners: function() {
            this.container.querySelectorAll('.clickable-vowel-team').forEach(span => {
                span.addEventListener('click', (event) => {
                    this.checkAnswer(event.target);
                });
            });
        },

        checkAnswer: function(selectedSpan) {
            const word = selectedSpan.dataset.word;
            const team = selectedSpan.dataset.team;
            const correctItem = this.words.find(item => item.word === word);

            if (!this.feedbackEl) {
                console.error("Vowel team feedback element not found!");
                return;
            }
            this.feedbackEl.classList.remove('hidden');

            if (correctItem && correctItem.team === team) {
                selectedSpan.classList.add('selected-correct');
                this.feedbackEl.className = 'mt-4 p-3 rounded-md bg-green-100 text-green-800';
                this.feedbackEl.textContent = `Ka pai! The vowel team in "${word}" is "${team}", which makes the ${correctItem.sound} sound.`;
            } else {
                selectedSpan.classList.add('selected-incorrect');
                this.feedbackEl.className = 'mt-4 p-3 rounded-md bg-red-100 text-red-800';
                this.feedbackEl.textContent = 'Oops! That\'s not the right vowel team. Try again!';
            }
        }
    };
    if (vowelTeamActivity.container) { // Initialize only if container exists
        vowelTeamActivity.init();
    }


    // --- Word Search Game ---
    const wordSearchGame = {
        gridSize: 20,
        words:'wordSearchWordsList',
        grid:20,
        foundWords:,
        isSelecting: true,
        selectedCells:,
        
        elements: {
            gridContainer: document.getElementById('wordSearchGridContainer'),
            wordsListEl: document.getElementById('wordSearchWordsList'),
            feedbackEl: document.getElementById('wordSearchFeedback'),
            resetBtn: document.getElementById('resetWordSearch'),
        },

        init: function() {
            if (!this.elements.gridContainer ||!this.elements.wordsListEl ||!this.elements.feedbackEl ||!this.elements.resetBtn) {
                console.error("One or more Word Search game elements are missing from the DOM!");
                return;
            }
            this.elements.resetBtn.addEventListener('click', () => {
                this.start();
            });
            this.start();
        },

        start: function() {
            this.foundWords =;
            this.generateGrid();
            this.renderGrid();
            this.updateWordsListDisplay();
            this.updateFeedbackDisplay();
        },

        generateGrid: function() {
            this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(''));
            
            this.words.forEach(word => {
                let placed = false;
                let attempts = 0;
                while(!placed && attempts < 100) {
                    const direction = Math.random() < 0.5? 'horizontal' : 'vertical';
                    const startRow = Math.floor(Math.random() * this.gridSize);
                    const startCol = Math.floor(Math.random() * this.gridSize);
                    if (this.canPlaceWord(word, startRow, startCol, direction)) {
                        this.placeWordInGrid(word, startRow, startCol, direction);
                        placed = true;
                    }
                    attempts++;
                }
            });

            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (let r = 0; r < this.gridSize; r++) {
                for (let c = 0; c < this.gridSize; c++) {
                    if (this.grid[r][c] === '') {
                        this.grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
                    }
                }
            }
        },

        canPlaceWord: function(word, r, c, direction) {
            if (direction === 'horizontal') {
                if (c + word.length > this.gridSize) { return false; }
                for (let i = 0; i < word.length; i++) {
                    if (this.grid[r][c + i]!== '' && this.grid[r][c + i]!== word[i]) { return false; }
                }
            } else { 
                if (r + word.length > this.gridSize) { return false; }
                for (let i = 0; i < word.length; i++) {
                    if (this.grid[r + i][c]!== '' && this.grid[r + i][c]!== word[i]) { return false; }
                }
            }
            return true;
        },

        placeWordInGrid: function(word, r, c, direction) {
             for (let i = 0; i < word.length; i++) {
                if (direction === 'horizontal') {
                    this.grid[r][c + i] = word[i];
                } else { 
                    this.grid[r + i][c] = word[i];
                }
            }
        },

        renderGrid: function() {
            const container = this.elements.gridContainer;
            container.innerHTML = '';
            container.style.gridTemplateColumns = `repeat(${this.gridSize}, minmax(0, 1fr))`;
            
            this.grid.forEach((row, r_idx) => {
                row.forEach((letter, c_idx) => {
                    const cell = document.createElement('div');
                    cell.className = 'word-search-cell';
                    cell.textContent = letter;
                    cell.dataset.r = r_idx;
                    cell.dataset.c = c_idx;
                    container.appendChild(cell);
                });
            });

            container.addEventListener('mousedown', (e) => { this.handleStartSelection(e); });
            container.addEventListener('mouseover', (e) => { this.handleContinueSelection(e); });
            document.addEventListener('mouseup', () => { this.handleEndSelection(); });
            
            container.addEventListener('touchstart', (e) => { e.preventDefault(); this.handleStartSelection(e.touches); });
            container.addEventListener('touchmove', (e) => { e.preventDefault(); this.handleContinueSelection(e.touches); });
            document.addEventListener('touchend', () => { this.handleEndSelection(); });
        },
        
        handleStartSelection: function(event) {
            const target = this.getCellFromEvent(event);
            if(target) {
                this.isSelecting = true;
                this.selectedCells = [target];
                target.classList.add('selecting');
            }
        },

        handleContinueSelection: function(event) {
            if (!this.isSelecting) { return; }
            const target = this.getCellFromEvent(event);
            if (target &&!this.selectedCells.includes(target)) {
                 this.selectedCells.push(target);
                 target.classList.add('selecting');
            }
        },

        handleEndSelection: function() {
            if (!this.isSelecting) { return; }
            this.isSelecting = false;
            
            const selectedWord = this.selectedCells.map(cell => cell.textContent).join('');
            const reversedSelectedWord = [...selectedWord].reverse().join('');
            
            let wordFoundThisTurn = false;
            if (this.words.includes(selectedWord) &&!this.foundWords.includes(selectedWord)) {
                this.foundWords.push(selectedWord);
                wordFoundThisTurn = true;
            } else if (this.words.includes(reversedSelectedWord) &&!this.foundWords.includes(reversedSelectedWord)) {
                this.foundWords.push(reversedSelectedWord);
                wordFoundThisTurn = true;
            }

            if (wordFoundThisTurn) {
                this.selectedCells.forEach(cell => cell.classList.add('found'));
                this.updateWordsListDisplay();
                this.updateFeedbackDisplay();
            }

            this.elements.gridContainer.querySelectorAll('.selecting').forEach(cell => cell.classList.remove('selecting'));
            this.selectedCells =;
        },

        getCellFromEvent: function(event) {
            const target = document.elementFromPoint(event.clientX, event.clientY);
            if (target && target.classList.contains('word-search-cell')) {
                return target;
            }
            return null;
        },

        updateWordsListDisplay: function() {
            this.elements.wordsListEl.innerHTML = this.words.map(word => 
                `<span class="${this.foundWords.includes(word)? 'line-through text-slate-400' : ''}">${word}</span>`
            ).join(' '); 
        },

        updateFeedbackDisplay: function() {
             if (this.foundWords.length === this.words.length) {
                this.elements.feedbackEl.textContent = "Awesome! You found all the words!";
                this.elements.feedbackEl.className = 'text-center mt-4 font-semibold text-green-600';
            } else {
                this.elements.feedbackEl.textContent = `Found ${this.foundWords.length} of ${this.words.length} words.`;
                this.elements.feedbackEl.className = 'text-center mt-4 font-semibold text-sky-700';
            }
        }
    };
    if (wordSearchGame.elements.gridContainer) { // Initialize only if container exists
        wordSearchGame.init();
    }

});
