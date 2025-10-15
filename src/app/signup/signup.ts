import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './signup.html',
    styleUrl: './signup.css'
})
export class Signup {
    private builder = inject(FormBuilder);
    
    signUPForm = this.builder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
        passWord: [""],
        confirmPassword: [""]
    })


    register() {
        // console.log(this.firstName, this.lastName, this.email, this.passWord, this.confirmPassword);
    }
}
