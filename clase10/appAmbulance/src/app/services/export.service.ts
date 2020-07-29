import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ChoiceExport } from '../enums/choices-export.enum';
import { HttpClient } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private http: HttpClient) {}

  exportToExcel(content: any[], title: string): void {
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(content);
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, sheet, title);
    XLSX.writeFile(book, 'ExportExcel.xlsx');
  }

  exportToPDF(content: any, choice: ChoiceExport): void {
    switch (choice) {
      case ChoiceExport.PDF_OPEN:
        pdfMake.createPdf(content).open();
        break;
      case ChoiceExport.PDF_DOWNLOAD:
        pdfMake.createPdf(content).download();
        break;
      case ChoiceExport.PDF_PRINT:
        pdfMake.createPdf(content).print();
        break;
    }
  }

  getImageAsBlob(url: string): Promise<Blob> {
    return this.http
      .get(url, {
        responseType: 'blob',
      })
      .toPromise();
  }
}
