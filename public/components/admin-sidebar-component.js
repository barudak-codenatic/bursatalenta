class AdminSidebarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
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
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&color=7C3AED&background=EDE9FE`;

        this.innerHTML = `
            <div class="w-64 bg-white shadow-sm h-screen sticky top-0">
                <div class="p-6">
                    <!-- Profile Section -->
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="h-16 w-16 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
                            <img class="h-16 w-16 rounded-full" src="${avatarUrl}" alt="${fullName}">
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${fullName}</div>
                            <div class="text-xs text-gray-500">Admin</div>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="space-y-1">
                        <a href="/admin/job-management" 
                           class="${activePage === 'job-management' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            <svg class="${activePage === 'job-management' ? 'text-indigo-500' : 'text-gray-400'} mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Manajemen Lowongan
                        </a>
                        <a href="/admin/job-approval" 
                           class="${activePage === 'job-approval' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            <svg class="${activePage === 'job-approval' ? 'text-indigo-500' : 'text-gray-400'} mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Persetujuan Lowongan
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('admin-sidebar-component', AdminSidebarComponent);
