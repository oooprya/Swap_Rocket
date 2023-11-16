const searchForm = document.querySelector("form");
const exchangerResult = document.querySelector(".exchangers");
const tabRadio = document.querySelectorAll('input[name="get-tab"]')
const titleResults = document.getElementById("title_results");
const favoriteRecipes = document.querySelector(".favoriteRecipes");
const container = document.querySelector(".container");

let minSumVolue = 100
let itemTab = "buy"
let selle_or_buy = itemTab=="buy" ? true : false

tabRadio.forEach((e) => {
  e.addEventListener("change", function(e) {
    itemTab = e.target.value;
    selle_or_buy = itemTab=="buy" ? true : false
    console.log(itemTab, selle_or_buy);

  });
});


const filterObjects = (exchangers, searchQuery) => {
	const strToNumRange = (str) =>
  str
    .split(' ')
    .map((subStr) => +subStr)
    .filter((number) => !Number.isNaN(number));

  const filteredByCurrency = exchangers.filter((object) => object.currency[searchQuery.currency]).map((object) => ({
      ...object,
      currency: {
        title: searchQuery.currency,
        ...object.currency[searchQuery.currency],
      },
    }));

  return filteredByCurrency.filter((object) => {
    const arr = strToNumRange(object.currency.sum);
    sell_or_buy_value = selle_or_buy ? object.currency.sell : object.currency.buy
    console.log(arr, sell_or_buy_value);
    minSumVolue = arr[0]
    if (arr.length > 1) {
      return arr[0] <=searchQuery.amount && searchQuery.amount  <= arr[1];
    }
    console.log(minSumVolue);
    return searchQuery.amount >= arr[0];
  });
};

const descendExchangersSort = (exchangers, sellOrBuy) =>
	exchangers.sort( (a, b) => +b.currency[sellOrBuy] - +a.currency[sellOrBuy])

const ascendExchangersSort = (exchangers, sellOrBuy) =>
	exchangers.sort( (a, b) => +a.currency[sellOrBuy] - +b.currency[sellOrBuy])

const renderList = (data) => {
  const lowest_sale = 'Найдена самая низкая продажа'
  const high_buy = 'Найдена самая высокая покупка'

  titleResults.innerHTML = selle_or_buy ? lowest_sale : high_buy;
  const exchangerItem = (item) => `
		<div class="item">
      <span></span>
			<nav class="currency-tabs">
				<div class="tab-sell">${selle_or_buy ? 'продажа' : 'покупка'}</div>
			</nav>
			<div class="currency-data">
				<div class="currency-value"> ${selle_or_buy ? item.currency.sell : item.currency.buy} </div>
				<div class="currency-sum">
        ${item.currency.sum}
			</div>
		</div>
		<div class="exchanger-address">${item.address}</div>
		<div class="wrap-icon">
    <a target="_blank" href="https://www.google.com/maps/place/${item.address}+Одесса,+Одесская+область,+65000">
                  <svg width="50" height="49" viewBox="0 0 50 49" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M0.366211 24.8991C0.366211 16.2131 0.366211 11.8701 2.14011 8.59017C3.50288 6.07043 5.57067 4.00263 8.09041 2.63986C11.3703 0.865967 15.7133 0.865967 24.3994 0.865967H25.2281C33.9141 0.865967 38.2571 0.865967 41.537 2.63986C44.0568 4.00263 46.1246 6.07043 47.4873 8.59017C49.2612 11.8701 49.2612 16.2131 49.2612 24.8991C49.2612 33.5851 49.2612 37.9282 47.4873 41.2081C46.1246 43.7278 44.0568 45.7956 41.537 47.1584C38.2571 48.9323 33.9141 48.9323 25.2281 48.9323H24.3994C15.7133 48.9323 11.3703 48.9323 8.09041 47.1584C5.57067 45.7956 3.50288 43.7278 2.14011 41.2081C0.366211 37.9282 0.366211 33.5851 0.366211 24.8991Z"
                          fill="#51D86F" fill-opacity="0.8" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M24.3995 16.4277C21.1923 16.4277 18.5984 19.0216 18.5984 22.2288C18.5984 26.5796 24.3995 33.0023 24.3995 33.0023C24.3995 33.0023 30.2006 26.5796 30.2006 22.2288C30.2006 19.0216 27.6067 16.4277 24.3995 16.4277ZM20.2558 22.2287C20.2558 19.9415 22.1122 18.0851 24.3995 18.0851C26.6868 18.0851 28.5431 19.9415 28.5431 22.2287C28.5431 24.6155 26.1564 28.1873 24.3995 30.4166C22.6757 28.2039 20.2558 24.5906 20.2558 22.2287Z"
                          fill="#F5F5F5" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M24.3995 24.3006C25.5437 24.3006 26.4713 23.373 26.4713 22.2288C26.4713 21.0845 25.5437 20.157 24.3995 20.157C23.2552 20.157 22.3276 21.0845 22.3276 22.2288C22.3276 23.373 23.2552 24.3006 24.3995 24.3006Z"
                          fill="#F5F5F5" />
                  </svg>
                  Маршрут</a>
			<a href="tel:+38${item.telephone}">
      <svg width="50" height="49" viewBox="0 0 50 49" fill="none"
        xmlns="http://www.w3.org/2000/svg">
          <path
              d="M0.548096 24.9179C0.548096 16.2319 0.548096 11.8888 2.32199 8.60894C3.68476 6.0892 5.75256 4.0214 8.2723 2.65863C11.5522 0.884735 15.8952 0.884735 24.5812 0.884735H25.41C34.096 0.884735 38.439 0.884735 41.7189 2.65863C44.2387 4.0214 46.3065 6.0892 47.6692 8.60894C49.4431 11.8888 49.4431 16.2319 49.4431 24.9179C49.4431 33.6039 49.4431 37.9469 47.6692 41.2268C46.3065 43.7466 44.2387 45.8144 41.7189 47.1771C38.439 48.951 34.096 48.951 25.41 48.951H24.5812C15.8952 48.951 11.5522 48.951 8.2723 47.1771C5.75256 45.8144 3.68476 43.7466 2.32199 41.2268C0.548096 37.9469 0.548096 33.6039 0.548096 24.9179Z"
              fill="#51D86F" fill-opacity="0.8" />
          <path
              d="M17.0316 16.8958C15.9129 18.0063 16.1035 20.1692 17.3051 22.614C19.318 26.4434 22.4445 29.5727 26.272 31.5892C28.7167 32.7908 30.8797 32.9815 31.9902 31.8627M17.015 16.8792L18.3742 15.5119C18.7358 15.1536 19.2242 14.9525 19.7333 14.9525C20.2423 14.9525 20.7308 15.1536 21.0924 15.5119L23.8355 18.2549C24.1267 18.542 24.3134 18.9184 24.3659 19.324C24.4074 19.7186 24.3252 20.1165 24.1307 20.4624C23.9362 20.8084 23.639 21.0853 23.2802 21.255L21.4073 22.1913C22.8708 24.2293 24.6566 26.0153 26.6946 27.4787M31.9902 31.8544L33.3576 30.4952C33.5814 30.261 33.7461 29.9769 33.8383 29.6664C33.9362 29.3348 33.9432 28.983 33.8586 28.6477C33.7741 28.3124 33.601 28.0059 33.3576 27.7603L30.6145 25.0174C30.3273 24.7262 29.951 24.5394 29.5454 24.4869C29.1507 24.4454 28.7529 24.5277 28.407 24.7222C28.0611 24.9167 27.7841 25.2138 27.6145 25.5726L26.678 27.4455"
              stroke="white" stroke-width="1.65746" stroke-linecap="round"
              stroke-linejoin="round" />
      </svg>
      Звонить</a>
		</div>
	</div>`

  exchangerResult.innerHTML = data.map((item) => exchangerItem(item)).join('') ;
};

const handleSubmit = async (e) => {
	e.preventDefault()
	// const response = await fetch(process.env.API_URL)
	const response = await fetch('https://swap-rocket-currency-api.onrender.com/api/v1/exchangers/')
	const data = await response.json()
  const cur_value = itemTab
  const amount = e.target.querySelector('input[type="number"]').value;
	const currency = e.target.querySelector("select").value;

	const searchQuery = { cur_value, currency,  amount }

	const result = filterObjects(data.objects, searchQuery);

  const sorted = selle_or_buy ? descendExchangersSort(result, 'buy') : ascendExchangersSort(result, 'sell');

  renderList(sorted);
  exchangerResult.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });



  if (searchQuery.amount < minSumVolue){
   document.getElementById("exchangers_results").innerHTML = `Вы ввели суммуа ${amount} ${currency} \n  Минимальная сумма ${selle_or_buy ? 'продажи' : 'покупки'} ${minSumVolue} ${currency} `;
  }

  if (searchQuery.amount >= minSumVolue){

  }

}

searchForm.addEventListener('submit', handleSubmit)

// function generateHTML(objects) {
//   let generatedHTML = ``;

//   objects.forEach(data  => {

//       for (const key in data.currency) {
//         const summa = data.currency[key].sum
//         const strToNumRange = (str) => str.split(' ').map((subStr) => +subStr).filter((number) => !Number.isNaN(number));

//         if (strToNumRange(summa).length > 1){
//           // console.log(+searchQuery + '<=' + strToNumRange(summa)[1], +searchQuery <= strToNumRange(summa)[1]);
//           // console.log(strToNumRange(summa)[0] + '<=' + +searchQuery, strToNumRange(summa)[0] <= +searchQuery);
//           flag = strToNumRange(summa)[0] <= +amount && +amount <= strToNumRange(summa)[1]
//         }
//         if (strToNumRange(summa).length == 1){
//           flag = +amount >= strToNumRange(summa)[0]
//           // console.log(+searchQuery, strToNumRange(summa), flag )
//         }

//         if (flag) generatedHTML += `

//       <div class="item">
//           <nav class="currency-tabs">
//               <div class="tab-sell">Продажа</div>
//           </nav>
//           <div class="currency-data">
//               <div class="currency-value">${ data.currency[key].buy }</div>
//               <div class="currency-sum">${ data.currency[key].sum }<span class="currency-key"> ${key.toUpperCase()}</span></div>
//           </div>
//           <div class="exchanger-address">${data.address}</div>
//           <div class="wrap-icon">
//               <a target="_blank" href="https://maps.app.goo.gl/bdqnmcfXoC35S4jy9">
//
//                   Маршрут</a>
//               <a href="tel:+096 002 81 95">
//                   <svg width="50" height="49" viewBox="0 0 50 49" fill="none"
//                       xmlns="http://www.w3.org/2000/svg">
//                       <path
//                           d="M0.548096 24.9179C0.548096 16.2319 0.548096 11.8888 2.32199 8.60894C3.68476 6.0892 5.75256 4.0214 8.2723 2.65863C11.5522 0.884735 15.8952 0.884735 24.5812 0.884735H25.41C34.096 0.884735 38.439 0.884735 41.7189 2.65863C44.2387 4.0214 46.3065 6.0892 47.6692 8.60894C49.4431 11.8888 49.4431 16.2319 49.4431 24.9179C49.4431 33.6039 49.4431 37.9469 47.6692 41.2268C46.3065 43.7466 44.2387 45.8144 41.7189 47.1771C38.439 48.951 34.096 48.951 25.41 48.951H24.5812C15.8952 48.951 11.5522 48.951 8.2723 47.1771C5.75256 45.8144 3.68476 43.7466 2.32199 41.2268C0.548096 37.9469 0.548096 33.6039 0.548096 24.9179Z"
//                           fill="#51D86F" fill-opacity="0.8" />
//                       <path
//                           d="M17.0316 16.8958C15.9129 18.0063 16.1035 20.1692 17.3051 22.614C19.318 26.4434 22.4445 29.5727 26.272 31.5892C28.7167 32.7908 30.8797 32.9815 31.9902 31.8627M17.015 16.8792L18.3742 15.5119C18.7358 15.1536 19.2242 14.9525 19.7333 14.9525C20.2423 14.9525 20.7308 15.1536 21.0924 15.5119L23.8355 18.2549C24.1267 18.542 24.3134 18.9184 24.3659 19.324C24.4074 19.7186 24.3252 20.1165 24.1307 20.4624C23.9362 20.8084 23.639 21.0853 23.2802 21.255L21.4073 22.1913C22.8708 24.2293 24.6566 26.0153 26.6946 27.4787M31.9902 31.8544L33.3576 30.4952C33.5814 30.261 33.7461 29.9769 33.8383 29.6664C33.9362 29.3348 33.9432 28.983 33.8586 28.6477C33.7741 28.3124 33.601 28.0059 33.3576 27.7603L30.6145 25.0174C30.3273 24.7262 29.951 24.5394 29.5454 24.4869C29.1507 24.4454 28.7529 24.5277 28.407 24.7222C28.0611 24.9167 27.7841 25.2138 27.6145 25.5726L26.678 27.4455"
//                           stroke="white" stroke-width="1.65746" stroke-linecap="round"
//                           stroke-linejoin="round" />
//                   </svg>
//                   Звонить</a>
//           </div>
//       </div>
//     `;
//       }
//   });
//   searchResultDiv.innerHTML = generatedHTML;
// }
// function favoriteRecipesloading() {
//   let getJSON = []
//   const localStorageSize = window.localStorage.length
//   for (let i = 0; i < localStorageSize; i++) {
//     let json = window.localStorage.getItem(localStorage.key(i))
//     getJSON.push(JSON.parse(json))
//   }
//   console.log(getJSON);
//   function renderfavoriteRecipes() {
//     let renderfavoriteRecipes = '<div class="container"><h2 class="title">Favorite recipes</h2></div><div class="wrap-grid"> '
//     getJSON.map((res) => {
//       renderfavoriteRecipes += `
//         <a href="produkt.html#${res.id}" >
//         <div class="item" data-id="${res.id}">
//           <img src="${res.img_src }" alt="" loading="lazy">
//           <div class="flex-container">
//             <h3 class="title">${res.title}</h3>
//           </div>
//         </div>
//         <button class="remove">remove </button>
//         </a>
//         `});
//         renderfavoriteRecipes += `</div>`;
//   favoriteRecipes.innerHTML = renderfavoriteRecipes;
//   }
//   renderfavoriteRecipes()
// }
// if (window.localStorage.length > 0){
//   favoriteRecipesloading()
// }

