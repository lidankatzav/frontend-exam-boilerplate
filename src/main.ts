import "./style.scss";
// keep the line above and write your code below.

const exchangeRateEndpoint: string =
  "https://currency-ror1.vercel.app/api/currency?";
const datesCurrenciesArrayEndpoint =
  "https://currency-ror1.vercel.app/api/dates-table";

const data = [];

const currencyCodes = {
  USD: "01",
  EUR: "27",
  GBP: "02",
  CAD: "06",
  AUD: "18",
  GPY: "31",
};

/**
 * Use these strings in the form select (drop-down) -
 * you can copy-paste into the HTML
 * and/or use them programmatically
 */

const currencyNames = [
  "USD (United States Dollar)",
  "EUR (Euro)",
  "GBP (Great Britain Pound)",
  "CAD (Canadian Dollar)",
  "AUD (Australian Dollar)",
  "GPY (Japanese Yen)",
];

window.addEventListener("DOMContentLoaded", (event) => {
  //   attachListeners();
  //   return populateTable();
  populateTable();
});

/*function attachListeners() {
  const currencyConverterForm = document.getElementById(
    "currency-converter-form"
  );
  currencyConverterForm.onsubmit = getExchangeRateFromForm;
}*/

/**
 * Complete the function below to get the exchange rate from the API
 */

async function getExchangeRateFromApi(dateCode: string, currencyCode: string) {
  const url =
    exchangeRateEndpoint + "rdate=" + dateCode + "&curr=" + currencyCode;
  const response: Response = await fetch(url);
  const data = await response.json();
  return String(data.CURRENCIES.CURRENCY.RATE);
}

/**
 * Complete the function below to get the data from the form,
 * send it to the API, present the result, and show/hide the spinner.
 * The two event methods prevent the form submission from reloading the page.
 */

async function getExchangeRateFromForm() {
  //   if (window.location.search) {
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const date: string = params.get("date");
  const curr: string = params.get("currency");
  const result = getExchangeRateFromApi(
    encodeURIComponent(date),
    encodeURIComponent(curr)
  );
  (document.getElementById("result") as HTMLElement).innerHTML = result;
  //   }
}

/**
 * Complete the function below to get the array of dates and currencies,
 * create table rows, get the exchange rates from the API,
 * present the results, and show/hide the spinner
 */

async function populateTable() {
  try {
    const response: Response = await fetch(
      "https://currency-ror1.vercel.app/api/dates-table"
    );
    const data = await response.json();
    for (const value of data) {
      add_row(value.date, value.currency);
    }
  } catch (e) {
    alert("Something bad happend, sorry!");
  }
}

function add_row(date: string, curr: string) {
  const tbody = document.getElementById("tbody") as HTMLElement;
  const tr: HTMLElement = document.createElement("tr");
  const rate: string = getExchangeRateFromApi(date, curr);
  //   (document.getElementById("result") as HTMLElement).innerHTML = rate;
  const tds: string[] = [date, curr, rate];
  tds.forEach((e) => {
    const td: HTMLElement = document.createElement("td");
    td.innerHTML = e;
    tr.append(td);
  });
  tbody.append(tr);
}
