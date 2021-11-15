import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData :any;

  lineChartData : any;

  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
    this.configurarGradicoLinha();
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

  configurarGradicoLinha(){
    this.dashboardService.lancamentosPorDia()
      .then(dados =>{

        const diasPorMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(d => d.tipo === 'RECEITA'), diasPorMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(d => d.tipo === 'DESPESA'), diasPorMes);

        this.lineChartData = {
          labels: diasPorMes,
          datasets:[
            {
              label: 'Receita',
              data:totaisReceitas,
              borderColor:'#3366CC'
            },
            {
              label: 'Despesas',
              data:totaisDespesas,
              borderColor:'#D62B00'
            }

          ]
        };
      })
  }

  private totaisPorCadaDiaMes(dados : any, diasDoMes: any){
    const totais : number[] = [];
    for (let dia of diasDoMes){
      let total = 0;

      for (let dado of dados){
        if (dado.dia.getDate() === dia){
          total = dado.total;

          break;
        }

      }

      totais.push(total);

    }

    return totais;
  }

  private configurarDiasMes(){
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias : number[] = [];

    for (let i = 1; i <= quantidade; i++){
      dias.push(i);
    }

    return dias;
  }

}
