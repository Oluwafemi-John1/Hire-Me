import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import * as AOS from 'aos';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';


Chart.register(...registerables);

interface Artisan {
    id: number;
    name: string;
    skill: string;
    rating: number;
    avatar: string;
    status: 'active' | 'completed' | 'pending';
    amount: number;
}

interface JwtPayload {
    user_id: Number,
    email: String,
    first_name: String,
    role: String,
    iat: Number,
    exp: Number
}
@Component({
    selector: 'app-customer-dashboard',
    imports: [CommonModule, RouterLink],
    templateUrl: './customer-dashboard.html',
    styleUrl: './customer-dashboard.css',
    standalone: true
})
export class CustomerDashboard implements OnInit {
    customerName = '';
    payload:any = "";
    private _http = inject(HttpClient);
    private _router = inject(Router)
    // Responsive sidebar state
    isSidebarOpen = false;
    isSidebarCollapsed = false;
    private touchStartX = 0;
    private touchStartY = 0;
    private touchEndX = 0;
    private readonly swipeThreshold = 60; // px
    private readonly edgeZone = 30; // px from left edge

    // Statistics
    stats = {
        totalHired: 12,
        activeProjects: 5,
        completedProjects: 7,
        totalSpent: 450000
    };

    // Recent artisans hired
    recentArtisans: Artisan[] = [
        { id: 1, name: 'Adebayo Ogundimu', skill: 'Plumber', rating: 4.9, avatar: 'https://ui-avatars.com/api/?name=Adebayo+Ogundimu&background=16a34a&color=fff&size=50&bold=true', status: 'active', amount: 25000 },
        { id: 2, name: 'Chioma Okwu', skill: 'Electrician', rating: 4.8, avatar: 'https://ui-avatars.com/api/?name=Chioma+Okwu&background=2563eb&color=fff&size=50&bold=true', status: 'completed', amount: 35000 },
        { id: 3, name: 'Emeka Nwosu', skill: 'Carpenter', rating: 4.7, avatar: 'https://ui-avatars.com/api/?name=Emeka+Nwosu&background=f59e0b&color=fff&size=50&bold=true', status: 'pending', amount: 28000 },
        { id: 4, name: 'Fatima Abdullahi', skill: 'Painter', rating: 4.9, avatar: 'https://ui-avatars.com/api/?name=Fatima+Abdullahi&background=8b5cf6&color=fff&size=50&bold=true', status: 'active', amount: 20000 }
    ];

    spendingChart: any;
    categoryChart: any;

    ngOnInit(): void {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });

        setTimeout(() => {
            this.initSpendingChart();
            this.initCategoryChart();
        }, 100);

        const token = localStorage['token'];
        if(token) {
            this.payload = jwtDecode<JwtPayload>(token);
            this.customerName = this.payload.first_name;
            console.log(this.payload.user_id);
        }
    }

    logOut() {
        localStorage.removeItem('token');
        this._http.post('http://localhost:8888/HireMe/auth/logout', {customer_id: this.payload.user_id})
        .subscribe(response => {
            // route the user to the homepage
            this._router.navigate(['/'])
        })
    }

    // Sidebar controls (mobile)
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSidebar() {
        this.isSidebarOpen = false;
    }

    toggleCollapse() {
        // Only allow on desktop
        if (typeof window !== 'undefined' && window.innerWidth >= 992) {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        }
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

        // Open when swipe right from left edge
        if (!this.isSidebarOpen && this.touchStartX <= this.edgeZone && dx > this.swipeThreshold) {
            this.isSidebarOpen = true;
            return;
        }
        // Close when swipe left while open
        if (this.isSidebarOpen && dx < -this.swipeThreshold) {
            this.isSidebarOpen = false;
        }
    }

    initSpendingChart() {
        const ctx = document.getElementById('spendingChart') as HTMLCanvasElement;
        if (ctx) {
            this.spendingChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Monthly Spending (₦)',
                        data: [45000, 52000, 38000, 65000, 58000, 72000],
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '₦' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    initCategoryChart() {
        const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
        if (ctx) {
            this.categoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Others'],
                    datasets: [{
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: [
                            '#16a34a',
                            '#2563eb',
                            '#f59e0b',
                            '#8b5cf6',
                            '#64748b'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    getStatusClass(status: string): string {
        const classes: any = {
            'active': 'status-active',
            'completed': 'status-completed',
            'pending': 'status-pending'
        };
        return classes[status] || '';
    }
}
