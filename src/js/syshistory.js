console.log('Hello World');

let sys_device = "sysInfo-5e_Mnlaj7fw1DhrF"
setInterval(function () {
  
  fetch(`https://fire-detection-xharf.herokuapp.com/syshistory/sid/${sys_device}`)
    .then(response => response.json())
    .then(({data:{sysHistory}}) => {
      document.getElementById('content').innerHTML = '';
      sysHistory.forEach((data,i) => {
        document.getElementById('content').innerHTML += `
        <tr class="text-center">
        <th scope="row">${i+1}</th>
        <td>${data.sys_device}</td>
        <td>${data.wifi_status}</td>
        <td>${data.bluetooth_status}</td>
        <td>${data.dht_status}</td>
        <td>${data.flame_status}</td>
        <td>${data.mq_status}</td>
        <td>${ new Date(data.created_at)}</td>
      </tr>`;
        
      });
    })
    .catch(error => console.error(error));

  }, 500);