import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';


@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public usuario: Usuario = new Usuario('', '', '', '', '');
  public loading= null;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = ''
  public horaFin: string = ''
  public horaInicio: string = ''
  public idAsignatura: string = ''
  public nombreAsignatura: string = ''
  public nombreProfesor: string = ''
  public seccion: string = ''
  public sede: string = ''

  

  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private animationController: AnimationController
  , private alertController: AlertController) {

this.activeroute.queryParams.subscribe(params => {      
  const navigation = this.router.getCurrentNavigation();
  if (navigation) {
    if (navigation.extras.state) { 
     
      this.usuario = navigation.extras.state['usuario'];
    } else {
     
      this.router.navigate(['/login']);
    }
  } else {
    this.router.navigate(['/login']);
  }
});
}



  public ngOnInit(): void {
  }





  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }



  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }



  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
        // Puedes realizar acciones adicionales con los datos QR aquí
        this.bloqueInicio = objetoDatosQR.bloqueInicio;
        this.bloqueTermino= objetoDatosQR.bloqueTermino;
        this.dia= objetoDatosQR.dia;
        this.horaFin= objetoDatosQR.horaFin;
        this.horaInicio= objetoDatosQR.horaInicio;
        this.idAsignatura= objetoDatosQR.idAsignatura;
        this.nombreAsignatura= objetoDatosQR.nombreAsignatura;
        this.nombreProfesor= objetoDatosQR.nombreProfesor;
        this.seccion= objetoDatosQR.seccion;
        this.sede= objetoDatosQR.sede;

  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file') as HTMLInputElement)

    this.bloqueInicio= 0;
    this.bloqueTermino= 0;
    this.dia= ''
    this.horaFin= ''
    this.horaInicio= ''
    this.idAsignatura= ''
    this.nombreAsignatura= ''
    this.nombreProfesor= ''
    this.seccion= ''
    this.sede= ''

    
  }


  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }





  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }
}
