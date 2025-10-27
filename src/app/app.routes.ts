import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Homepage } from './homepage/homepage';
import { Artisansignup } from './artisansignup/artisansignup';
import { Artisansignin } from './artisansignin/artisansignin';

export const routes: Routes = [
    {path: 'signup', component: Signup},
    {path: 'signin', component: Signin},
    {path: '', component: Homepage},
    {path: 'artisansignup', component: Artisansignup},
    {path: 'artisansignin', component: Artisansignin}
];