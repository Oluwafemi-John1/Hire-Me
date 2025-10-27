import { Component, OnInit, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-homepage',
    imports: [RouterLink],
    templateUrl: './homepage.html',
    styleUrl: './homepage.css',
    standalone: true
})
export class Homepage implements OnInit {
    private router = inject(Router);
    year = new Date().getFullYear()
    isScrolled = false;

    ngOnInit() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isScrolled = scrollPosition > 50;
    }

    signUp() {
        this.router.navigate(['/signup'])
    }

    signIn() {
        this.router.navigate(['/signin'])
    }

    hireArtisan() {
        this.router.navigate(['/signup'])
    }

    joinAsArtisan() {
        this.router.navigate(['/artisansignup'])
    }
}
