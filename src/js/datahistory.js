console.log('Hello World');

let sys_device = "sysInfo-5e_Mnlaj7fw1DhrF"
setInterval(function () {
  
  fetch(`https://fire-guard.up.railway.app`)
    .then(response => response.json())
    .then(({data:{dataHistory}}) => {
      document.getElementById('content').innerHTML = '';
      dataHistory.forEach((data,i) => {
        document.getElementById('content').innerHTML += `
        <tr class="text-center">
        <th scope="row">${i+1}</th>
        <td>${data.sys_device}</td>
        <td>${data.humidity}</td>
        <td>${data.temperature}</td>
        <td>${data.gas_density}</td>
        <td>${data.is_there_fire}</td>
        <td>${data.ask_for_help}</td>
        <td>${ new Date(data.created_at)}</td>
      </tr>`;
        
      });
    })
    .catch(error => console.error(error));

  }, 500);