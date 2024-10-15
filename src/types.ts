export interface Play {
  chico: string;
  jugador: string;
  tipoDeJuego: 'abierto' | 'parado';
  resultado: 'gol' | 'atajado' | 'desviado' | 'bloqueado';
  zona: string;
}