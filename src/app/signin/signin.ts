import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-signin',
    imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
    templateUrl: './signin.html',
    styleUrl: './signin.css'
})
export class Signin implements OnInit {
    private builder = inject(FormBuilder)
    private router = inject(Router)
    private http = inject(HttpClient)
    errorMessage: string = ''
    showError: boolean = false


    ngOnInit() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    signInForm = this.builder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })

    logIn() {
        this.showError = false;
        this.errorMessage = '';

        console.log(this.signInForm);

        this.http.post('http://localhost:8888/HireMe/Auth.php', this.signInForm.value)
            .subscribe({
                next: (response: any) => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log('I will go to Dashboard');
                        this.router.navigate(['/dashboard'])
                    } else {
                        this.errorMessage = response.message || 'Sign in failed. Please try again.';
                        this.showError = true;
                    }
                },
                error: (error) => {
                    this.errorMessage = 'An error occurred. Please check your connection and try again.';
                    this.showError = true;
                    console.error('Error:', error);
                }
            })
    }

}
