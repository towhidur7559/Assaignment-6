// Global variable
const detailDiv = document.getElementById("details-div");
const mainDiv =document.getElementById("mainDiv");
const leftArea =document.getElementById("left-area");
const spinner =document.getElementById("spinner");
const rightArea =document.getElementById("right-area");
const noResult =`<h3 class="mx-auto text-center text-muted">No result found <i class="fa-solid fa-face-sad-tear"></i></h3>`;

//search button
document.getElementById("search-button").addEventListener('click', function(){
    const input=document.getElementById("input");
    input.style.border ="1px solid lightGray";
    leftArea.innerHTML="";
    rightArea.innerHTML="";
    detailDiv.className ="";
    spinner.style.display="block";
    if(input.value ===""){
        spinner.style.display="none";
        input.style.border ="1px solid red";
        mainDiv.innerHTML=noResult;
    }
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${input.value}`)
        .then(res => res.json())
        .then(data =>phoneSearch(data))
    }
})
// Search Result area
const phoneSearch = (data) =>{
    spinner.style.display="none";
    if(data.status === false){
        mainDiv.innerHTML=noResult
    }
    else{
        const phoneList =data.data.slice(0,19);
    mainDiv.innerHTML="";
    for (const phone of phoneList){
        const div =document.createElement("div");
        div.className="col"
        div.innerHTML=`
                  <div class="card h-100 border-0 shadow-lg">
                    <img class="p-3 w-50 h-auto mx-auto" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body mx-auto">
                      <h4 class="card-title">${phone.phone_name}</h4>
                      <p class="card-text text-center">Brand: ${phone.brand}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white mx-auto">
                      <button  onclick="detailsButton('${phone.slug}')" class="btn btn-primary mb-3">See Details</button>
                    </div>
                  </div>     
        `
        mainDiv.appendChild(div);
    }
    }
}
//  Details button area
const detailsButton =(details)=>{
    detailDiv.style.boxShadow ="none";
    leftArea.innerHTML="";
    rightArea.innerHTML="";
    spinner.style.display="block";
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(res => res.json())
    .then(data =>phoneDetails(data.data))
    window.scrollTo({
        top:400,
        left:0,
        behavior:"smooth"

    });
}

// phone details area
const phoneDetails =(data) =>{
    let sensors ="";    
    data.mainFeatures.sensors.forEach(element => {
        sensors=element+","+sensors;
        
    });
    let releaseDate ="";
    if(data.releaseDate === ""){
        releaseDate ="Releas date not found"
    }
    else{
        releaseDate =data.releaseDate;
    }
    console.log(data.others);
    console.log(data);
    let others ="";
    if(data.others === undefined){

    }
    else{
        others=`<p class="mb-2"><span class="span-width fw-bold">WLAN</span> : ${data.others?.WLAN}</p>
        <p class="mb-2"><span class="span-width fw-bold">Bluetooth</span> : ${data.others?.Bluetooth}</p>
        <p class="mb-2"><span class="span-width fw-bold">GPS</span> : ${data.others?.GPS}</p>
        <p class="mb-2"><span class="span-width fw-bold">NFC</span> : ${data.others?.NFC}</p>   
        <p class="mb-2"><span class="span-width fw-bold">Radio</span> : ${data.others?.Radio}</p>
        <p class="mb-2"><span class="span-width fw-bold">USB</span> : ${data.others?.USB}</p>`
    }
    spinner.style.display="none";
    detailDiv.style.boxShadow ="5px 5px 30px lightgray";
    detailDiv.className ="row p-4 rounded mx-auto";
    leftArea.innerHTML=`
        <img class="w-75 h-auto ms-5" src="${data.image}"> 
    `
    rightArea.innerHTML=`
        <p class="mb-2"><span class="span-width fw-bold">Name</span> : ${data.name}</p>
        <p class="mb-2"><span class="span-width fw-bold">ReleaseDate</span> : ${releaseDate}</p>
        <p class="mb-2"><span class="span-width fw-bold">Storage</span> : ${data.mainFeatures.storage}</p>
        <p class="mb-2"><span class="span-width fw-bold">DisplaySize</span> : ${data.mainFeatures.displaySize}</p>
        <p class="mb-2"><span class="span-width fw-bold">ChipSet</span> : ${data.mainFeatures.chipSet}</p>
        <p class="mb-2"><span class="span-width fw-bold">Memory</span> : ${data.mainFeatures.memory}</p>
        <p class="mb-2"><span class="span-width fw-bold">Sensors</span> : ${sensors}</p>
        ${others}
        
        

    `

}   