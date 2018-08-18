import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate, PreloadAllModules } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/login/login.component";
import { RouteAuthGuard } from "./services/route-auth-guard";
import { AppRoutes } from './shared/models/enums';
import { SinglesectionComponent } from './components/singlesection/singlesection.component';

export const appRoutes: Routes = [
    {
        path: AppRoutes.Login,
        component: LoginComponent
    },
    {
        path: AppRoutes.Main,
        canActivate: [RouteAuthGuard],
        children: [
            {
                path: AppRoutes.Default,
                component: UserComponent
            },
            {
                path: ':id',
                component: SinglesectionComponent
            }
        ]
    },
    {
        path: AppRoutes.Default,
        redirectTo: AppRoutes.Login,
        pathMatch: 'full'
    },
    {
        path: "**",
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RouteAuthGuard
    ]
})
export class AppRoutingModule {}