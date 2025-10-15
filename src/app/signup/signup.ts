import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './signup.html',
    styleUrl: './signup.css'
})
export class Signup {
    private builder = inject(FormBuilder);
    
    signUpForm = this.builder.group({
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        passWord: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        confirmPassword: ["", [Validators.required]]
    })


    register() {
        // console.log(this.firstName, this.lastName, this.email, this.passWord, this.confirmPassword);
        console.log(this.signUpForm.valid);
    }
}
