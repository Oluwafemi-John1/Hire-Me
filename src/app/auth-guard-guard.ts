import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const authGuardGuard: CanActivateFn = (route, state) => {
    const token = localStorage['token'];
    const _http = inject(HttpClient);
    const _router = inject(Router);

    if(token) {
        const decoded:any = jwtDecode<JwtPayload>(token);
        const expTime = decoded.exp * 1000;
        const now = Date.now()
        if((now - expTime) < 3600) {
            return true
        } else {
            _router.navigate(['/signin'])
        }
    }

    _router.navigate(['/signin'])
    return false;
};
