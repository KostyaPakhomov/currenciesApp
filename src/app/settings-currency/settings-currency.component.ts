import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';
import {CurrencyModel} from '../models/currency.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-settings-currency',
  templateUrl: './settings-currency.component.html',
  styleUrls: ['./settings-currency.component.scss']
})
export class SettingsCurrencyComponent implements OnInit {
  displayBlock = 'wait';
  currenciesAdd = new FormControl();
  currenciesDelete = new FormControl();
  remainingCurrency!: CurrencyModel[];
  chosenCurrencies: CurrencyModel[] = [];
  deletedCurrencies: CurrencyModel[] = [];
  availableCurrencies: CurrencyModel[] = [];
  selectedSort = '';
  checkAdd = false;
  checkDelete = false;
  constructor(
    private currenciesService: CurrenciesService
  ) { }

  ngOnInit(): void {
    this.displayBlock = 'settings';
    this.prepareSettings();
  }
  prepareSettings(): void{
    this.remainingCurrency = this.currenciesService.remainingCurrency;
    this.availableCurrencies = this.currenciesService.currenciesToShow;
  }
  goToCurrencies(): void{
    this.currenciesService.navigate('startScreen');
  }
  save(): void{
    if (this.checkAdd){
      this.currenciesService.addCurrency(this.chosenCurrencies);
    }
    if (this.checkDelete){
      this.currenciesService.deleteCurrency(this.deletedCurrencies);
    }
    if (this.selectedSort !== ''){
      this.currenciesService.sortCurrencies(this.selectedSort);
    }
    setTimeout(() => this.currenciesService.navigate('startScreen'), 100);
    console.log(this.chosenCurrencies);
  }
}
