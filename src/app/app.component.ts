import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from './services/currencies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currencyArray = ['USD', 'EUR', 'RUB', 'UAH', 'PLN'];

  constructor(
  private currenciesService: CurrenciesService,
  private router: Router
) {
}
ngOnInit(): void {
  // localStorage.setItem('allEntries', JSON.stringify(this.curr))
  this.currenciesService.getCurrencies();
  // window.onload = () => {
  //   this.currenciesService.navigate('startScreen');
  // };
}
}
