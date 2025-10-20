import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-signup',
    imports: [FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './signup.html',
    styleUrl: './signup.css',
    standalone: true
})


export class Signup implements OnInit {
    private builder = inject(FormBuilder);
    users: any = [];

    ngOnInit() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    signUpForm = this.builder.group({
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        passWord: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        confirmPassword: ["", [Validators.required]]
    })


    register() {
        // console.log(this.firstName, this.lastName, this.email, this.passWord, this.confirmPassword);
        // console.log(this.signUpForm.valid);
        this.users.push(this.signUpForm.value)
        localStorage['users'] = JSON.stringify(this.signUpForm.value);
    }
}
