import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-homepage',
    imports: [RouterLink],
    templateUrl: './homepage.html',
    styleUrl: './homepage.css',
    standalone: true
})
export class Homepage {
    private router = inject(Router)

    signUp() {
        this.router.navigate(['/signup'])
    }

    signIn() {
        this.router.navigate(['/signin'])
    }
}
