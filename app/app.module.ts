import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { BaseComponent } from './base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { generatorServices } from './shared/generator-shared.module'; 
import { routing } from './app-routing.module';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        HttpModule,
        routing,
    ],
    declarations: [ 
        BaseComponent,
        DashboardComponent 
    ],
    providers: [ generatorServices ],
    bootstrap: [ BaseComponent ],
})
export class AppModule { }
