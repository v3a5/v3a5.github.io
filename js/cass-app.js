function showDashboard(){

document.getElementById("skills").innerHTML="";

}

function clearSkills(){

document.getElementById("skills").innerHTML="";

}

async function loadSkills(){

const container=document.getElementById("skills");

container.innerHTML="Loading framework...";

try{

const response=await fetch("frameworks/framework.json");

const data=await response.json();

container.innerHTML="";

data.competencies.forEach(skill=>{

const card=document.createElement("div");

card.className="skill-card";

card.innerHTML=
"<h3>"+skill.name+"</h3>"+
"<p>"+skill.description+"</p>";

container.appendChild(card);

});

}catch(err){

container.innerHTML="Failed to load framework";

console.error(err);

}

}
