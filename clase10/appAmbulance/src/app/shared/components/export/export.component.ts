import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ChoiceExport } from '../../../enums/choices-export.enum';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  constructor(private reference: MatBottomSheetRef<ExportComponent>) {}

  ngOnInit(): void {}

  download(evt, choice: number): void {
    evt.preventDefault();
    switch (choice) {
      case ChoiceExport.EXCEL:
        this.reference.dismiss(ChoiceExport.EXCEL);
        break;
      case ChoiceExport.PDF_OPEN:
        this.reference.dismiss(ChoiceExport.PDF_OPEN);
        break;
      case ChoiceExport.PDF_DOWNLOAD:
        this.reference.dismiss(ChoiceExport.PDF_DOWNLOAD);
        break;
      case ChoiceExport.PDF_PRINT:
        this.reference.dismiss(ChoiceExport.PDF_PRINT);
        break;
    }
  }
}
