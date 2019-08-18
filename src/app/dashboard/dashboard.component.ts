import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboard: Dashboard;
  private condominiums: Array<Condominium>;
  isLoading = true;

  constructor(private dashboardService: DashboardService, private titleService: Title) {  }
    
  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Dashboard');

    this.dashboardService.getDashboard()
    .subscribe(result => {

      this.dashboard = result[0];
      this.condominiums = result[1];
      this.isLoading = false;
    });
  }

}
