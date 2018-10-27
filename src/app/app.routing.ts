import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';

export const EagerComponents = [
    HomeComponent,
    ViewComponent
];

@NgModule({
  imports: [RouterModule.forRoot([
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: ':menu',
        component: ViewComponent
    },
    {
        path: ':menu/:nav',
        component: ViewComponent
    },
    {
        path: ':menu/:nav/:subnav',
        component: ViewComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
  ])],
  exports: [RouterModule]
})
export class RoutingModule { }
