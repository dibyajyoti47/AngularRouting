import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { IProduct } from "./product";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ProductService } from "./product.service";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { error } from "util";



@Injectable()
export class ProductResolver implements Resolve <IProduct>{
    constructor(private productService: ProductService,
                private router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<IProduct>{
        let id = route.params['id'];
        if(isNaN(id)){
            console.log(`Product id was not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
                .map((product)=>{
                    if(product){
                        return product;
                    }else{
                        console.log(`Product was not found: ${id}`);
                        this.router.navigate(['/products']);
                        return null;
                    }
                })
                .catch((error) => {
                    console.log(`Retreival error: ${error}`);
                    this.router.navigate(['/products']);
                    return Observable.of(null);
                });
    }
}