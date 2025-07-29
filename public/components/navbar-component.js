class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        // Tidak menggunakan Shadow DOM agar bisa menggunakan Tailwind CSS
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
        
        this.innerHTML = `
            <nav class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <img src="/assets/logo.png" alt="Bursa Talenta" class="h-12 w-auto mr-2">
                        </div>

                        <!-- Navigation Links -->
                        <div class="flex items-center space-x-8">
                            <a href="/dashboard" class="nav-link ${activePage === 'dashboard' ? 'text-custom-blue border-b-2 border-custom-blue' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 text-sm font-medium">
                                Home
                            </a>
                            <a href="/my-applications" class="nav-link ${activePage === 'my-applications' ? 'text-custom-blue border-b-2 border-custom-blue' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 text-sm font-medium">
                                My Applications
                            </a>
                        </div>

                        <!-- User Menu -->
                        <div class="flex items-center space-x-4">
                            <!-- User Dropdown -->
                            <div class="relative">
                                <button class="user-button flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                                    <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        JD
                                    </div>
                                    <span class="text-sm font-medium">John Doe</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                
                                <!-- Dropdown Menu -->
                                <div class="user-dropdown hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                                    <a href="/contact-sales" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hubungi Sales</a>
                                    <hr class="my-1">
                                    <a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    addEventListeners() {
        const userButton = this.querySelector('.user-button');
        const userDropdown = this.querySelector('.user-dropdown');

        // User menu toggle
        userButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            userDropdown?.classList.add('hidden');
        });

        // Prevent dropdown from closing when clicking inside
        userDropdown?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Public methods for external use
    toggleUserMenu() {
        const userDropdown = this.querySelector('.user-dropdown');
        userDropdown?.classList.toggle('hidden');
    }
}

// Define the custom element
customElements.define('navbar-component', NavbarComponent);
