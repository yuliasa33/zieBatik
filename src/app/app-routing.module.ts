import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./pages/authentication/authentication.component";
import { ProductComponent } from "./pages/product/product.component";
import { HomeComponent } from "./pages/home/home.component";
import { EventRegisterComponent } from "./pages/event-register/event-register.component";
import { DetailProductComponent } from "./pages/detail-product/detail-product.component";

const routes:Routes = [
    {
        path:'',
        // loadComponent:async()=>(await import('./pages/home/home.component')).HomeComponent
        component:HomeComponent
    },
    {
        path:'login',
        component:AuthenticationComponent,
        data:{title:"login"}
    },
    {
        path:'Product',
        component:ProductComponent,
        data:{title:"Product"}
    },
    {
        path:'detail_product/:id',
        component:DetailProductComponent
    },
    {
        path:'event-register',
        component:EventRegisterComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }