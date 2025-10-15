import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    imports: [FormsModule],
    templateUrl: './signup.html',
    styleUrl: './signup.css'
})
export class Signup {
    firstName: string = "";
    lastName: string = "";
    email:string = "";
    passWord:string = "";
    confirmPassword:string = "";

    register() {
        console.log(this.firstName, this.lastName, this.email, this.passWord, this.confirmPassword);
        
    }
}
