import { HomeModule } from './modules/home/home.module';
import { TrendingSeriesModule } from './modules/trending-series/trending-series.module';
import { AboutModule } from './modules/about/about.module';
import { DetailedMovieModule } from './modules/detailed-movie/detailed-movie.module';
import { TrendingMoviesModule } from './modules/trending-movies/trending-movies.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DetailedSeriesModule } from './modules/detailed-series/detailed-series.module';
import { TmdbConfigService } from './shared/services/tmdb-config.service';
import { DetailedPersonModule } from './modules/detailed-person/detailed-person.module';
import { TestModule } from './modules/test/test.module';

export function configProviderFactory(provider: TmdbConfigService) {
  return () => provider.loadConfig();
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TrendingMoviesModule,
    DetailedMovieModule,
    HttpClientModule,
    AboutModule,
    TrendingSeriesModule,
    DetailedSeriesModule,
    HomeModule,
    DetailedPersonModule,
    TestModule
 
  ],
  providers: [
    TmdbConfigService,
    {
      provide: APP_INITIALIZER, 
      useFactory: configProviderFactory, 
      deps: [TmdbConfigService], 
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
