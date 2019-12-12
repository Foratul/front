import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppStateService } from '../services/appstate.service';
declare let $


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modal: any

  constructor(private appState: AppStateService) {


  }

  ngOnInit() {

    $('#exampleModalCenter')
      .on('shown.bs.modal', () => {
        $('#myInput').trigger('focus')
      })
      .on('hidden.bs.modal', () => {
        this.modal.insertComentario = false
        setTimeout(() => {
          this.appState.setModal(false);
        }, 288)
        alert("evento hidden")
        $('#exampleModalCenter').toggle()
      }
      )

    console.log(this.modal)


    alert("CARGA MODAL component")

  }

  ngOnDestroy() { alert("componente modal destruido") }

}
