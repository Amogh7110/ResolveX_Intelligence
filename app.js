const API =
"https://resolvex-intelligence.onrender.com/device"


let selectedDevice = ""


document
.getElementById("deviceSelect")
.addEventListener("change",

(e)=>{

selectedDevice=e.target.value

})


function appendChat(sender,text){

const box =
document.getElementById("chatBox")

box.innerHTML +=

`<p><strong>${sender}:</strong> ${text}</p>`

}


async function sendMessage(){

if(!selectedDevice){

appendChat(
"ResolveX",
"Select device first"
)

return

}

const question =
document.getElementById("message").value


const res = await fetch(

`${API}/ask`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

device:selectedDevice,
question:question

})

}

)

const data =
await res.json()

appendChat("You",question)

appendChat("ResolveX",data.answer)

}


async function startLiveMonitoring(){

setInterval(async()=>{

const res =
await fetch(

`${API}/live-status/${selectedDevice}`

)

const data =
await res.json()

updateDashboard(data)

},3000)

}


function updateDashboard(data){

const dashboard =
document.getElementById("dashboard")

dashboard.innerHTML=""

for(const sensor in data){

dashboard.innerHTML+=`

<div class="metric">

<h3>${data[sensor]}</h3>

<p>${sensor}</p>

</div>

`

}

}


async function simulateDigitalTwin(){

const res =
await fetch(

`${API}/digital-twin/simulate`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

device:selectedDevice

})

}

)

const data =
await res.json()

appendChat(
"Digital Twin",
`${data.failed_component} failure (${data.severity})`
)

}


async function sensorDiagnostics(){

const sensor =
prompt("Enter sensor name")

const value =
prompt("Enter sensor value")

const res =
await fetch(

`${API}/sensor-diagnostics`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

device:selectedDevice,
sensor:sensor,
value:Number(value)

})

}

)

const data =
await res.json()

appendChat(
"Sensor Analysis",
JSON.stringify(data)
)

}


async function saveRepair(){

const symptom =
prompt("Symptom")

const solution =
prompt("Solution applied")

await fetch(

`${API}/log-repair`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

device:selectedDevice,
symptom:symptom,
solution:solution

})

}

)

appendChat(
"ResolveX",
"Repair stored successfully"
)

}