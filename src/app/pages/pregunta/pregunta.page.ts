import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string='';  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {       
      const state = this.router.getCurrentNavigation()?.extras?.state;
      if (state && state['usuario']) {
        this.usuario = state['usuario'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }


  public validarRespuestaSecreta(): void{
  if(this.usuario?.respuestaSecreta ===this.respuesta) {
    alert('CORRECTO!!! TU CLAVE ES: ' + this.usuario.password)
  }
  else{
    alert('TU RESPUESTA ES INCORRECTA');
  }
} 

}
