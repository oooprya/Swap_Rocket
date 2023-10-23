const searchForm = document.querySelector("form");
const exchangerResult = document.querySelector(".exchangers");
const tabRadio = document.querySelectorAll('input[name="get-tab"]')
const titleResults = document.getElementById("title_results");
const favoriteRecipes = document.querySelector(".favoriteRecipes");
const container = document.querySelector(".container");


let itemTab = "buy"
let sale_or_buy = itemTab=="buy" ? true : false

tabRadio.forEach((e) => {
  e.addEventListener("change", function(e) {
    itemTab = e.target.value;
    sale_or_buy = itemTab=="buy" ? true : false
    console.log(itemTab, sale_or_buy);

  });
});
const filterMinSum = () => {

}

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
    console.log(arr, searchQuery.currency);
    if (arr.length > 1) {
      return arr[0] <=searchQuery.amount && searchQuery.amount  <= arr[1];
    }

    return searchQuery.amount >= arr[0];
  });
};

const renderList = (data) => {
  const lowest_sale = 'Найдена самая низкая продажа'
  const high_buy = 'Найдена самая высокая покупка'
  titleResults.innerHTML = sale_or_buy ? lowest_sale : high_buy;
  const exchangerItem = (item) => `
		<div class="item">
			<nav class="currency-tabs">
				<div class="tab-sell">Продажа</div>
			</nav>
			<div class="currency-data">
				<div class="currency-value"> ${sale_or_buy ? item.currency.sell : item.currency.buy} </div>
				<div class="currency-sum">
				${item.currency.sum}
				<span class="currency-key">${item.currency.title.toUpperCase()}</span>
			</div>
		</div>
		<div class="exchanger-address">${item.address}</div>
		<div class="wrap-icon">
			<a href="tel:+38${item.exchanger_info}">
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

  exchangerResult.innerHTML = data.map((item) => exchangerItem(item)).join('');
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

  // const minSumVolue = filterMinSum(currency);
  // if (result.length == 0){
  //   console.log(result.length == 0);
  //   titleResults.innerHTML = `Вы ввели суммуа ${amount}${currency} \n  Минимальная сумма покупки ${minSumVolue}  `;
  // }

	renderList(result);
  exchangerResult.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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

