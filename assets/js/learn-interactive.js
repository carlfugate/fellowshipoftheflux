// Learn to Solder Interactive Features
// Progress tracking, skill assessments, and interactive elements

class LearnTracker {
    constructor() {
        this.storageKey = 'learnToSolder';
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupProgressTracking();
        this.setupSkillAssessments();
        this.setupBookmarks();
        this.setupSearchFilters();
    }

    // Data persistence
    loadData() {
        let stored;
        try { stored = JSON.parse(localStorage.getItem(this.storageKey)); } catch {}
        return {
            progress: {},
            bookmarks: [],
            assessments: {},
            preferences: {},
            ...stored
        };
    }

    saveData() {
        try { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); } catch {}
    }

    // Progress Tracking System
    setupProgressTracking() {
        const progressElements = document.querySelectorAll('[data-progress-item]');
        const progressBars = document.querySelectorAll('.progress-bar');

        progressElements.forEach(element => {
            const itemId = element.dataset.progressItem;
            const isCompleted = this.data.progress[itemId] || false;

            element.classList.toggle('completed', isCompleted);
            this.updateProgressDisplay(element);

            element.querySelector('.progress-btn')?.addEventListener('click', () => {
                this.toggleProgress(itemId, element);
            });
        });

        // Initialize progress bars
        this.updateAllProgressBars();
    }

    toggleProgress(itemId, element) {
        const isCompleted = this.data.progress[itemId] || false;
        this.data.progress[itemId] = !isCompleted;

        if (this.data.progress[itemId]) {
            element.classList.add('completed');
            this.showProgressFeedback(element, 'completed');
        } else {
            element.classList.remove('completed');
            this.showProgressFeedback(element, 'reset');
        }

        this.updateProgressDisplay(element);
        this.updateAllProgressBars();
        this.saveData();
    }

    updateProgressDisplay(element) {
        const button = element.querySelector('.progress-btn');
        const isCompleted = element.classList.contains('completed');

        if (button) {
            button.setAttribute('aria-pressed', String(isCompleted));
            button.textContent = isCompleted ? 'Completed ✓' : 'Mark Complete';
            button.className = isCompleted ?
                'progress-btn bg-green-600 text-white px-4 py-2 rounded-lg' :
                'progress-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700';
        }
    }

    updateAllProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        progressBars.forEach(bar => {
            const category = bar.dataset.category || 'all';
            const progress = this.calculateProgress(category);

            bar.style.width = `${progress}%`;

            const progressText = bar.parentElement.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${Math.round(progress)}%`;
            }
        });
    }

    calculateProgress(category = 'all') {
        const items = document.querySelectorAll(`[data-progress-item${category !== 'all' ? `*="${category}"` : ''}]`);
        if (items.length === 0) return 0;

        const completed = Array.from(items).filter(item =>
            this.data.progress[item.dataset.progressItem]
        ).length;

        return (completed / items.length) * 100;
    }

    showProgressFeedback(element, type) {
        const feedback = element.querySelector('.progress-feedback');
        if (!feedback) return;
        clearTimeout(feedback.feedbackTimer);
        feedback.textContent = type === 'completed' ? 'Great job! ✓' : 'Progress reset';
        feedback.feedbackTimer = setTimeout(() => { feedback.textContent = ''; }, 2000);
    }

    // Skill Assessment System
    setupSkillAssessments() {
        const assessmentButtons = document.querySelectorAll('.start-assessment');

        assessmentButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const assessmentId = button.dataset.assessmentId;
                this.startAssessment(assessmentId, button);
            });
        });
    }

    startAssessment(assessmentId, trigger = document.activeElement) {
        const assessmentData = this.getAssessmentQuestions(assessmentId);
        this.showAssessmentModal(assessmentData, trigger);
    }

    getAssessmentQuestions(assessmentId) {
        // Sample assessment questions - in a real implementation, 
        // these would be loaded from a data source
        const assessments = {
            'basic-soldering': {
                title: 'Basic Soldering Assessment',
                questions: [
                    {
                        question: 'What should determine the station setting for a soldering task?',
                        options: [
                            'A single temperature used for every soldering job',
                            'The station, tip, solder and component instructions, with instructor guidance',
                            'The temperature printed on the solder spool alone',
                            'The highest setting available on the station'
                        ],
                        correct: 1,
                        explanation: 'The suitable setting depends on the equipment, tip, solder and components. Check their instructions with the instructor.'
                    },
                    {
                        question: 'Why do you tin the soldering iron tip?',
                        options: [
                            'To make it look shiny',
                            'To improve heat transfer and prevent oxidation',
                            'To make it last longer',
                            'It\'s not necessary'
                        ],
                        correct: 1,
                        explanation: 'Tinning improves heat transfer and prevents tip oxidation.'
                    },
                    {
                        question: 'What is a useful first visual check of a through-hole joint?',
                        options: [
                            'Judge the joint by whether it looks shiny',
                            'Look for visible wetting on the pad and lead, check adjacent pads, then ask the instructor to assess it against project criteria',
                            'Add a large blob to cover the pad',
                            'Assume a dull joint is always defective'
                        ],
                        correct: 1,
                        explanation: 'Visible wetting and adjacent-pad checks are useful clues, but surface gloss alone cannot establish whether a joint meets the project criteria.'
                    }
                ]
            }
        };

        return assessments[assessmentId] || null;
    }

    showAssessmentModal(assessmentData, trigger) {
        if (!assessmentData) return;

        const modal = this.createAssessmentModal(assessmentData, trigger);
        document.body.appendChild(modal);

        // Show modal with animation
        modal.classList.add('show');
        modal.showModal();
        modal.querySelector('.question h4')?.focus();
    }

    createAssessmentModal(assessmentData, trigger) {
        const modal = document.createElement('dialog');
        modal.returnFocusElement = trigger;
        modal.setAttribute('aria-label', assessmentData.title);
        modal.dataset.assessmentId = trigger?.dataset.assessmentId || 'basic-soldering';
        modal.addEventListener('close', () => {
            modal.remove();
            if (modal.returnValue !== 'retake') trigger?.focus();
        });
        modal.className = 'assessment-modal';
        modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
          <h3>${assessmentData.title}</h3>
          <button type="button" class="close-modal" aria-label="Close quiz">&times;</button>
          </div>
          <div class="modal-body">
            <div class="assessment-progress">
              <div class="progress-bar" style="width: 0%"></div>
            </div>
            <div class="question-container">
              <!-- Questions will be inserted here -->
            </div>
            <div class="assessment-controls">
              <button type="button" class="prev-question" disabled>Previous</button>
              <button type="button" class="next-question">Next</button>
              <button type="button" class="submit-assessment" style="display: none;">Submit</button>
            </div>
          </div>
        </div>
      </div>
    `;

        this.setupAssessmentModal(modal, assessmentData);
        return modal;
    }

    setupAssessmentModal(modal, assessmentData) {
        let currentQuestion = 0;
        const answers = [];

        const questionContainer = modal.querySelector('.question-container');
        const progressBar = modal.querySelector('.progress-bar');
        const prevBtn = modal.querySelector('.prev-question');
        const nextBtn = modal.querySelector('.next-question');
        const submitBtn = modal.querySelector('.submit-assessment');
        const closeBtn = modal.querySelector('.close-modal');

        const showQuestion = (index) => {
            const question = assessmentData.questions[index];
            questionContainer.innerHTML = `
        <div class="question">
          <h4 tabindex="-1">Question ${index + 1} of ${assessmentData.questions.length}</h4>
          <p>${question.question}</p>
          <div class="options">
            ${question.options.map((option, i) => `
              <label class="option">
                <input type="radio" name="question-${index}" value="${i}">
                <span>${option}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;

            // Restore previous answer if exists
            if (answers[index] !== undefined) {
                const radio = questionContainer.querySelector(`input[value="${answers[index]}"]`);
                if (radio) radio.checked = true;
            }

            // Update progress
            const progress = ((index + 1) / assessmentData.questions.length) * 100;
            progressBar.style.width = `${progress}%`;

            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.style.display = index === assessmentData.questions.length - 1 ? 'none' : 'block';
            submitBtn.style.display = index === assessmentData.questions.length - 1 ? 'block' : 'none';
            if (modal.open) questionContainer.querySelector('h4')?.focus();
        };

        const saveAnswer = () => {
            const selected = questionContainer.querySelector('input[name^="question-"]:checked');
            if (selected) {
                answers[currentQuestion] = parseInt(selected.value);
            }
        };

        // Event listeners
        nextBtn.addEventListener('click', () => {
            saveAnswer();
            if (currentQuestion < assessmentData.questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });

        prevBtn.addEventListener('click', () => {
            saveAnswer();
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
            }
        });

        submitBtn.addEventListener('click', () => {
            saveAnswer();
            this.submitAssessment(assessmentData, answers, modal);
        });

        closeBtn.addEventListener('click', () => {
            modal.close();
        });

        let pointerStartedOnBackdrop = false;
        modal.addEventListener('pointerdown', (event) => {
            const rect = modal.getBoundingClientRect();
            pointerStartedOnBackdrop = event.target === modal && (
                event.clientX < rect.left || event.clientX > rect.right ||
                event.clientY < rect.top || event.clientY > rect.bottom
            );
        });
        modal.addEventListener('click', (event) => {
            if (pointerStartedOnBackdrop && event.target === modal && event.detail > 0) modal.close();
            pointerStartedOnBackdrop = false;
        });

        // Show first question
        showQuestion(0);
    }

    submitAssessment(assessmentData, answers, modal) {
        const results = this.calculateAssessmentResults(assessmentData, answers);
        this.showAssessmentResults(results, modal);

        // Save results
        const assessmentId = assessmentData.title.toLowerCase().replace(/\s+/g, '-');
        this.data.assessments[assessmentId] = {
            score: results.score,
            percentage: results.percentage,
            date: new Date().toISOString(),
            answers: answers
        };
        this.saveData();
    }

    calculateAssessmentResults(assessmentData, answers) {
        let correct = 0;
        const details = [];

        assessmentData.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correct;

            if (isCorrect) correct++;

            details.push({
                question: question.question,
                userAnswer: userAnswer !== undefined ? question.options[userAnswer] : 'Not answered',
                correctAnswer: question.options[question.correct],
                isCorrect: isCorrect,
                explanation: question.explanation
            });
        });

        return {
            score: correct,
            total: assessmentData.questions.length,
            percentage: Math.round((correct / assessmentData.questions.length) * 100),
            details: details
        };
    }

    showAssessmentResults(results, modal) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
      <div class="assessment-results">
        <div class="results-header">
          <h3 tabindex="-1">Assessment Complete!</h3>
          <div class="score-display">
            <div class="score-circle ${results.percentage >= 70 ? 'pass' : 'fail'}">
              <span class="score">${results.percentage}%</span>
              <span class="label">${results.score}/${results.total}</span>
            </div>
          </div>
          <p class="results-message">
            ${results.percentage >= 70 ?
                'Congratulations! You passed the assessment.' :
                'Keep studying and try again. You can do it!'}
          </p>
        </div>
        
        <div class="results-details">
          <h4>Question Review</h4>
          ${results.details.map((detail, index) => `
            <div class="question-result ${detail.isCorrect ? 'correct' : 'incorrect'}">
              <div class="question-text">
                <strong>Q${index + 1}:</strong> ${detail.question}
              </div>
              <div class="answer-comparison">
                <div class="user-answer">
                  <span class="label">Your answer:</span>
                  <span class="answer">${detail.userAnswer}</span>
                  ${detail.isCorrect ? '✓' : '✗'}
                </div>
                ${!detail.isCorrect ? `
                  <div class="correct-answer">
                    <span class="label">Correct answer:</span>
                    <span class="answer">${detail.correctAnswer}</span>
                  </div>
                ` : ''}
              </div>
              <div class="explanation">
                <strong>Explanation:</strong> ${detail.explanation}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="results-actions">
          <button type="button" class="retake-assessment">Retake Assessment</button>
          <button type="button" class="close-results">Close</button>
        </div>
      </div>
    `;

        modal.querySelector('.results-header h3')?.focus();

        // Setup result actions
        modal.querySelector('.retake-assessment').addEventListener('click', () => {
            modal.close('retake');
            this.startAssessment(modal.dataset.assessmentId, modal.returnFocusElement);
        });

        modal.querySelector('.close-results').addEventListener('click', () => {
            modal.close();
        });
    }

    // Bookmark System
    setupBookmarks() {
        const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

        bookmarkButtons.forEach(button => {
            const itemId = button.dataset.itemId || window.location.pathname;
            const isBookmarked = this.data.bookmarks.includes(itemId);

            this.updateBookmarkButton(button, isBookmarked);

            button.addEventListener('click', () => {
                this.toggleBookmark(itemId, button);
            });
        });
    }

    toggleBookmark(itemId, button) {
        const isBookmarked = this.data.bookmarks.includes(itemId);

        if (isBookmarked) {
            this.data.bookmarks = this.data.bookmarks.filter(id => id !== itemId);
        } else {
            this.data.bookmarks.push(itemId);
        }

        this.updateBookmarkButton(button, !isBookmarked);
        this.saveData();
    }

    updateBookmarkButton(button, isBookmarked) {
        button.setAttribute('aria-pressed', String(isBookmarked));
        button.textContent = isBookmarked ? 'Bookmarked ★' : 'Bookmark ☆';
        button.className = isBookmarked ?
            'bookmark-btn bookmarked px-4 py-2 bg-yellow-500 text-white rounded-lg' :
            'bookmark-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300';
    }

    // Search and Filter System
    setupSearchFilters() {
        const searchInput = document.getElementById('search-input');
        const filterSelects = document.querySelectorAll('.filter-select');

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(() => {
                this.applyFilters();
            }, 300));
        }

        const level = document.getElementById('level');
        if (level) {
            level.value = new URLSearchParams(location.search).get('level') || '';
            this.applyFilters();
        }
        filterSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const filters = {};

        // Collect filter values
        document.querySelectorAll('.filter-select').forEach(select => {
            if (select.value) {
                filters[select.dataset.filter] = select.value;
            }
        });

        // Apply filters to items
        const items = document.querySelectorAll('.filterable-item');
        let visibleCount = 0;

        items.forEach(item => {
            let show = true;

            // Search filter
            if (searchTerm) {
                const searchableText = (
                    item.dataset.title + ' ' +
                    item.dataset.description + ' ' +
                    item.dataset.tags
                ).toLowerCase();

                if (!searchableText.includes(searchTerm)) {
                    show = false;
                }
            }

            // Category filters
            Object.entries(filters).forEach(([filterType, filterValue]) => {
                if (show && item.dataset[filterType] !== filterValue) {
                    show = false;
                }
            });

            item.hidden = !show;
            if (show) visibleCount++;
        });

        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    getProgress(category = 'all') {
        return this.calculateProgress(category);
    }

    getBookmarks() {
        return [...this.data.bookmarks];
    }

    getAssessmentHistory() {
        return { ...this.data.assessments };
    }

    exportData() {
        return JSON.stringify(this.data, null, 2);
    }

    importData(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.data = { ...this.data, ...imported };
            this.saveData();
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.learnTracker = new LearnTracker();
});
