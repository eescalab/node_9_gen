import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/core/services/login.service';
import { TiendaService } from 'src/app/core/services/tienda.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  @Input() private usuarioId:string;
  listCart:any[];
  public url = environment.apiHost;
  

  constructor(
    private tService: TiendaService,
    public loginService: LoginService,
    public activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit() {
    

    this.tService.listarCarro().subscribe( (rpta:any) => {
    
      this.listCart = rpta.items;
      
    });
    
  }

  generarOrden() {

    let usuarioId = this.loginService.getUsuario()._id;
    this.tService.generarOrden(usuarioId).subscribe(rpta => {
      this.router.navigateByUrl('/privado/listarOrden');
      this.activeModal.dismiss();
    });

    

  }


}
