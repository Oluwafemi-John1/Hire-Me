import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

@Component({
    selector: 'app-signin',
    imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
    templateUrl: './signin.html',
    styleUrl: './signin.css'
})
export class Signin implements OnInit {
    private builder = inject(FormBuilder)
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

        // Simulate login validation
        if (this.signInForm.valid) {
            // Add your login logic here
            // Example error handling:
            // this.errorMessage = 'Invalid email or password. Please try again.';
            // this.showError = true;
        }
    }

}
