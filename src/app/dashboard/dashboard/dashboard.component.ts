import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData :any;

  lineChartData = {
    labels: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta','Sabado'],
    datasets:[
      {
        label: 'Receita',
        data:[2500,2700,200,300,10,300,3400],
        borderColor:'#3366CC'
      },
      {
        label: 'Despesas',
        data:[1500,1700,2200,1300,110,3100,1400],
        borderColor:'#D62B00'
      }

    ]
  };

  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
  }


  configurarGraficoPizza(){
    this.dashboardService.lancamentosPorCategoria()
      .then(dados =>{
        this.pieChartData = {
          labels: dados.map(d => d.categoria.nome),
          datasets:[
            {
              data: dados.map(d => d.total),
              backgroundColor:['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };

      });

  }

}
