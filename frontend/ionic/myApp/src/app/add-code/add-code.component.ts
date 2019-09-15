import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss'],
})
export class AddCodeComponent implements OnInit {

  encodeData: any;
  scannedData: { text: any; };
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner, private codes: AppServiceService) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() { }

  scanCode() {
    this.barcodeScanner.scan()
      .then((barcodeData: { text: any }) => {
        this.scannedData = barcodeData;
        this.codes.addCode({ code: barcodeData.text, name: 'newName' });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }
}
