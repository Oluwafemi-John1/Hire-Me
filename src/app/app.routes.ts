import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [
    {path: 'signup', component: Signup},
    {path: 'signin', component: Signin},
    {path: 'home', component: Homepage}
];