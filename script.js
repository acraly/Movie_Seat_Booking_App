const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelectBox =  document.querySelector("#movie")
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const container = document.querySelector(".container")
 let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;


window.addEventListener("load",()=>{
 
  //get last selectedindexes, and last selected movie index and price
  displayUI();
  updateMovieInfo(price);
  // set last selected movie index and price
//   setMovieDataToStorage(movieSelectBox.selectedIndex,price);
});
const displayUI = () => {
    const selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectSeats"));
    if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length>0){
        notOccupiedSeats.forEach((seat, index) => {
            if (selectedSeatsFromStorage.indexOf(index) > -1){
                seat.classList.add("selected");
            }
            
        })
      }
    //   console.log(selectedSeatsFromStorage);
    }
// movieSelectBox.onchange = (e) => {
//      console.log(e.target.value);
// }
movieSelectBox.addEventListener("change",(e) =>{
  let price = e.target.value;
  updateMovieInfo(price);  // target (e) ile de da yapılabilir... 28.satırda
  //    console.log(price);
});


 const updateMovieInfo = (filmPrice) => {
   let selectedSeats = document.querySelectorAll(".row .seat.selected");
   //  console.log(selectedSeats);
   console.log(selectedSeats.length);

   const seatsIndexArray = [...selectedSeats].map((seat) =>[...notOccupiedSeats].indexOf(seat));
   localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArray)); //JSON.stringify  içerisine obje alır ve string hala çevirip lstorage atar.
    
   const selectedSeatCount = selectedSeats.length;
   count.innerText = selectedSeatCount;
   film.innerText =
     movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
   // film.innerText = movieSelectBox[e.target.selectedIndex].innerText.split('(')[0];
   // console.log(film.innerText);

   total.innerText = selectedSeatCount * parseFloat(filmPrice);
 }

container.addEventListener("click", e => {
        //   console.log(e.target);
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
         e.target.classList.toggle("selected");
        }
     
      let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
    //   console.log(price);

      updateMovieInfo(price);

});