import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ApiRequestsService} from '../../../_services/api-requests.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-ver-top',
  templateUrl: './ver-top.component.html',
  styleUrls: ['./ver-top.component.css']
})
export class VerTopComponent implements OnInit {

	voluntarios = [];
	donantes = [];
  constructor(private data:DataShareService,
          public _location:Location,
          private requester:ApiRequestsService) 
  { 
    requester.get10HighScoredDonantes().then(donantes => this.donantes = donantes);
    requester.get10HighScoredVoluntarios().then(voluntarios => this.voluntarios = voluntarios);
  }
  ngOnInit() {
    this.data.cambiarTitulo("Clasificación");
  }

}
