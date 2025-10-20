import { Component, OnInit, inject } from '@angular/core';
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

    ngOnInit() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    signUp() {
        this.router.navigate(['/signup'])
    }

    signIn() {
        this.router.navigate(['/signin'])
    }
}
