import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'formsWithDinamicSelection';
  user: string = '';
  email: string = '';
  city: string = '';
  selectedCountry: string = '';

  countries = [
    { name: 'USA', value: 'usa' },
    { name: 'Canada', value: 'canada' },
    { name: 'UK', value: 'uk' },
  ];

  cities: { [key: string]: string[] } = {
    usa: ['New York', 'Los Angeles', 'Chicago'],
    canada: ['Toronto', 'Vancouver', 'Montreal'],
    uk: ['London', 'Manchester', 'Birmingham'],
  };

  ngOnInit() {
    this.selectedCountry = this.countries[0].value;
    this.updateCity(this.selectedCountry);
  }

  updateCity(country: string) {
    const cities = this.cities[country];
    this.city = cities ? cities[0] : '';
  }

  onCountryChange(country: string) {
    this.updateCity(country);
    console.log('onCountryChange - country:', country);
  }

  onSelectChange(event: Event) {
    console.log('onSelectChange - event:', event);
    console.log('onSelectChange - event target:', event.target);
    console.log(
      'onSelectChange - event target value:',
      (event.target as HTMLSelectElement).value
    );
  }

  getCitiesByCountry(country: string): string[] {
    return this.cities[country] || [];
  }

  /* onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const formData = {
        user: this.user,
        email: this.email,
        country: this.selectedCountry,
        city: this.city,
      };
      console.log('Form Submitted', formData);
    } else {
      alert('Please fill up the fields\nPor favor, preencha os campos');
    }
  } */

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const formData = {
        user: this.user,
        email: this.email,
        country: this.selectedCountry,
        city: this.city,
      };
      console.log('Form Submitted', formData);
      Swal.fire({
        title: 'Success!',
        text: 'Formulário enviado, verifique o console.log do navegador',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, preencha os campos',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
