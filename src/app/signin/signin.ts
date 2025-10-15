import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './signin.html',
    styleUrl: './signin.css'
})
export class Signin {
    private builder = inject(FormBuilder)

    signInForm = this.builder.group({
        email: ["", [Validators.required, Validators.email]],
        passWord: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })

    logIn() {
        console.log(this.signInForm);
    }

}
