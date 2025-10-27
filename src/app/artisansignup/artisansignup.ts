import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-artisansignup',
    imports: [FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './artisansignup.html',
    styleUrl: './artisansignup.css',
    standalone: true
})
export class Artisansignup implements OnInit {
    private builder = inject(FormBuilder);
    private http = inject(HttpClient)
    users: any = [];
    sameAs: boolean = false

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
        this.users.push(this.signUpForm.value)
        // localStorage['artisans'] = JSON.stringify(this.users);
        this.http.post('http://localhost:8888/HireMe/Auth.php', this.signUpForm.value).subscribe(response => { console.log(response) })
    }

    confirmPassword() {
        console.log(this.signUpForm.value.confirmPassword);

        if (this.signUpForm.value.confirmPassword === this.signUpForm.value.password) {
            this.sameAs = true
        }
    }
}
