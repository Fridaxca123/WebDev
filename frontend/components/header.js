class Header {
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <nav class="flex items-center justify-between w-full px-4 md:px-8 py-4">
                <div class="flex items-center gap-10">
                    <img class="nav-icon" src="images/icon.png" alt="Store logo">
                    <h2>Store</h2>
                </div>
                <div class="flex flex-1 items-center justify-center gap-4 md:gap-20 min-w-0">
                    <a href="./main.html" class="nav-link">Home</a>
                    <a href="./shop.html" class="nav-link">Shop</a>
                    <a href="/" class="nav-link">About</a>
                    <a href="/" class="nav-link">Contact</a>
                </div>
                <div class="flex items-center gap-6 md:gap-8">
                    <button class="nav-btn" type="button" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </button>
                    <button class="nav-btn" type="button" aria-label="Favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                    </button>
                    <button class="nav-btn" type="button" aria-label="Shopping bag">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                            <path d="M3 6h18"></path>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        `;
    }
}

export default Header;
