import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AuthGuard } from "./user/auth-guard.service";
import { SelectiveStrategy } from "./selective-startegy.service";
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { 
                path: 'products', 
                canLoad: [AuthGuard], 
                loadChildren: 'app/products/product.module#ProductModule',
                data: {preload: true}
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ],{preloadingStrategy: SelectiveStrategy, enableTracing: true})
    ],
    providers: [SelectiveStrategy],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}