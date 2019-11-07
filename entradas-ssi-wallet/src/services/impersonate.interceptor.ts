import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {hasExistingDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking/util";

// @Injectable()
// export class ImpersonateInterceptor implements HttpInterceptor {
//     constructor() {}
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * Si el search encuentra la cadena indicada, devolvera un numero con la posicion primera donde la encuentre
         * si no retornara un -1
         */
        // if (req.url.search('15.236.0.91:8080/4444') >= 0) {
        //     const impersonateReq = req.clone({headers: req.headers
        //             .set('Accept', '/')
        //             .set('Cache-Control','no-cache')
        //             .set('Postman-Token','1eee38e9-3eba-4b19-86eb-b7019b586c91,e9ba5cf6-bcc5-4694-8b96-e69954a58ed7')
        //             .set('cache-control','no-cache')
        //     });
        //     return next.handle(impersonateReq);
        // } else {
        //     return next.handle(req);
        // }
    // }
// }
