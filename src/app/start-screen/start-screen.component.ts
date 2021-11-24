import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrenciesService} from '../services/currencies.service';
import {Subscription} from 'rxjs';
import {CurrencyModel} from '../models/currency.model';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, OnDestroy {
  displayBlock = 'wait';
  displayBlockSubscription!: Subscription;
  errorText = '';
  errorTextSubscription!: Subscription;
  currencies: CurrencyModel[] = [];
  constructor(
    private currenciesService: CurrenciesService
  ) { }

  ngOnInit(): void {
    this.displayBlockSubscription = this.currenciesService.displayBlock.subscribe((data: string) => {
      this.displayBlock = data;
      switch (data) {
        case 'currencies':
          this.currencies = this.currenciesService.currenciesToShow;
          break;
      }
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите данные';
      this.displayBlock = 'errorInfo';
    });
    this.errorTextSubscription = this.currenciesService.errorText.subscribe((data: string) => {
      this.errorText = data;
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите данные';
      this.displayBlock = 'errorInfo';
    });
  }
  ngOnDestroy(): void {
    this.displayBlockSubscription.unsubscribe();
    this.errorTextSubscription.unsubscribe();
    // this.currenciesSubscription.unsubscribe();
  }

  reloadSession(): void{
    this.currenciesService.getCurrencies();
  }

  goToSettings(): void{
    this.currenciesService.navigate('settingsCurrency');
  }


}
