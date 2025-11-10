import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

@Component({
    selector: 'app-artisansignup',
    imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './artisansignup.html',
    styleUrl: './artisansignup.css',
    standalone: true
})
export class Artisansignup implements OnInit {
    private builder = inject(FormBuilder);
    private http = inject(HttpClient)
    private router = inject(Router)
    users: any = [];
    sameAs: boolean = false
    errorMessage: string = ''
    showError: boolean = false

    ngOnInit() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });

        this.users = localStorage['artisans'] ? JSON.parse(localStorage['artisans']) : []
    }

    signUpForm = this.builder.group({
        first_name: ["", [Validators.required, Validators.minLength(2)]],
        last_name: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        confirmPassword: ["", [Validators.required]]
    })


    register() {
        this.showError = false;
        this.errorMessage = '';

        this.users.push(this.signUpForm.value)
        // localStorage['artisans'] = JSON.stringify(this.users);
        this.http.post('http://localhost:8888/HireMe/auth/artisansignup', this.signUpForm.value)
            .subscribe({
                next: (response: any) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('I will go to Sign in');
                        this.router.navigate(['/artisansignin'])
                    } else {
                        this.errorMessage = response.message || 'Registration failed. Please try again.';
                        this.showError = true;
                    }
                },
                error: (error) => {
                    console.log(error);
                    this.errorMessage = 'An error occurred. Please check your connection and try again.';
                    this.showError = true;
                    console.error('Error:', error);
                }
            })
    }

    confirmPassword() {
        console.log(this.signUpForm.value.confirmPassword);

        if (this.signUpForm.value.confirmPassword === this.signUpForm.value.password) {
            this.sameAs = true
        }
    }
}
