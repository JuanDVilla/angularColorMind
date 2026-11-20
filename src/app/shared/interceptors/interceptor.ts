import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserManager } from '../services/userManager';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const tokenMgr = inject(UserManager);
  const token = tokenMgr.getToken();

  if (!token) {
    return next(req);
  }

  const modified = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

  return next(modified);
};
