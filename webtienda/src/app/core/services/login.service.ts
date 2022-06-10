import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Transaccion } from '../models/model_transaction';
import { ModelUsuario } from '../models/model_usuario';
import { TiendaService } from './tienda.service';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private host = environment.apiHost;
  private url = this.host + '/api/v1';

  constructor(
    private http: HttpClient,
    private tService: TiendaService,
    private jwtHelper: JwtHelperService
  ) { }


  estaAutenticado(): Observable<boolean> {

    // if (localStorage.getItem('token') === null)
    //   return of(false);

    // if (localStorage.getItem('usuario') === null)
    //   return false;


    let token = localStorage.getItem('token')
    let expirationDate = this.jwtHelper.getTokenExpirationDate(token);



    const dateToken = Number(expirationDate);
    const expiraDate = new Date(Date.now() - 2000 * 60);
    

    if (dateToken > expiraDate.getTime()) {

      let opt = {
        headers: {
          'Authorization': token
        }
      }



      return this.http.get(`${this.url}/login/renew`, opt)
        .pipe(
          map((rpta: any) => {
            localStorage.setItem('token', rpta.token)
            return true;
          }),
          catchError(error => {
            this.logout();
            return of(false)
          })

        );

    }
    if (dateToken > (new Date()).getTime()) {
      this.logout();
      return of(false);
    }


    return of(true);




  }




  isLogged(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario')) || {};
  }




  //////////////Signin


  login(email: String, password: String) {

    let data = {
      email,
      password
    }
    return this.http.post<Transaccion>(`${this.url}/login`, data)
      .pipe(


        tap((resp: any) => {
         

          let usuario = new ModelUsuario(
            resp.usuario.usuarioId,
            resp.usuario.nombre,
            resp.usuario.role
          );

          localStorage.setItem('token', resp.token)
          localStorage.setItem('usuario', JSON.stringify(usuario))
          this.tService.listarCarro().subscribe();



        })
      );

  }

  signin(formValue: any) {

    

    return this.http.post<Transaccion>(`${this.url}/singup`, formValue)
      .pipe(
        tap((resp: any) => {

          

          let usuario = new ModelUsuario(
            resp.usuario.usuarioId,
            resp.usuario.nombre,
            resp.usuario.role
          );

          localStorage.setItem('token', resp.token)
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.tService.listarCarro().subscribe();

        })
      );

  }

  logout() {

    return new Promise((resolve, reject) => {

      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      localStorage.removeItem('usuario');
      return resolve(true);

    });


  }




}
