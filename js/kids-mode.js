document.addEventListener('DOMContentLoaded', () => {
    // Sample bedtime stories data
    const stories = [
        {
            id: 1,
            title: "The Sleepy Dragon",
            description: "A heartwarming tale about a young dragon who can't fall asleep.",
            image: "https://images.unsplash.com/photo-1599689018034-48e2ead82951",
            readingTime: "5 mins",
            ageRange: "3-6 years",
            content: [
                "Once upon a time, there was a little dragon named Spark who had trouble falling asleep.",
                "Every night, he would toss and turn in his cozy cave, counting sheep that turned into clouds of smoke.",
                "One evening, a wise owl visited Spark and taught him a special bedtime routine.",
                "First, they took deep dragon breaths, making tiny flame circles in the air.",
                "Then, they listened to the gentle sounds of the forest at night.",
                "Finally, the owl sang a soft lullaby about starlit skies and peaceful dreams.",
                "Slowly but surely, Spark's eyes began to feel heavy.",
                "And before he knew it, he was fast asleep, dreaming of flying through cotton candy clouds.",
                "From that day on, Spark never had trouble sleeping again.",
                "The End."
            ]
        },
        {
            id: 2,
            title: "The Magic Blanket",
            description: "Join Lucy on her adventure with a magical blanket that brings sweet dreams.",
            image: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0",
            readingTime: "7 mins",
            ageRange: "4-8 years",
            content: [
                "Lucy's grandmother gave her a special blanket on her birthday.",
                "It wasn't just any blanket - it was woven with starlight and sprinkled with dream dust.",
                "When Lucy wrapped herself in the blanket, magical things began to happen.",
                "She could float on clouds and dance with moonbeams.",
                "The blanket took her on adventures to faraway lands filled with friendly creatures.",
                "But the best part was that it always brought her safely back home.",
                "Each night, Lucy looked forward to bedtime and the wonderful dreams that awaited.",
                "Her magical blanket became her most treasured possession.",
                "And sometimes, if you listen carefully at night, you might hear Lucy giggling as she soars through her dreams.",
                "The End."
            ]
        }
    ];

    // Initialize Web Speech API
    const speechSynth = window.speechSynthesis;
    let currentUtterance = null;
    let currentParagraphIndex = 0;
    let isReading = false;

    // Populate stories grid
    const storiesGrid = document.querySelector('.stories-grid');
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.innerHTML = `
            <img src="${story.image}" alt="${story.title}" class="story-image">
            <div class="story-info">
                <h3>${story.title}</h3>
                <p>${story.description}</p>
                <div class="story-meta">
                    <span><i data-lucide="clock"></i>${story.readingTime}</span>
                    <span><i data-lucide="users"></i>${story.ageRange}</span>
                </div>
            </div>
        `;
        storyCard.addEventListener('click', () => openStory(story));
        storiesGrid.appendChild(storyCard);
    });

    // Initialize Lucide icons in story cards
    lucide.createIcons();

    // Modal elements
    const modal = document.getElementById('storyModal');
    const closeBtn = modal.querySelector('.close-btn');
    const storyTitle = document.getElementById('storyTitle');
    const storyContent = document.getElementById('storyContent');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');
    const volumeSlider = document.getElementById('volumeSlider');

    // Open story modal
    function openStory(story) {
        storyTitle.textContent = story.title;
        storyContent.innerHTML = story.content.map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');
        modal.style.display = 'block';
        currentParagraphIndex = 0;
        stopReading();
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stopReading();
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            stopReading();
        }
    });

    // Play button click
    playButton.addEventListener('click', () => {
        if (!isReading) {
            startReading();
        }
    });

    // Pause button click
    pauseButton.addEventListener('click', () => {
        if (isReading) {
            pauseReading();
        }
    });

    // Stop button click
    stopButton.addEventListener('click', stopReading);

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        if (currentUtterance) {
            currentUtterance.volume = e.target.value;
        }
    });

    // Start reading
    function startReading() {
        if (speechSynth.speaking) return;

        const paragraphs = storyContent.querySelectorAll('p');
        if (currentParagraphIndex >= paragraphs.length) {
            currentParagraphIndex = 0;
        }

        // Remove previous highlighting
        paragraphs.forEach(p => p.classList.remove('reading'));
        
        // Start reading from current paragraph
        readParagraph(paragraphs[currentParagraphIndex]);
        
        isReading = true;
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }

    // Read a single paragraph
    function readParagraph(paragraph) {
        paragraph.classList.add('reading');
        
        currentUtterance = new SpeechSynthesisUtterance(paragraph.textContent);
        currentUtterance.volume = volumeSlider.value;
        currentUtterance.rate = 0.9; // Slightly slower for better comprehension
        currentUtterance.pitch = 1.1; // Slightly higher pitch for storytelling

        currentUtterance.onend = () => {
            paragraph.classList.remove('reading');
            currentParagraphIndex++;
            
            // Continue to next paragraph if available
            const paragraphs = storyContent.querySelectorAll('p');
            if (currentParagraphIndex < paragraphs.length) {
                readParagraph(paragraphs[currentParagraphIndex]);
            } else {
                stopReading();
            }
        };

        speechSynth.speak(currentUtterance);
    }

    // Pause reading
    function pauseReading() {
        speechSynth.pause();
        isReading = false;
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }

    // Stop reading
    function stopReading() {
        speechSynth.cancel();
        isReading = false;
        currentParagraphIndex = 0;
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        
        // Remove highlighting from all paragraphs
        const paragraphs = storyContent.querySelectorAll('p');
        paragraphs.forEach(p => p.classList.remove('reading'));
    }
}); 