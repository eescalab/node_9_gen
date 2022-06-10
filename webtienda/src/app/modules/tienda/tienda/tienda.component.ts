import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { TiendaService } from 'src/app/core/services/tienda.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  page = 1; pageSize = 6;
  public lmProducto: any[];
  public url = environment.apiHost;


  constructor(
    private tService: TiendaService,
    private activatedroute: ActivatedRoute,
    public loginService: LoginService,
  ) {
    
    
   }

  ngOnInit() {

    this.activatedroute.params.subscribe(data => {
      
      data 
        ? this.listarProductos(data.categoria_nombre)
        : this.listarProductos(data.categoria_nombre);
    })

  }




  listarProductos(categoria_nombre) {

    this.tService.getProductosByCategoria(categoria_nombre).subscribe(rpta => {
      
      this.lmProducto = rpta.items;
    });

    
  }

  addCarrito(productoId) {
    
    
    this.tService.getAddCarrito(productoId).subscribe();


  }

}
