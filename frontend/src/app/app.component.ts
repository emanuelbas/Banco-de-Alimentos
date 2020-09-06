import { Component } from '@angular/core';
import { LoggerService, LoopBackConfig } from './_services/lbservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Banco de Alimentos';
  constructor(private log: LoggerService){
	  LoopBackConfig.setDebugMode(false);
	  this.log.info('Component is Loaded');
	  LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
	  LoopBackConfig.setApiVersion('api');
  }
}
