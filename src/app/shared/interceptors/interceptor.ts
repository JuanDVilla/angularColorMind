import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Tokenmgr } from '../services/tokenmgr';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const tokenMgr = inject(Tokenmgr);
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
