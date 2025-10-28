import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Job {
    id: string;
    customer: string;
    service: string;
    amount: number;
    status: 'pending' | 'in-progress' | 'completed';
    date: string;
}

@Component({
    selector: 'app-artisan-dashboard',
    imports: [CommonModule, RouterLink],
    templateUrl: './artisan-dashboard.html',
    styleUrl: './artisan-dashboard.css'
})
export class ArtisanDashboard implements OnInit {
    // Statistics
    stats = {
        totalJobs: 24,
        activeJobs: 5,
        completedJobs: 19,
        totalEarnings: 780000
    };

    // Recent Jobs
    recentJobs: Job[] = [
        {
            id: 'JOB001',
            customer: 'John Doe',
            service: 'Plumbing',
            amount: 35000,
            status: 'in-progress',
            date: '2024-01-15'
        },
        {
            id: 'JOB002',
            customer: 'Jane Smith',
            service: 'Electrical Work',
            amount: 50000,
            status: 'pending',
            date: '2024-01-14'
        },
        {
            id: 'JOB003',
            customer: 'Mike Johnson',
            service: 'Carpentry',
            amount: 45000,
            status: 'completed',
            date: '2024-01-13'
        },
        {
            id: 'JOB004',
            customer: 'Sarah Williams',
            service: 'Painting',
            amount: 30000,
            status: 'in-progress',
            date: '2024-01-12'
        }
    ];

    ngOnInit() {
        this.initializeCharts();
        this.initializeAOS();
    }

    initializeCharts() {
        // Earnings Chart (Line)
        const earningsCtx = document.getElementById('earningsChart') as HTMLCanvasElement;
        if (earningsCtx) {
            new Chart(earningsCtx, {
                type: 'line',
                data: {
                    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                    datasets: [{
                        label: 'Earnings (₦)',
                        data: [95000, 110000, 125000, 140000, 155000, 180000],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
                            position: 'bottom'
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

        // Job Status Chart (Doughnut)
        const jobStatusCtx = document.getElementById('jobStatusChart') as HTMLCanvasElement;
        if (jobStatusCtx) {
            new Chart(jobStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [{
                        data: [19, 3, 2],
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)'
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
}
