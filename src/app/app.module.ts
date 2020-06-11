import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebviewDirective } from '../webview.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { VideoViewComponent } from './video-view/video-view.component';
import { FormsModule } from '@angular/forms';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbFormFieldModule,
  NbIconModule,
  NbButtonModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    VideoViewComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
