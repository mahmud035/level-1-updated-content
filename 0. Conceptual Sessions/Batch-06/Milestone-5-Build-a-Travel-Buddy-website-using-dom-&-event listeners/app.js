// step 1: create objects
// step 2: write a display function that will take an object
// step 3: invoke the function

var carObject = {
  vehicle: 'Car',
  imageUrl:
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',

  farePerKilo: 3,
  capacity: 4,
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?',
};

var boatObject = {
  vehicle: 'Car',
  imageUrl:
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',

  farePerKilo: 3,
  capacity: 4,
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?',
};
var bikeObject = {
  vehicle: 'Bike',
  imageUrl:
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60',

  farePerKilo: 2,

  capacity: 2,

  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?',
};
// farePerKilo -> per kilometer cost for hiring the vehicle

var busObject = {
  vehicle: 'Bus',
  imageUrl:
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',

  farePerKilo: 3,
  capacity: 30,
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?',
};

const servicesArray = [boatObject, bikeObject, carObject, busObject];

function displayServices(service) {
  // step1 : access the main section by id
  // step2 : create a div element
  // step3: create innerHTML of the above div dynamically with service
  // step: append the div to main section

  // console.log(service);

  const mainSection = document.getElementById('main-section');
  const stringiFiedObj = JSON.stringify(service);
  const div = document.createElement('div');
  div.innerHTML = `
<div class="card mb-3 mx-auto" style="max-width: 800px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${service.imageUrl}" class="img-fluid rounded-start h-100" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Transport Mood : ${service.vehicle}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?</p>
        <p class="card-text"><small class="text-muted">Fare per kilo : ${service.farePerKilo} Capacity : ${service.capacity}</small></p>

        <!-- Button trigger modal -->
        <button onclick= 'handleBooking(${stringiFiedObj})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
         BOOK NOW
        </button>
      </div>
    </div>
  </div>
</div>`;

  mainSection.appendChild(div);

  // console.log(service);
}

function displayAllServices(servicesArray) {
  // for (const service of servicesArray) {
  //   displayServices(service);
  // }

  // using forEach()
  servicesArray.forEach((service) => {
    displayServices(service);
  });
}

displayAllServices(servicesArray);

// handle booking info
/**
 * 1. write the function name handle handleBooking
 * 2. it will have an object as parameter
 * 3.
 */

function handleBooking(object) {
  // console.log(object);
  const modalBody = document.getElementById('modal-body');
  const stringiFiedObj = JSON.stringify(object);

  modalBody.innerHTML = `
  <div class="card mx-auto" >
    <img src="${object.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Transport Mood : ${object.vehicle}</h5>
      <p class="card-text">Fare per kilo : ${object.farePerKilo}    Capacity : ${object.capacity}</p>
      
    <p><small class="text-muted" id="fare">Fare :  </small></p>
    <p><small class="text-muted" id="tax">Tax :  </small></p>
    <p><small class="text-muted" id="total-cost">Total Cost :  </small></p>

    <div class="d-flex mt-5" role="search">
      <input id= "distance-input"
      } class="form-control me-2" type="number" min = "0" placeholder="koto kilometer jaba" aria-label="Search" />
      <input id= "quantity-input"
       class="form-control me-2" type="number"  min = "0"    placeholder="koyta gari lagbe" aria-label="Search" />
      <button onclick= 'calculateCost(${stringiFiedObj})' class="btn btn-outline-success" type="submit">
        Submit
      </button>
    </div>
      
    </div>
  </div>
  
  `;
}

function calculateCost(object) {
  const distance = document.getElementById('distance-input').value;
  const quantity = document.getElementById('quantity-input').value;

  const fareDiv = document.getElementById('fare');
  fareDiv.innerHTML = distance * quantity * object.farePerKilo;

  // console.log(fareDiv);
}

document.getElementById('search-btn').addEventListener('click', (e) => {
  const value = document.getElementById('search-value').value;

  for (let i = 0; i < servicesArray.length; i++) {
    const element = servicesArray[i];
    if (value.toLowerCase() == element.vehicle.toLowerCase()) {
      document.getElementById('main-section').innerHTML = '';
      displayServices(element);
      return;
    }
  }

  alert('No service found');
});
