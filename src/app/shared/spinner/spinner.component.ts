import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean;

    constructor(public loader: LoadingService) { }

  ngOnInit(): void {
    this.loader.currentLoad.subscribe(data => this.isLoading = data);
  }

}
