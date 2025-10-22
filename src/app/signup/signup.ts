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
    sameAs: boolean = false

    ngOnInit() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });

        this.users = localStorage['users'] ? JSON.parse(localStorage['users']) : []
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
        // this.users.find(user=>{user.email === this.signUpForm.value.email})
        localStorage['users'] = JSON.stringify(this.users);
        this.signUpForm.value.firstName = ''
        this.signUpForm.value.lastName = ''
        this.signUpForm.value.email = ''
        this.signUpForm.value.passWord = ''
        this.signUpForm.value.confirmPassword = ''
    }

    confirmPassword() {
        console.log(this.signUpForm.value.confirmPassword);
        
        if (this.signUpForm.value.confirmPassword === this.signUpForm.value.passWord) {
            this.sameAs = true
        }
    }
}
