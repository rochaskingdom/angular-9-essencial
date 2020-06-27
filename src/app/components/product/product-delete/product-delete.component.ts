import {Component, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.findProductById();
  }

  findProductById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!');
    });
    this.navigateToProducts();
  }

  cancel(): void {
    this.navigateToProducts();
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

}
