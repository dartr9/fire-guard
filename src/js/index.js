function changeClass(id, className1, className2) {
  document.getElementById(id).classList.add(className2);
  document.getElementById(id).classList.remove(className1);
  if ( document.getElementById(id).classList.contains(className1) )
      document.getElementById(id).classList.toggle(className2);
}

console.log('Hello World');

// let sys_device = "sysInfo-240D6Br2EA-7zFXY"
let sys_device = "sysInfo-5e_Mnlaj7fw1DhrF"

fetch(`https://fire-guard.up.railway.app`)
    .then(response => response.json())
    .then(({
      data: {
        sysInfo: {
          name: device_name,
          location
        }
      }
    }) => {
      document.getElementById('device-name').innerHTML = device_name;
      document.getElementById('device-location').setAttribute('src', location);
    })
    .catch(error => console.error(error));

setInterval(function () {
  fetch(`https://fire-detection-xharf.herokuapp.com/lastdatahistory/${sys_device}`)
    .then(response => response.json())
    .then(({
      data: {
        lastDataHistory: datahistory
      }
    }) => {
      document.getElementById('flash-message').innerHTML = "";
      document.getElementById('value-temp').innerHTML = datahistory.temperature;
      document.getElementById('value-humidity').innerHTML = datahistory.humidity;
      document.getElementById('value-gas').innerHTML = datahistory.gas_density.toPrecision(4);

      if (datahistory.temperature > 30 ) {
        changeClass('card-temperature', 'bg-darkgrey', 'bg-danger');
        changeClass('card-temperature', 'text-black', 'text-white');
        document.getElementById('card-text-temperature').innerHTML = "The temperature is too high!";
      } else {
          changeClass('card-temperature', 'bg-danger', 'bg-darkgrey');
          changeClass('card-temperature', 'text-white', 'text-black');
          document.getElementById('card-text-temperature').innerHTML = "The air temperature is safe to live in";
      }

      if (datahistory.humidity > 80 || datahistory.humidity < 45 ) {
        changeClass('card-humidity', 'bg-darkgrey', 'bg-danger');
        changeClass('card-humidity', 'text-black', 'text-white');
        document.getElementById('card-text-humidity').innerHTML = "The humidity of this room is not right!";
      } else {
          changeClass('card-humidity', 'bg-danger', 'bg-darkgrey');
          changeClass('card-humidity', 'text-white', 'text-black');
          document.getElementById('card-text-humidity').innerHTML = "The air humidity is safe to live in";
      }

      if (datahistory.gas_density > 30 ) {
        changeClass('card-gas', 'bg-darkgrey', 'bg-danger');
        changeClass('card-gas', 'text-black', 'text-white');
        document.getElementById('card-text-gas').innerHTML = "The air is in toxic level. Leave the room!";
      } else {
          changeClass('card-gas', 'bg-danger', 'bg-darkgrey');
          changeClass('card-gas', 'text-white', 'text-black');
          document.getElementById('card-text-gas').innerHTML = "The air is non-toxic and safe to live in";
      }


      if (datahistory.is_there_fire == true) {
        document.getElementById('value-flame').innerHTML = "YES";
        changeClass('card-fire', 'bg-darkgrey', 'bg-danger');
        changeClass('card-fire', 'text-black', 'text-white');
        document.getElementById('card-text-fire').innerHTML = "Flame detected. Please check the room.";
      } else {
        document.getElementById('value-flame').innerHTML = "NO";
        changeClass('card-fire', 'bg-danger', 'bg-darkgrey');
        changeClass('card-fire', 'text-white', 'text-black');
        document.getElementById('card-text-fire').innerHTML = "No flame detected, you can stay here";
      }
      document.getElementById('tanggal-data').innerHTML = new Date(datahistory.created_at);
    })
    .catch(error => {
      document.getElementById('flash-message').innerHTML = "Data History Connection Failed. Reconnecting..."
      console.error(error)}
      );


  fetch(`https://fire-detection-xharf.herokuapp.com/lastsyshistory/${sys_device}`)
    .then(response => response.json())
    .then(({
      data: {
        lastSysHistory: sysHistory
      }
    }) => {
      document.getElementById('status-wifi').innerHTML = sysHistory.wifi_status;
      document.getElementById('status-bluetooth').innerHTML = sysHistory.bluetooth_status;
      document.getElementById('status-dht11').innerHTML = sysHistory.dht_status;
      document.getElementById('status-flame').innerHTML = sysHistory.flame_status;
      document.getElementById('status-mq7').innerHTML = sysHistory.mq_status;
    }).catch(error => console.error(error));
    console.log('Hello World');
}, 500);