import { Component, OnInit } from '@angular/core';
import {DatosService} from './../_servicios/datos.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-legajo-consultas',
  templateUrl: './legajo-consultas.component.html',
  styleUrls: ['./legajo-consultas.component.scss']
})
export class LegajoConsultasComponent implements OnInit {
  private Datos;
  private titulos;
  private campos;
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public rowData;



      localeText = {    /*  selectAll: 'daSelect Allen',
      searchOoo: 'daSearch...',
      blanks: 'daBlanc',*/

      // for number filter and text filter
      filterOoo: 'flitrar por...',
   //   applyFilter: 'Aplicar Filtros...',
      equals: 'Igual',
      notEqual: 'Distinto',

      // for text filter
      contains: 'Contiene',
     notContains: 'No contiene',
      startsWith: 'Comienza con',
      endsWith: 'Termina con'
  };

  constructor(private ds: DatosService, private mensajesService: ToastrService) { }

  ngOnInit() {
    this.traeDatos();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.angularCompileRows = true;

  }
  traeDatos() {
    let titulos;
    this.ds.getDatos('Edificios').subscribe(ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        titulos = this.ds.getTitulos( JSON.parse(ped).Titulos, [2, 3, 4, 5]);
        this.armaHeaders(titulos.titulos, titulos.campos);
        this.rowData = JSON.parse(ped).Datos;
        this.gridApi.sizeColumnsToFit();

      } else {
          this.mensajesService.error(JSON.parse(ped).Status[0].Msg);
        }
      },
      error => this.mensajesService.error('ABM de Edificios - obtener edificios', error)
    );
  }
  armaHeaders(titulos: string[], campos: string[] ) {
    this.columnDefs = [];
    this.columnDefs.push( {headerName: '', field: '' ,   width: 30, cellRenderer : function(params)  {
      return ' <a class="text-danger" ng-click=="click()"> <i class="fa fa-trash-o"></i> </a>';
  } });
    this.columnDefs.push( {headerName: '', field: '' ,  cellClass: [ 'text-danger', 'fa fa-trash-o'],  width: 30 });

    for (let i = 0; i < titulos.length; i++) {

      this.columnDefs.push( {headerName: titulos[i], field: campos[i] , sortable: true, filter: true});
    }
  }
  click() {alert('hola'); }
}


/**
 * opcionnes de filtros
 * 
 * localeText = {
        // for filter panel
        page: 'daPage',
        more: 'daMore',
        to: 'daTo',
        of: 'daOf',
        next: 'daNexten',
        last: 'daLasten',
        first: 'daFirsten',
        previous: 'daPreviousen',
        loadingOoo: 'daLoading...',

        // for set filter
        selectAll: 'daSelect Allen',
        searchOoo: 'daSearch...',
        blanks: 'daBlanc',

        // for number filter and text filter
        filterOoo: 'daFilter...',
        applyFilter: 'daApplyFilter...',
        equals: 'daEquals',
        notEquals: 'daNotEqual',

        // for number filter
        lessThan: 'daLessThan',
        greaterThan: 'daGreaterThan',
        lessThanOrEqual: 'daLessThanOrEqual',
        greaterThanOrEqual: 'daGreaterThanOrEqual',
        inRange: 'daInRange',

        // for text filter
        contains: 'daContains',
        notContains: 'daNotContains',
        startsWith: 'daStarts dawith',
        endsWith: 'daEnds dawith',

        // the header of the default group column
        group: 'laGroup',

        // tool panel
        columns: 'laColumns',
        filters: 'laFilters',
        rowGroupColumns: 'laPivot Cols',
        rowGroupColumnsEmptyMessage: 'la drag cols to group',
        valueColumns: 'laValue Cols',
        pivotMode: 'laPivot-Mode',
        groups: 'laGroups',
        values: 'laValues',
        pivots: 'laPivots',
        valueColumnsEmptyMessage: 'la drag cols to aggregate',
        pivotColumnsEmptyMessage: 'la drag here to pivot',
        toolPanelButton: 'la tool panel',

        // other
        noRowsToShow: 'la no rows',

        // enterprise menu
        pinColumn: 'laPin Column',
        valueAggregation: 'laValue Agg',
        autosizeThiscolumn: 'laAutosize Diz',
        autosizeAllColumns: 'laAutsoie em All',
        groupBy: 'laGroup by',
        ungroupBy: 'laUnGroup by',
        resetColumns: 'laReset Those Cols',
        expandAll: 'laOpen-em-up',
        collapseAll: 'laClose-em-up',
        toolPanel: 'laTool Panelo',
        export: 'laExporto',
        csvExport: 'la CSV Exportp',
        excelExport: 'la Excel Exporto',

        // enterprise menu pinning
        pinLeft: 'laPin <<',
        pinRight: 'laPin >>',
        noPin: 'laDontPin <>',

        // enterprise menu aggregation and status bar
        sum: 'laSum',
        min: 'laMin',
        max: 'laMax',
        none: 'laNone',
        count: 'laCount',
        average: 'laAverage',

        // standard menu
        copy: 'laCopy',
        copyWithHeaders: 'laCopy Wit hHeaders',
        ctrlC: 'ctrl n C',
        paste: 'laPaste',
        ctrlV: 'ctrl n V'
}

 * 
 */