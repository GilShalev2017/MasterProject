import {Component, OnInit} from '@angular/core';
import {WebApiClientService} from './web-api-client.service';
import {Product} from './web-api-client.models';

@Component({
    selector: 'web-api-client',
    moduleId: module.id,
    templateUrl: 'web-api-client.component.html',
})

export class WebApiComponent implements OnInit {

    firstName: string;
    newProduct: Product;
    searchText: string;

    constructor(private webApisClientService: WebApiClientService) {

    }

    products: Product[];

    ngOnInit(): void {
        this.newProduct = {Id: "33", Name: "", Category: "", Price: "0"};

        this.getAllProducts();
    }

    getAllProducts() {
        this.webApisClientService.getAllProducts().subscribe((arrivedData: Product[]) => {
            this.populateProducts(arrivedData);
        });
    }

    updateProduct(product: Product){

        this.webApisClientService.updateProduct(product).subscribe(() => {
            toastr.success(`Updated product<br/>Product Name: ${product.Name}<br/>Product Category: ${product.Category}<br/>Product Price: ${product.Price}`, 'Product Updated', {timeOut: 5000});
            this.getAllProducts();
        });
    }

    deleteProduct(product: Product){
        this.webApisClientService.deleteProduct(product).subscribe(() => {
            toastr.success(`Deleted product<br/>Product Name: ${product.Name}<br/>Product Category: ${product.Category}<br/>Product Price: ${product.Price}`, 'Product Removed', {timeOut: 5000});
            this.getAllProducts();
        });
    }

    populateProducts(products: Product[]) {
        this.products = products
    }

    displayProduct(product: Product) {
        toastr.info(`Found product<br/>Product Name: ${product.Name}<br/>Product Category: ${product.Category}<br/>Product Price: ${product.Price}`, 'Product Removed', {timeOut: 5000});
    }

    searchSpecificProduct() {
        let foundProduct = this.products.find(x=>x.Name.includes(this.searchText));

        if(foundProduct) {
            this.webApisClientService.getProductByFirstName(foundProduct.Id).subscribe((arrivedData: Product) => {
                this.displayProduct(arrivedData);
            });
        }
    }

    createNewProduct() {

        if(!this.newProduct.Name || !this.newProduct.Category)
            return;

        this.newProduct.Id = (this.products.length+1).toString();

        this.webApisClientService.createNewProduct(this.newProduct).subscribe((arrivedData: Product) => {
            this.displayProduct(arrivedData);
            this.getAllProducts();
            this.newProduct.Id = ""
            this.newProduct.Name = "";
            this.newProduct.Category = "";
            this.newProduct.Price = "0";
        });
    }
}