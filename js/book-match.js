document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const progressBar = document.querySelector('.progress');
    
    // Quiz questions directly in code
    const questions = [
        {
            id: 1,
            type: 'checkbox',
            question: 'What genres do you enjoy reading?',
            description: 'Select all that apply',
            name: 'genres',
            options: [
                { value: 'fiction', label: 'Fiction', icon: 'book' },
                { value: 'mystery', label: 'Mystery', icon: 'search' },
                { value: 'scifi', label: 'Sci-Fi', icon: 'rocket' },
                { value: 'fantasy', label: 'Fantasy', icon: 'wand' },
                { value: 'romance', label: 'Romance', icon: 'heart' },
                { value: 'nonfiction', label: 'Non-Fiction', icon: 'graduation-cap' }
            ]
        },
        {
            id: 2,
            type: 'radio',
            question: 'How much time do you typically spend reading?',
            description: 'Choose the option that best describes your reading habits',
            name: 'reading_time',
            options: [
                { value: 'light', label: '15-30 minutes a day', icon: 'coffee' },
                { value: 'moderate', label: '1-2 hours a day', icon: 'book-open' },
                { value: 'heavy', label: 'Several hours a day', icon: 'library' }
            ]
        },
        {
            id: 3,
            type: 'radio',
            question: 'What\'s your preferred book length?',
            description: 'Select your ideal book length',
            name: 'book_length',
            options: [
                { value: 'short', label: 'Under 300 pages', icon: 'book' },
                { value: 'medium', label: '300-500 pages', icon: 'books' },
                { value: 'long', label: 'Over 500 pages', icon: 'library' }
            ]
        },
        {
            id: 4,
            type: 'checkbox',
            question: 'What themes interest you most?',
            description: 'Select all that apply',
            name: 'themes',
            options: [
                { value: 'adventure', label: 'Adventure', icon: 'map' },
                { value: 'relationships', label: 'Relationships', icon: 'users' },
                { value: 'mystery', label: 'Mystery', icon: 'search' },
                { value: 'personal_growth', label: 'Personal Growth', icon: 'sprout' },
                { value: 'social_issues', label: 'Social Issues', icon: 'globe' },
                { value: 'history', label: 'History', icon: 'clock' }
            ]
        }
    ];

    let currentQuestion = 1;
    const totalQuestions = questions.length;
    document.getElementById('totalQuestions').textContent = totalQuestions;

    // Function to create question HTML
    function createQuestionHTML(question) {
        return `
            <div class="question-container" data-question="${question.id}">
                <h2>${question.question}</h2>
                <p class="question-description">${question.description}</p>
                <div class="options-grid">
                    ${question.options.map(option => `
                        <label class="option-card">
                            <input type="${question.type}" name="${question.name}" value="${option.value}">
                            <span class="option-content">
                                <i data-lucide="${option.icon}"></i>
                                ${option.label}
                            </span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Add remaining questions to the form
    questions.slice(2).forEach(question => {
        quizForm.insertAdjacentHTML('beforeend', createQuestionHTML(question));
    });

    // Initialize Lucide icons for dynamically added content
    lucide.createIcons();

    // Update progress
    function updateProgress() {
        const progress = ((currentQuestion - 1) / (totalQuestions - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        currentQuestionSpan.textContent = currentQuestion;
        
        // Update button states
        prevButton.disabled = currentQuestion === 1;
        nextButton.textContent = currentQuestion === totalQuestions ? 'Get Recommendations' : 'Next';
    }

    // Show question
    function showQuestion(questionNumber) {
        document.querySelectorAll('.question-container').forEach(container => {
            container.classList.remove('active');
        });
        document.querySelector(`[data-question="${questionNumber}"]`).classList.add('active');
    }

    // Handle navigation
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgress();
        }
    });

    nextButton.addEventListener('click', () => {
        const currentContainer = document.querySelector(`[data-question="${currentQuestion}"]`);
        const inputs = currentContainer.querySelectorAll('input');
        let isValid = false;

        if (inputs[0].type === 'checkbox') {
            isValid = Array.from(inputs).some(input => input.checked);
        } else {
            isValid = Array.from(inputs).some(input => input.checked);
        }

        if (!isValid) {
            alert('Please select at least one option');
            return;
        }

        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgress();
        } else {
            // Handle form submission
            const formData = new FormData(quizForm);
            const answers = {};
            for (const [key, value] of formData.entries()) {
                if (!answers[key]) {
                    answers[key] = [];
                }
                answers[key].push(value);
            }
            
            // For demo purposes, just log the answers
            console.log('Quiz answers:', answers);
            
            // In a real application, you would process the answers and show recommendations
            alert('Thank you for completing the quiz! Your recommendations are being generated.');
        }
    });

    // Initialize progress
    updateProgress();
}); 