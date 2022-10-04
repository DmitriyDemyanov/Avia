import locations from "./store/locations";
import "../css/style.css";
import "./plugins";
import formUI from "./views/form";
import currencyUI from './views/currency';
import ticketsUI from './views/ticket';

document.addEventListener("DOMContentLoaded", () => {

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE, CODE, 2019-09, 2019-10
    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }

  initApp();

  const form = formUI.form;

  //Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });
});
