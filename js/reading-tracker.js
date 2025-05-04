document.addEventListener('DOMContentLoaded', () => {
    // Reading data directly in code
    const currentBooks = [
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
            progress: 65,
            pagesRead: 210,
            totalPages: 304
        },
        {
            id: 2,
            title: "Project Hail Mary",
            author: "Andy Weir",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
            progress: 30,
            pagesRead: 148,
            totalPages: 496
        },
        {
            id: 3,
            title: "Tomorrow, and Tomorrow, and Tomorrow",
            author: "Gabrielle Zevin",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg",
            progress: 15,
            pagesRead: 76,
            totalPages: 416
        }
    ];

    const readingHistory = [
        {
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            pagesRead: 389,
            timeSpent: "12h 30m",
            status: "completed"
        },
        {
            title: "Klara and the Sun",
            author: "Kazuo Ishiguro",
            pagesRead: 303,
            timeSpent: "10h 15m",
            status: "completed"
        },
        {
            title: "Cloud Cuckoo Land",
            author: "Anthony Doerr",
            pagesRead: 245,
            timeSpent: "8h 45m",
            status: "paused"
        }
    ];

    // Chart data directly in code
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Pages Read',
            data: [45, 29, 68, 31, 55, 85, 46],
            fill: true,
            borderColor: '#412509',
            backgroundColor: 'rgba(65, 37, 9, 0.1)',
            tension: 0.4
        }]
    };

    // Initialize reading progress chart
    const ctx = document.getElementById('readingChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Pages'
                    }
                }
            }
        }
    });

    // Populate currently reading books
    const booksGrid = document.querySelector('.books-grid');
    currentBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <div class="progress-info">
                    <span>${book.pagesRead} / ${book.totalPages} pages</span>
                    <span>${book.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${book.progress}%"></div>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });

    // Populate reading history table
    const historyTableBody = document.querySelector('.history-table tbody');
    readingHistory.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pagesRead} pages</td>
            <td>${book.timeSpent}</td>
            <td>
                <span class="status status-${book.status}">
                    ${book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
            </td>
        `;
        historyTableBody.appendChild(row);
    });

    // Handle time filter buttons
    const timeFilterButtons = document.querySelectorAll('.time-filter button');
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // In a real application, you would filter the chart data based on time period
            console.log(`Switched to ${button.textContent} view`);
        });
    });

    // Handle add book button
    const addBookButton = document.querySelector('.current-books .btn-primary');
    addBookButton.addEventListener('click', () => {
        // In a real application, this would open a modal to add a new book
        alert('Add book functionality would open here');
    });

    // Handle filter button
    const filterButton = document.querySelector('.reading-history .btn-outline');
    filterButton.addEventListener('click', () => {
        // In a real application, this would open a filter modal
        alert('Filter options would appear here');
    });
}); 