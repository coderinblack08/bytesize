require("dotenv").config();
import axios from "axios";


const getDate = () => {
    let d = new Date();
    let year = d.getFullYear(); // 2023
    let month = (d.getMonth() + 1).length == 1 ? `0${d.getMonth() + 1}`: d.getMonth() + 1;

    return `${year}-${}-${d.getDate()}`;
}
const getNews = (keyword, date) => {
  // keyword: String: business
  // Date: Array: [2023-02-19, 2023-02-20]

  axios
    .get(
      `https://newsapi.org/v2/everything?q=${keyword}&from=${date[0]}&to=${date[1]}&sortBy=popularity&apiKey=`
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
