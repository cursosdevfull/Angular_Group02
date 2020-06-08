import { MensajeService } from './mensaje.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {
  constructor(private readonly mensajeService: MensajeService) {}

  registrar() {
    this.mensajeService.info('Usuario registrado');
    return true;
  }
}
