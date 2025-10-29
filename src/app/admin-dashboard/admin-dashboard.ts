import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface User {
    id: string;
    name: string;
    type: 'customer' | 'artisan';
    email: string;
    status: 'active' | 'inactive' | 'suspended';
    joinedDate: string;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
    // Responsive sidebar state
    isSidebarOpen = false;
    isSidebarCollapsed = false;
    private touchStartX = 0;
    private touchStartY = 0;
    private touchEndX = 0;
    private readonly swipeThreshold = 60; // px
    private readonly edgeZone = 30; // px from left edge
    // Platform Statistics
    stats = {
        totalUsers: 1547,
        totalArtisans: 892,
        totalCustomers: 655,
        totalRevenue: 15750000
    };

    // Recent Users
    recentUsers: User[] = [
        {
            id: 'USR001',
            name: 'John Doe',
            type: 'customer',
            email: 'john.doe@email.com',
            status: 'active',
            joinedDate: '2024-01-15'
        },
        {
            id: 'ART001',
            name: 'Chukwudi Okafor',
            type: 'artisan',
            email: 'chukwudi@email.com',
            status: 'active',
            joinedDate: '2024-01-14'
        },
        {
            id: 'USR002',
            name: 'Jane Smith',
            type: 'customer',
            email: 'jane.smith@email.com',
            status: 'active',
            joinedDate: '2024-01-13'
        },
        {
            id: 'ART002',
            name: 'Tunde Williams',
            type: 'artisan',
            email: 'tunde@email.com',
            status: 'inactive',
            joinedDate: '2024-01-12'
        }
    ];

    ngOnInit() {
        this.initializeCharts();
        this.initializeAOS();
    }

    // Sidebar controls (mobile)
    toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
    closeSidebar() { this.isSidebarOpen = false; }
    toggleCollapse() { if (typeof window !== 'undefined' && window.innerWidth >= 992) this.isSidebarCollapsed = !this.isSidebarCollapsed; }

    initializeCharts() {
        // Revenue Chart (Bar)
        const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                    datasets: [{
                        label: 'Revenue (₦)',
                        data: [1950000, 2250000, 2550000, 2850000, 3150000, 3450000],
                        backgroundColor: 'rgba(139, 92, 246, 0.8)',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '₦' + (value as number / 1000000).toFixed(1) + 'M';
                                }
                            }
                        }
                    }
                }
            });
        }

        // User Growth Chart (Line)
        const userGrowthCtx = document.getElementById('userGrowthChart') as HTMLCanvasElement;
        if (userGrowthCtx) {
            new Chart(userGrowthCtx, {
                type: 'line',
                data: {
                    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                    datasets: [
                        {
                            label: 'Customers',
                            data: [420, 465, 510, 555, 600, 655],
                            borderColor: '#16a34a',
                            backgroundColor: 'rgba(22, 163, 74, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Artisans',
                            data: [550, 625, 700, 775, 850, 892],
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // User Distribution Chart (Pie)
        const userDistCtx = document.getElementById('userDistChart') as HTMLCanvasElement;
        if (userDistCtx) {
            new Chart(userDistCtx, {
                type: 'pie',
                data: {
                    labels: ['Customers', 'Artisans'],
                    datasets: [{
                        data: [655, 892],
                        backgroundColor: [
                            'rgba(22, 163, 74, 0.8)',
                            'rgba(37, 99, 235, 0.8)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    initializeAOS() {
        if (typeof window !== 'undefined') {
            import('aos').then(AOS => {
                AOS.default.init({
                    duration: 800,
                    once: true,
                    offset: 100
                });
            });
        }
    }

    getStatusClass(status: string): string {
        return `status-${status}`;
    }

    getUserTypeClass(type: string): string {
        return type === 'customer' ? 'badge-customer' : 'badge-artisan';
    }

    // Swipe gesture support for mobile
    @HostListener('window:touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        if (typeof window === 'undefined' || window.innerWidth >= 992) return;
        const touch = event.changedTouches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }

    @HostListener('window:touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        if (typeof window === 'undefined' || window.innerWidth >= 992) return;
        const touch = event.changedTouches[0];
        this.touchEndX = touch.clientX;
        const dx = this.touchEndX - this.touchStartX;

        if (!this.isSidebarOpen && this.touchStartX <= this.edgeZone && dx > this.swipeThreshold) {
            this.isSidebarOpen = true;
            return;
        }
        if (this.isSidebarOpen && dx < -this.swipeThreshold) {
            this.isSidebarOpen = false;
        }
    }
}
