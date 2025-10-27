import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-signin',
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './signin.html',
    styleUrl: './signin.css'
})
export class Signin implements OnInit {
    private builder = inject(FormBuilder)

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
        console.log(this.signInForm);
    }

}
