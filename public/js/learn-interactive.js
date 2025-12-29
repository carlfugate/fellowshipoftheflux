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
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {
            progress: {},
            bookmarks: [],
            assessments: {},
            preferences: {}
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // Progress Tracking System
    setupProgressTracking() {
        const progressElements = document.querySelectorAll('[data-progress-item]');
        const progressBars = document.querySelectorAll('.progress-bar');

        progressElements.forEach(element => {
            const itemId = element.dataset.progressItem;
            const isCompleted = this.data.progress[itemId] || false;

            if (isCompleted) {
                element.classList.add('completed');
                this.updateProgressDisplay(element);
            }

            element.addEventListener('click', () => {
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
        const feedback = document.createElement('div');
        feedback.className = `progress-feedback ${type === 'completed' ? 'success' : 'info'}`;
        feedback.textContent = type === 'completed' ? 'Great job! ✓' : 'Progress reset';

        element.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    // Skill Assessment System
    setupSkillAssessments() {
        const assessmentButtons = document.querySelectorAll('.start-assessment');

        assessmentButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const assessmentId = button.dataset.assessmentId;
                this.startAssessment(assessmentId);
            });
        });
    }

    startAssessment(assessmentId) {
        const assessmentData = this.getAssessmentQuestions(assessmentId);
        this.showAssessmentModal(assessmentData);
    }

    getAssessmentQuestions(assessmentId) {
        // Sample assessment questions - in a real implementation, 
        // these would be loaded from a data source
        const assessments = {
            'basic-soldering': {
                title: 'Basic Soldering Assessment',
                questions: [
                    {
                        question: 'What temperature should you set for leaded solder?',
                        options: ['250°C', '350°C', '450°C', '550°C'],
                        correct: 1,
                        explanation: '350°C (660°F) is the optimal temperature for leaded solder.'
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
                        question: 'What indicates a good solder joint?',
                        options: [
                            'Dull, grainy surface',
                            'Shiny, smooth concave fillet',
                            'Large blob of solder',
                            'Minimal solder coverage'
                        ],
                        correct: 1,
                        explanation: 'A good joint has a shiny, smooth surface with a concave fillet shape.'
                    }
                ]
            }
        };

        return assessments[assessmentId] || null;
    }

    showAssessmentModal(assessmentData) {
        if (!assessmentData) return;

        const modal = this.createAssessmentModal(assessmentData);
        document.body.appendChild(modal);

        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    createAssessmentModal(assessmentData) {
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
        modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>${assessmentData.title}</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="assessment-progress">
              <div class="progress-bar" style="width: 0%"></div>
            </div>
            <div class="question-container">
              <!-- Questions will be inserted here -->
            </div>
            <div class="assessment-controls">
              <button class="prev-question" disabled>Previous</button>
              <button class="next-question">Next</button>
              <button class="submit-assessment" style="display: none;">Submit</button>
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
          <h4>Question ${index + 1} of ${assessmentData.questions.length}</h4>
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
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                modal.remove();
            }
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
          <h3>Assessment Complete!</h3>
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
          <button class="retake-assessment">Retake Assessment</button>
          <button class="close-results">Close</button>
        </div>
      </div>
    `;

        // Setup result actions
        modal.querySelector('.retake-assessment').addEventListener('click', () => {
            modal.remove();
            // Restart assessment logic would go here
        });

        modal.querySelector('.close-results').addEventListener('click', () => {
            modal.remove();
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

            item.style.display = show ? 'block' : 'none';
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

// CSS for interactive elements (to be added to main CSS file)
const interactiveStyles = `
.assessment-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.assessment-modal.show {
  opacity: 1;
  visibility: visible;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.close-modal {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 20px;
}

.assessment-progress {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}

.assessment-progress .progress-bar {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.question {
  margin-bottom: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.option {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.option input[type="radio"] {
  margin-right: 10px;
}

.assessment-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.assessment-controls button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.prev-question {
  background: #6b7280;
  color: white;
}

.prev-question:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.next-question, .submit-assessment {
  background: #3b82f6;
  color: white;
}

.next-question:hover, .submit-assessment:hover {
  background: #2563eb;
}

.assessment-results {
  text-align: center;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border: 8px solid;
}

.score-circle.pass {
  border-color: #10b981;
  background: #ecfdf5;
  color: #065f46;
}

.score-circle.fail {
  border-color: #ef4444;
  background: #fef2f2;
  color: #991b1b;
}

.score {
  font-size: 24px;
  font-weight: bold;
}

.label {
  font-size: 14px;
  opacity: 0.8;
}

.results-details {
  text-align: left;
  margin-top: 30px;
}

.question-result {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid;
}

.question-result.correct {
  border-color: #10b981;
  background: #ecfdf5;
}

.question-result.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
}

.progress-feedback {
  position: absolute;
  top: -30px;
  right: 0;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  animation: fadeInOut 2s ease;
}

.progress-feedback.success {
  background: #10b981;
  color: white;
}

.progress-feedback.info {
  background: #3b82f6;
  color: white;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translateY(-10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
}

.filterable-item {
  transition: all 0.3s ease;
}

.bookmark-btn.bookmarked {
  background: #fbbf24 !important;
  color: white !important;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = interactiveStyles;
    document.head.appendChild(styleSheet);
}