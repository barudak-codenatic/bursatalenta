class SidebarComponent extends HTMLElement {
    constructor() {
        super();
        // Tidak menggunakan Shadow DOM agar bisa menggunakan Tailwind CSS
    }

    connectedCallback() {
        this.render();
        this.loadUserProfile();
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
            <div class="w-64 bg-white shadow-sm min-h-screen">
                <div class="p-6">
                    <!-- Profile Section -->
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            <img id="sidebarProfileImage" class="h-16 w-16 rounded-full" 
                                 src="https://ui-avatars.com/api/?name=User&color=7C3AED&background=EDE9FE" 
                                 alt="Profile">
                        </div>
                        <div>
                            <div id="sidebarProfileName" class="text-sm font-medium text-gray-900">Loading...</div>
                            <div class="text-xs text-gray-500">Job Seeker</div>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="space-y-1">
                        <a href="/profile" class="sidebar-link ${activePage === 'profile' ? 'bg-custom-blue text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            <svg class="${activePage === 'profile' ? 'text-white' : 'text-gray-400'} mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </a>

                        <a href="/my-applications" class="sidebar-link ${activePage === 'my-applications' ? 'bg-custom-blue text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            <svg class="${activePage === 'my-applications' ? 'text-white' : 'text-gray-400'} mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Aktivitas Lowongan
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Load user profile data
    loadUserProfile() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;

        const userName = currentUser.name || 'User';
        
        // Update sidebar profile name
        const sidebarProfileName = this.querySelector('#sidebarProfileName');
        if (sidebarProfileName) {
            sidebarProfileName.textContent = userName;
        }

        // Update sidebar profile image
        const sidebarProfileImage = this.querySelector('#sidebarProfileImage');
        if (sidebarProfileImage) {
            if (currentUser.photo) {
                // Use uploaded photo
                sidebarProfileImage.src = `/uploads/${currentUser.photo}`;
                sidebarProfileImage.alt = userName;
            } else {
                // Use avatar fallback
                const encodedName = encodeURIComponent(userName);
                sidebarProfileImage.src = `https://ui-avatars.com/api/?name=${encodedName}&color=7C3AED&background=EDE9FE`;
                sidebarProfileImage.alt = userName;
            }
        }
    }

    // Utility function for localStorage management
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    // Public method to update profile data
    updateProfile(userData) {
        const userName = userData.name || 'User';
        
        // Update profile name
        const sidebarProfileName = this.querySelector('#sidebarProfileName');
        if (sidebarProfileName) {
            sidebarProfileName.textContent = userName;
        }

        // Update profile image
        const sidebarProfileImage = this.querySelector('#sidebarProfileImage');
        if (sidebarProfileImage) {
            if (userData.photo) {
                sidebarProfileImage.src = `/uploads/${userData.photo}`;
                sidebarProfileImage.alt = userName;
            } else {
                const encodedName = encodeURIComponent(userName);
                sidebarProfileImage.src = `https://ui-avatars.com/api/?name=${encodedName}&color=7C3AED&background=EDE9FE`;
                sidebarProfileImage.alt = userName;
            }
        }
    }
}

// Define the custom element
customElements.define('sidebar-component', SidebarComponent);
