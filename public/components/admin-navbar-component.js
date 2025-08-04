class AdminNavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    static get observedAttributes() {
        return ['active-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-page' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const activePage = this.getAttribute('active-page') || '';

        // Ambil data user dari localStorage
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        const fullName = userData?.name || 'Administrator';
        const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

        this.innerHTML = `
            <nav class="bg-white shadow-sm border-b" id="navbar">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <img src="../assets/logo.png" alt="Bursa Talenta" class="h-12 w-auto mr-2">
                        </div>

                        <!-- User Menu -->
                        <div class="flex items-center space-x-4">
                            <!-- User Dropdown -->
                            <div class="relative">
                                <button id="userMenuButton" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                                    <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        ${initials}
                                    </div>
                                    <span class="text-sm font-medium">${fullName}</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                
                                <!-- Dropdown Menu -->
                                <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="logoutBtn">Sign Out</a>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button id="mobileMenuButton" class="text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Navigation -->
                    <div id="mobileMenu" class="hidden md:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                            <a href="/admin/dashboard" class="${activePage === 'dashboard' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} block px-3 py-2 text-base font-medium">Dashboard</a>
                            <a href="/admin/job-approval" class="${activePage === 'job-approval' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} block px-3 py-2 text-base font-medium">Persetujuan Lowongan</a>
                            <a href="/profile" class="text-gray-500 hover:text-gray-700 block px-3 py-2 text-base font-medium">Profile</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    addEventListeners() {
        const userMenuButton = this.querySelector('#userMenuButton');
        const userMenu = this.querySelector('#userMenu');
        const mobileMenuButton = this.querySelector('#mobileMenuButton');
        const mobileMenu = this.querySelector('#mobileMenu');
        const logoutBtn = this.querySelector('#logoutBtn');

        // Toggle user menu
        userMenuButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu?.classList.toggle('hidden');
        });

        // Toggle mobile menu
        mobileMenuButton?.addEventListener('click', () => {
            mobileMenu?.classList.toggle('hidden');
        });

        // Close user menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInside = userMenuButton?.contains(event.target);
            if (!isClickInside && userMenu && !userMenu.classList.contains('hidden')) {
                userMenu.classList.add('hidden');
            }
        });

        // Logout handler
        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            window.location.href = '/login';
        });
    }
}

customElements.define('admin-navbar-component', AdminNavbarComponent);
