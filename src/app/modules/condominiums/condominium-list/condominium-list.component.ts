import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condominium-list',
  templateUrl: './condominium-list.component.html',
  styleUrls: ['./condominium-list.component.scss']
})
export class CondominiumListComponent implements OnInit {

  @Input()
  condominiums: Array<Condominium>;
  @Input()
  isLoading = true;
  public searchText : string;


  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
  }
  
}
