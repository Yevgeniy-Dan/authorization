import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAssesmentCardsComponent } from './components/dashboard/user-assesment-cards/user-assesment-cards.component';
import { UserEffects } from './store/effects/user.effects';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { NgChartsModule } from 'ng2-charts';

import * as fromUser from './store/reducers/user.reducer';
import { GraphComponent } from './components/dashboard/graph/graph.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { UserTableComponent } from './components/dashboard/user-table/user-table.component';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserAssesmentCardsComponent,
    GraphComponent,
    NavigationComponent,
    UserTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    NgChartsModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    StoreModule.forRoot(
      { user: fromUser.reducer },
      { metaReducers: [fromUser.localStorageSyncReducer] }
    ),
    EffectsModule.forRoot([UserEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
