import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';

import { APIView, View } from './view.model';
import { ViewHttpService } from './view.http.service';

@Injectable({
    providedIn: 'root'
})
export class ViewService {

    public title$ = new BehaviorSubject('Home');
    private view: Partial<APIView> = {};

    constructor(
        private router: Router,
        private titleService: Title,
        private dataService: ViewHttpService
    ) { }

    getView(routeParams): Observable<View> {
        const { menu } = routeParams;
        return this.cacheView(menu)
            .pipe(
                map(view => new View(view, routeParams)),
                tap(view => {
                    this.router.navigate(['/', ...view.path]);
                    this.titleService.setTitle(`${view.title} - My app`);
                    this.title$.next(`${view.title}`);
                })
            );
    }

    cacheView(menu): Observable<APIView> {
        if (!this.view[menu]) {
            this.view[menu] = this.dataService.getView(menu)
                .pipe(
                    map(res => res['data']),
                    shareReplay(1),
                    catchError(() => {
                        this.router.navigate(['/home'])
                        return throwError('error');
                    })
                );
        }
        return this.view[menu];
    }

}
