import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { View } from './view.model';
import { ViewService } from './view.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    view: View;

  constructor(
      private activatedRoute: ActivatedRoute,
      private viewService: ViewService
  ) { }

  ngOnInit() {

    this.activatedRoute.params
    .pipe(
        switchMap(params => this.viewService.getView(params))
    )
    .subscribe(view => {
        this.view = view;
    })
  }

}
