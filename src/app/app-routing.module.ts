import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./pages/authentication/authentication.component";
import { DetailProductComponent } from "./pages/detail-product/detail-product.component";
import { EventRegisterComponent } from "./pages/event-register/event-register.component";
import { EventsComponent } from "./pages/events/events.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListEventComponent } from "./pages/list-event/list-event.component";
import { ProductComponent } from "./pages/product/product.component";
import { ShoppingChartComponent } from "./pages/shopping-chart/shopping-chart.component";

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
        path:'product/:id',
        component:DetailProductComponent
    },
    {
        path:'event-register',
        component:EventRegisterComponent
    },
    {
        path:'shoping-chart',
        component:ShoppingChartComponent
    },{
        path:'list-event',
        component:ListEventComponent
    },{
        path:'event/:id',
        component:EventsComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }