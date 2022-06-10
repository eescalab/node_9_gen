import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/core/services/tienda.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @ViewChild('labelImport')
  labelImport: ElementRef;
  file: File;
  public productoForm = new FormGroup({
    producto_nombre: new FormControl('',),
    descripcion: new FormControl('',),
    precio: new FormControl('',),
    stock: new FormControl('',),
    categoria_nombre: new FormControl('',),
    imagen: new FormControl('',)
  });

  public lcategorias:any = [];

  
  constructor(
    private fb: FormBuilder,
    private publicService: TiendaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.publicService.getCategorias().subscribe(item => {
      this.lcategorias = item
      

    });

  }


  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // this.productoForm.get('imagen').setValue(file);
    
      this.labelImport.nativeElement.innerText = this.file.name
      

    }
  }

  onSubmit() {
    // const formData = new FormData();
    // formData.append('file', this.uploadForm.get('profile').value);
    this.publicService.registrarProducto(this.file, this.productoForm.value )
      .subscribe((rpta:any) => {
        if(rpta){
          this.router.navigateByUrl(`/tienda/${this.productoForm.get('categoria_nombre').value}`);
        }
      }, error => 
        console.log('error:', error)
        
      )
  }


}