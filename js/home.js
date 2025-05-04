// Book data directly in code
const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
        rating: 4.2
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
        rating: 4.5
    },
    {
        id: 3,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg",
        rating: 4.0
    },
    {
        id: 4,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg",
        rating: 4.4
    }
];

// Handle tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const booksGrid = document.getElementById('booksGrid');
    
    // Function to create book card HTML
    const createBookCard = (book) => {
        return `
            <div class="book-card">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author}</p>
                    <div class="rating">
                        <div class="stars" style="--rating: ${book.rating};"></div>
                        <span>${book.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
    };
    
    // Function to update books grid
    const updateBooksGrid = (category) => {
        // In a real application, you would filter books based on category
        booksGrid.innerHTML = books.map(createBookCard).join('');
    };
    
    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update books grid
            updateBooksGrid(tab.dataset.tab);
        });
    });
    
    // Initialize with featured books
    updateBooksGrid('featured');
    
    // Add CSS for book cards
    const style = document.createElement('style');
    style.textContent = `
        .book-card {
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        
        .book-card:hover {
            transform: translateY(-4px);
        }
        
        .book-cover {
            width: 100%;
            aspect-ratio: 2/3;
            object-fit: cover;
        }
        
        .book-info {
            padding: 1rem;
        }
        
        .book-info h3 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: var(--text-primary);
        }
        
        .author {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }
        
        .rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .stars {
            position: relative;
            display: inline-block;
            font-size: 0.875rem;
            width: 5em;
            height: 1em;
            background: linear-gradient(90deg, 
                #fbbf24 calc(var(--rating) * 20%), 
                #e5e7eb calc(var(--rating) * 20%)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .stars::before {
            content: "★★★★★";
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .rating span {
            font-size: 0.875rem;
            color: var(--text-muted);
        }
    `;
    document.head.appendChild(style);
}); 