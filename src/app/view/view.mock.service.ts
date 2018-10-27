import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { ViewHttpService } from './view.http.service';

@Injectable({
    providedIn: 'root'
})
export class ViewMockService extends ViewHttpService {

    getView(menu) {
        let response: any;

        switch (menu) {
            case 'one':
                response = of({
                    code: 200,
                    message: 'OK',
                    data: {
                        path: 'one',
                        title: 'One',
                        children: [
                            {
                                path: 'oneone',
                                title: 'One point One'
                            },
                            {
                                path: 'onetwo',
                                title: 'One point Two',
                                children: [
                                    {
                                        path: 'onetwoone',
                                        title: 'one point two point one'
                                    }
                                ]
                            },
                        ]
                    }
                });
                break;
            case 'two':
                response = of({
                    code: 200,
                    message: 'OK',
                    data: {
                        path: 'two',
                        title: 'Two'
                    }
                });
                break;
            default:
                response = throwError({
                    code: 404,
                    message: 'Not Found'
                });
        }
        return response;
    }

}
