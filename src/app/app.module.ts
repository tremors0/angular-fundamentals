import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GitSearchService} from './git-search.service';
import {GitSearchComponent} from './git-search/git-search.component';
import {FormsModule} from '@angular/forms';
import {HomePageComponent} from './home-page/home-page.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }, {
    path: 'search',
    redirectTo: 'search/angular/1',
    pathMatch: 'full',
  }, {
    path: 'search/:query',
    redirectTo: 'search/:query/1',
    pathMatch: 'full',
  }, {
    path: 'search/:query/:page',
    component: GitSearchComponent,
    data: {
      title: 'Git Search'
    }
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GitSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
