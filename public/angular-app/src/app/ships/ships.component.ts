import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { ShipsDataService } from '../ships-data.service';

export class Ship {
  #_id!: string;
  #vesslterms!: string;
  #feature_type!: string;
  #chart!: string;
  #latdec!: number;
  #londec!: number;
  #depth!: number;
  #sounding_type!: string;
  #history!: string;
  #quasou!: string;
  #watlev!: string;
  #coordinates!: number[];

  get _id() {return this.#_id;}
  get vesslterms() {return this.#vesslterms;}
  get feature_type() {return this.#feature_type;}
  get chart() {return this.#chart;}
  get latdec() {return this.#latdec;}
  get londec() {return this.#londec;}
  get depth() {return this.#depth;}
  get sounding_type() {return this.#sounding_type;}
  get history() {return this.#history;}
  get quasou() {return this.#quasou;}
  get watlev() {return this.#watlev;}
  get coordinates() {return this.#coordinates;}
  
  set _id(id) {this.#_id= id;}
  set vesslterms(vesslterms) {this.#vesslterms= vesslterms;}
  set feature_type(feature_type) {this.#feature_type= feature_type;}
  set chart(chart) {this.#chart= chart;}
  set latdec(latdec) {this.#latdec= latdec;}
  set londec(londec) {this.#londec= londec;}
  set depth(depth) {this.#depth= depth;}
  set sounding_type(sounding_type) {this.#sounding_type= sounding_type;}
  set history(history) {this.#history= history;}
  set quasou(quasou) {this.#quasou= quasou;}
  set watlev(watlev) {this.#watlev= watlev;}
  set coordinates(coordinates) {this.#coordinates= coordinates;}
}

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Ship[];
  types!: string[];
  count:number = 5;
  offset:number=0;
  type:string="ALL";
  disabledPrev:boolean=true;
  disabledNext:boolean=false;
  //paginationForm!:FormGroup;

  constructor(private shipService:ShipsDataService,private _formBuilder:FormBuilder) {
    /*this.paginationForm=this._formBuilder.group({
        count:5
        ,offset:0
    });*/
   }
  

  ngOnInit(): void {
    this.shipService.getShips(this.count,this.offset,this.type).then(response => this.fillShipsFromService(response));
    this.shipService.getShipsType().then(response=>{
      this.types=response;
      
    });
    
  }

  private fillShipsFromService(ships: Ship[]) {   
    this.ships= ships;
    this.checkDisabledNext();
  }

  /*onSubmit(){
    console.log(this.paginationForm.value.count);
    this.shipService.getShips(this.paginationForm.value.count).then(response => this.fillShipsFromService(response));
  }*/

  changeCount(event:any) {

    this.count=parseInt(event.target.value);    
    this.offset=0;
    this.shipService.getShips(this.count,this.offset,this.type).then(response => this.fillShipsFromService(response));    
    this.checkDisabledPrev();
    

  }
  changeType(event:any){
    this.type=event.target.value;
    this.offset=0;
    this.shipService.getShips(this.count,this.offset,this.type).then(response => this.fillShipsFromService(response));    
    this.checkDisabledPrev();   
    
  }
  previous(){
    this.offset=this.offset-this.count;
    this.shipService.getShips(this.count,this.offset,this.type).then(response => this.fillShipsFromService(response));    
    this.checkDisabledPrev();
    
  }
  next(){
    this.offset=this.offset+this.count;
    console.log(this.offset);
    this.shipService.getShips(this.count,this.offset,this.type).then(response => this.fillShipsFromService(response));    
    this.checkDisabledPrev();
    
  }

checkDisabledPrev(){
  if(this.offset-this.count<0){
    this.disabledPrev=true;
  }else{
    this.disabledPrev=false;
  }
}
checkDisabledNext(){
  console.log("this.ships.length",this.ships.length);
  if (this.ships.length<this.count){
    this.disabledNext=true;
  }else{
    this.disabledNext=false;
  }
}

}
