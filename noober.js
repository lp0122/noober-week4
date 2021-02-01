async function pageLoaded() {
    let response = await fetch('https://kiei451.com/api/rides.json')
    let json = await response.json()
  
    // writes the returned JSON to the console
    console.dir(json)
    
    // 🔥 start here: write code to loop through the rides
  
    let outputElement = document.querySelector('.rides')
  
    for (let i=0; i<json.length; i++) {
      ride = json[i]
  
      // determine levelOfService
      if (ride.length > 1 ) {
        levelOfService = 'Noober Pool'
        } else if (ride[0].purpleRequested) {
            levelOfService = 'Noober Purple'
        } else if ( ride[0].numberOfPassengers > 3) {
            levelOfService = 'Noober XL'
        } else {levelOfService = 'Noober X'}

      // render HTML header

      outputElement.insertAdjacentHTML('beforeend',`
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${levelOfService}</span>
      </h1>
      `)

      let borderColor
      if (levelOfService == 'Noober Purple') {
          borderColor = 'border-purple-500'
      } else {borderColor = 'border-gray-900'}

      let numPassColor
      if (levelOfService == 'Noober Purple') {
          numPassColor = 'bg-purple-600'
      } else {numPassColor = 'bg-gray-600'}

      for (n=0; n<ride.length; n++) {
        passenger = ride[n]
        outputElement.insertAdjacentHTML('beforeend',`
        <div class="border-4 ${borderColor} p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${passenger.passengerDetails.first} ${passenger.passengerDetails.last}</h2>
            <p class="font-bold text-gray-600">${passenger.passengerDetails.phoneNumber}</p>
          </div>
          <div class="w-1/2 text-right">
            <span class="rounded-xl ${numPassColor} text-white p-2">
            ${passenger.numberOfPassengers} passengers
            </span>
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            <p>${passenger.pickupLocation.address}</p>
            <p>${passenger.pickupLocation.city}, ${passenger.pickupLocation.state} ${passenger.pickupLocation.zip}</p>
          </div>
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            <p>${passenger.dropoffLocation.address}</p>
            <p>${passenger.dropoffLocation.city}, ${passenger.dropoffLocation.state} ${passenger.dropoffLocation.zip}</p>
          </div>
        </div>
        </div>
        `)
      }

    }

  }
  window.addEventListener('DOMContentLoaded', pageLoaded)