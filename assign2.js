/*
Name        : Khris Bragas
FileName    : assign2.js
Class       : Comp3612
Instructor  : Randy Connolly
Assignment  : ASG2 Shakespeare play veiwer
E-Mail      : Kbrag274@mtroyal.ca
Description : This assingment is supposed to dispaly a list of plays that can be ordered by date or name, it supposed to
              be able to filter by scene act and player. 2 views list of plays and play text.
limitations : project is unable to filter by words or players.

 */
  
  
  
  
  
  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

/*
 To get a specific play, add play's id property (in plays.json) via query string, 
   e.g., url = url + '?name=hamlet';
 
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth
 
 NOTE: Only a few plays have text available. If the filename property of the play is empty, 
 then there is no play text available.
*/
 

/* note: you may get a CORS error if you test this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

const plays = JSON.parse(content);

document.addEventListener("DOMContentLoaded", function(){

createPlayList();
creditButton();
pickPlay();
dateButton();
nameButton();








});

function createPlayList(){
  const select = document.querySelector("#playList ul");

for(let p of plays){
  var li = document.createElement("li");
  li.setAttribute('data-id', p.id);
  li.textContent = p.title;
  select.appendChild(li); 
} 
listClick();
}

function dateButton(){

const dateSort = document.getElementById('dateSort');
dateSort.addEventListener("click", ()=>{



  plays.sort((a,b)=>{
if(a.likelyDate< b.likelyDate){

  return -1;
}
 if(a.likelyDate > b.likelyDate){

  return 1;
 }

return 0;
});
  
  
createNewList();

  
});

}

function nameButton(){

  const nSort = document.getElementById('nameSort');
  nSort.addEventListener("click", ()=>{
  
    plays.sort((a,b)=>{
      if(a.title < b.title){
      
        return -1;
      }
       if(a.title > b.title){
      
        return 1;
       }
      
      return 0;
      });
        
        
      createNewList();
    
  });

}


function createNewList(){

const select = document.querySelector("#playList");
const ul = document.querySelector("#playList ul");
const updatedList =document.createElement("ul");
select.removeChild(ul);

for(let p of plays){

  const li = document.createElement("li");
  li.setAttribute("data-id", p.id);
  li.textContent = p.title;
  updatedList.appendChild(li);

}
select.appendChild(updatedList);
listClick();

}

function listClick(){

  document.querySelectorAll("#playList ul li").forEach(el =>{
    
   
    el.addEventListener("click", function infoDis(){


    const id = el.getAttribute('data-id');
  
    for(let p of plays){
  
      if(id === p.id){
       //creating the intial inerface for when a play from list is selected by a click
       const select = document.querySelector('#listInterface');
       let h1 = document.createElement('h1');
       let content = document.createElement('div');
       let title = document.createTextNode(`${p.title}`);
       h1.appendChild(title);
       let synopsis = document.createTextNode(`${p.synopsis}`);
       content.appendChild(synopsis);
       select.innerHTML = h1.outerHTML + content.outerHTML;
       //creating view play text button 
       if(p.filename !== ""){
         let btn = document.createElement("button");
         btn.innerHTML = "View play text";
         btn.addEventListener("click", function(){

           let toggle = document.getElementById('listInterface');
           toggle.style.display = "none";

           let toggle1 = document.getElementById('interface');
           toggle1.style.display = "block";

            let toggle2 = document.getElementById('playHere2');
            toggle2.style.display = "none";

            let toggle3 = document.getElementById('playHere');
            toggle3.style.display = "block";

            let toggle4 = document.getElementById('btnClose');
            toggle4.style.display="block";

            const closeBtn = document.querySelector("#btnClose");

              closeBtn.addEventListener("click", ()=>{
              toggle.style.display = "block";
              toggle2.style.display = "block";
              toggle1.style.display = "none";
              toggle3.style.display = "none";
              toggle4.style.display="none";

            });
           
           fetch(api + '?name=' + p.id)
           .then(response => response.json())
           .then(data =>{
             const container2 = document.querySelector('#playHere');
             const script = JSON.stringify(data);
             const act = JSON.parse(script);
              
             
             let h2 = document.createElement('h2');
             let playTitle = document.createTextNode(act.title);
             h2.appendChild(playTitle);
             let h3 = document.createElement('h3');
             let actNum = document.createTextNode(act.acts[0].name);
             h3.appendChild(actNum);
             let h4 = document.createElement('h4');
             let sceneNum = document.createTextNode(act.acts[0].scenes[0].name);
             h4.appendChild(sceneNum);
             let p = document.createElement('p');
             let sceneName = document.createTextNode(act.acts[0].scenes[0].title);
             p.appendChild(sceneName);
             let p1 = document.createElement('p');
             let direction = document.createTextNode(act.acts[0].scenes[0].stageDirection);
             p1.appendChild(direction);

             let div = document.createElement('div');
             for(let a of act.acts[0].scenes[0].speeches){
               let speaker = a.speaker;
               let speech = a.lines;
               let p = document.createElement('p');
               let p1 = document.createElement('p');

               let speakerName = document.createTextNode(speaker + ":");
               let speechLine = document.createTextNode(speech);
               p.style.fontWeight = "bold";
               p.appendChild(speakerName);
               p1.appendChild(speechLine);
               div.appendChild(p);
               div.appendChild(p1);


             }

          
             
             
          
             container2.innerHTML =  h2.outerHTML + h3.outerHTML + h4.outerHTML + p.outerHTML + p1.outerHTML + div.outerHTML;
             


           })
          
         });
         select.appendChild(btn);
       }


        //creating the list of plays view from a click on a play from list.
        const container = document.querySelector('#playHere2');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3');
        let h4 = document.createElement('h4');
        let a = document.createElement('a');
        let a1 = document.createElement('a');
        let a2 = document.createElement('a');
        let para = document.createElement('p');
        let description = document.createElement('div');
        let textHeader = document.createTextNode(`${p.title}`);
        h2.appendChild(textHeader);
        let h3Content = document.createTextNode(`${p.likelyDate}`);
        h3.appendChild(h3Content);
        let h4Content = document.createTextNode(`${p.genre}`);
        h4.appendChild(h4Content);
        let aContent = document.createTextNode("Wiki");
        a.appendChild(aContent);
        a.href = `${p.wiki}`;
        let a1Content = document.createTextNode("Gutenberg");
        a1.appendChild(a1Content);
        a1.href= `${p.gutenberg}`;
        let a2Content = document.createTextNode("Shakespeare");
        a2.appendChild(a2Content);
        a2.href = `${p.shakespearOrg}`;
        let descriptionText = document.createTextNode(`${p.desc}`);
        description.appendChild(descriptionText);




        container.innerHTML = h2.outerHTML + h3.outerHTML + h4.outerHTML + a.outerHTML + para.outerHTML + 
        a1.outerHTML + para.outerHTML + a2.outerHTML + para.outerHTML + description.outerHTML;
        
      }
    }
  });
  
  });

}

function creditButton(){
  const headSelect = document.querySelector('header h1');
  let creditBtn = document.createElement("button");
  creditBtn.setAttribute('id', 'cButton');
  creditBtn.innerHTML = "Credit";
  headSelect.appendChild(creditBtn);

  
}

function pickPlay(){
  const select = document.querySelector('#playHere2');
  let h2 = document.createElement('h2');
  let h2Text =document.createTextNode("Please select a play to see info:");
  h2.appendChild(h2Text);
  select.innerHTML = h2.outerHTML;

}




