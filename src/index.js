//how we are able to use the front end stuff
//browser display things

const { response } = require("express")

const userList = document.querySelector('#users-list')
const restaurantList = document.querySelector('#restaurants-list')

const renderUsers = (users) => {
  //const userId = window.location.hash.slice(1)
  const html = users.map(user =>  `
  <li>
    <a href= '/${user.id}'>
      ${user.name}
    </a>  
  </li>
  `).join('')

  userList.innerHTML = html
 
}

const renderReservations = (reservations) => {
  const html = reservations.map(reservation => `
    ${ reservation.restaurant.name }
  `)
}

window.addEventListener('hashchange', async() => {
  const userId = window.location.hash.slice(1);
  const url = `/api/users/${userId}/reservations`;
  const reservationsRes = await fetch('/api/reservations');
  const reservations = await response.json();
});

const renderRestaurants = (restaurants) => {
  //const restaurantId = window.location.hash.slice(1)
  const html = restaurants.map(restaurant =>  
  `<li>
    ${restaurant.name}  
  </li>
  `).join('')

  restaurantList.innerHTML = html
 
}

const init = async() => {
  try{
    const usersRes = await fetch('/api/users');
    const restaurantsRes = await fetch('api/restaurants')
    const users = await usersRes.json();
    const restaurants = await restaurantsRes.json();
    renderUsers(users);
    renderRestaurants(restaurants)
  }
  catch(ex){
    console.log(ex)
  }
}

init();

