// import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const authGuardGuard: CanActivateFn = (route, state) => {
    // const token = localStorage.getItem('token');
    // const _http = inject(HttpClient);
    const router = inject(Router);

    // if(token) {
    //     const decoded:any = jwtDecode<JwtPayload>(token);
    //     const expTime = decoded.exp * 1000;
    //     const now = Date.now()
    //     if((now - expTime) < 3600) {
    //         // console.log(now-expTime);
            
    //         return true;
    //     } else {
    //         router.navigate(['/signin'])
    //         return false;
    //     }
    // }

    // router.navigate(['/signin'])
    // return false;


    try {
        const token = localStorage.getItem('token');

        if (!token) {
            router.navigate(['/signin']);
            return false;
        }

        const decoded: any = jwtDecode<JwtPayload>(token);
        const expTime = decoded.exp * 1000;
        const now = Date.now();

        if ((now - expTime) < 3600) {
            return true;
        } else {
            // Token expired
            localStorage.removeItem('token'); // Clean up expired token
            router.navigate(['/signin']);
            return false;
        }
    } catch (error) {
        // Invalid token or decode error
        console.error('Auth guard error:', error);
        localStorage.removeItem('token'); // Clean up invalid token
        router.navigate(['/signin']);
        return false;
    }
};
