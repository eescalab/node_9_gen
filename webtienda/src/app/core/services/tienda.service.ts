import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Transaccion } from '../models/model_transaction';
import { expand, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

private host = environment.apiHost;
private url = this.host + '/api/v1';

public lcart: any;

constructor(
  private http: HttpClient
) { }


 
  ///////////////// Categorias ////////////////////////

  public getCategorias(): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url + "/categoria/");
  }

  ///////////////// Productos ////////////////////////

  public getProductos(): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url + "/producto/paginate2");
  }

  
  
  public getProductosByCategoria(categoria_nombre) {
    
    
    return this.http
      .get(this.url + "/producto/categoria/" + categoria_nombre).pipe(
        tap((rpta: Transaccion) => {
          

         
        })
      );
  }

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario')) || {};
  }

  ///////////////  Carro //////////////////////////////

  public getAddCarrito(productId): Observable<Transaccion> {

    let obj = {
      productoId: productId,
      usuarioId: this.getUsuario()._id
    }
    
    
    return this.http
      .post<any>(this.url + "/carro/add", obj)
        .pipe(
          tap(rpta => {
            
            
            this.lcart = rpta.docUsuario.cart;
            
            
          })
        );
  }

  public listarCarro(): Observable<any> {
    
    
    return this.http.get(this.url +"/carro/"+this.getUsuario()._id)
      .pipe(
        tap(rpta => {
          this.lcart = rpta;
        })
      );

  }

  ////////////////// ORDEN

  public listarOrden(userId) {
    

    return this.http.get(this.url + "/orden/listar/" + userId);

  }

  public generarOrden(userId) {
    

    return this.http.get(this.url + "/orden/generar/" + userId);

  }

  ////////////// PRODUCTO //////////////////
  get headers() {
    return {
      headers: {
        'x-token': 'this.token'
      }
    }
  }

  public registrarProducto(file: File, producto: any){


    
    
    const formData: FormData = new FormData();
    formData.append("producto_nombre", producto.producto_nombre );
    formData.append("descripcion", producto.descripcion );
    formData.append("precio", producto.precio );
    formData.append("stock", producto.stock );
    formData.append("categoria_nombre", producto.categoria_nombre);
    formData.append("imagen", file, file.name );
  
    
    
    // let token = this.loginService.token;
    
    // let header= new HttpHeaders({
    //   'Authorization': token,
      
    // });
     
    
    return this.http
      .post<Transaccion>(
        this.url + "/producto", 
        formData, 
        // { headers: header, withCredentials: true },
      );
  }



}
