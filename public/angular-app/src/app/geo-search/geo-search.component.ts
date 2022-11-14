import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormBuilder} from '@angular/forms'
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.css']
})
export class GeoSearchComponent implements OnInit {

  searchForm!:FormGroup;
  ships!: Ship[];

  constructor(private shipService:ShipsDataService,private _formBuilder:FormBuilder) { 
    this.searchForm=this._formBuilder.group({
      latitude:"",
      longitude:"",
      distance:"",
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){    
    console.log(this.searchForm.value);
    this.shipService.getShipsGeo(this.searchForm.value.latitude,
      this.searchForm.value.longitude,
      this.searchForm.value.distance).then(response=>{
        this.ships=response;
      });

  }

}
