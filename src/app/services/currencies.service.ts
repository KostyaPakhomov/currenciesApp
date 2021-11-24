import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {CurrencyModel} from '../models/currency.model';
import {Router} from '@angular/router';

@Injectable()
export class CurrenciesService {
  private url: string = environment.api.urlCurrencies;
  allCurrencies: CurrencyModel[] = [];
  currenciesToShow: CurrencyModel[] = [];
  displayBlock = new ReplaySubject<string>(1);
  errorText = new Subject<string>();
  // currencyArray = ['USD', 'EUR', 'RUB', 'UAH', 'PLN'];
  currencyArray: string[] = [];
  remainingCurrency: CurrencyModel[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  getCurrencies(): void{

    this.http.get(this.url).subscribe((data: any) => {
      this.allCurrencies = data;
      this.getParamsFromLocaleStorage();
      this.createCurrencyTable(data);
      console.log(this.currenciesToShow);
      // this.displayBlock.next('currencies');
      this.navigate('startScreen');
    }, error => {
      this.errorText.next('Ошибка');
      this.displayBlock.next('errorInfo');
    });
  }
  getParamsFromLocaleStorage(): void{
    if (localStorage){
      const item = JSON.parse(localStorage.getItem('currencies') as string);
      if (item !== null){
        this.currencyArray = item;
      } else {
        this.currencyArray = ['USD', 'EUR', 'RUB', 'UAH', 'PLN'];
      }
    }
  }
  createCurrencyTable(currencies: CurrencyModel[]): void{
    this.currenciesToShow = currencies.filter((elem: CurrencyModel) => {
      return this.currencyArray.indexOf(elem.Cur_Abbreviation) !== -1;
    });
    this.remainingCurrency = currencies.filter((elem: CurrencyModel) => {
      return this.currencyArray.indexOf(elem.Cur_Abbreviation) === -1;
    });
    console.log(this.remainingCurrency);
  }
  addCurrency(chosenCurrency: CurrencyModel[]): void {
    chosenCurrency.forEach((elem: CurrencyModel) => this.currencyArray.push(elem.Cur_Abbreviation));
    this.createCurrencyTable(this.allCurrencies);
    localStorage.setItem('currencies', JSON.stringify(this.currencyArray));
  }
  deleteCurrency(deleteCurrency: CurrencyModel[]): void{
    const deletedCurrArr = deleteCurrency.map((elem: CurrencyModel) => elem.Cur_Abbreviation);
    this.currencyArray = this.currencyArray.filter((elem: string) => {
      return deletedCurrArr.indexOf(elem) === -1;
    });
    this.createCurrencyTable(this.allCurrencies);
    localStorage.setItem('currencies', JSON.stringify(this.currencyArray));
    console.log(this.currencyArray);
  }
  sortCurrencies(sortType: string): void{
    switch (sortType) {
      case 'rate':
        this.currenciesToShow.sort((a: CurrencyModel, b: CurrencyModel) => {
          return a.Cur_OfficialRate > b.Cur_OfficialRate ? 1 : -1;
        });
        break;
      case 'name':
        this.currenciesToShow.sort((a: CurrencyModel, b: CurrencyModel) => {
          return a.Cur_Abbreviation > b.Cur_Abbreviation ? 1 : -1;
        });
        break;
      case 'numberUnits':
        this.currenciesToShow.sort((a: CurrencyModel, b: CurrencyModel) => {
          return a.Cur_Scale > b.Cur_Scale ? 1 : -1;
        });
        break;
    }
  }
  navigate(url: string): void{
    switch (url) {
      case 'startScreen':
        this.displayBlock.next('currencies');
        break;
    }
    this.router.navigateByUrl(`/${url}`).then();
  }
}
