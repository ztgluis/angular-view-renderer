import { Component, OnInit } from '@angular/core';
import { ViewService } from './view/view.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title$;

    constructor(
        private viewService: ViewService
    ) { }

    ngOnInit() {
        this.title$ = this.viewService.title$;
    }

}
