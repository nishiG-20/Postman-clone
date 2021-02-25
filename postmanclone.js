let addedParamCount=0;

//Utility function to get Dom element from string
function getElementFromString(string){
     let div=document.createElement('div');
     div.innerHTML=string;
     console.log(div.firstElementChild);
     return div.firstElementChild; 
}


//Hide the parameters box initially
let parametersBox=document.getElementById('parametersBox');
parametersBox.style.display='none';


//If the user clicks on params box ,hide the json box
parametersBox=document.getElementById('parametersBox');
paramsRadio.addEventListener('click',()=>{
     document.getElementById('requestJsonBox').style.display='none';
     document.getElementById('parametersBox').style.display='block';
})

//If the user clicks on json box ,hide the params box
let requestJsonBox=document.getElementById('requestJsonBox');
jsonRadio.addEventListener('click',()=>{
     document.getElementById('parametersBox').style.display='none';
     document.getElementById('requestJsonBox').style.display='block';
})

//If the user clicks on plus(+) button then add more parameters.
let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
     let params=document.getElementById('params');
     let string=`
           <div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter${addedParamCount+2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter Parameter${addedParamCount+2}  Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount+2}" placeholder="Enter Parameter${addedParamCount+2} Value">
                </div>
                <button id="addParam" class="btn btn-primary deleteParam">-</button>
          </div>
     
          `;
          
      //Convert the element string to dom mode
      let paramelement=getElementFromString(string);
      params.appendChild(paramelement);
      //Add an event listener to remove the parameter on clicking-button
      let deleteParam=document.getElementsByClassName('deleteParam');
      for(item of deleteParam){
           item.addEventListener('click',(e)=>{
                e.target.parentElement.remove();
           })
      }
      
      addedParamCount++;
})

//If the user clicks on submit button
let submit=document.getElementById('submit');
     submit.addEventListener('click',()=>{
     //Show please wait in the response box to request patience from the user

     document.getElementById('responsePrism').innerHTML="Please wait.. Fetching response.."
    
     //Fetch all the values user has entered
     let url=document.getElementById('url').value;
     let requestType= document.querySelector("input[name='requestType']:checked").value;
     let contentType=document.querySelector("input[name='contentType']:checked").value;
     
     //Log all the values in the console for debugging purposes.
     //console.log("URL is",url);
     //console.log("Content Type is",contentType);
     //console.log("requestType is",requestType);
     
     //If user has used params option instead of json,collect all the parameters in an object
     
     if(contentType == 'params')
     {
           data={};
           for(i=0; i<addedParamCount+1 ;i++)
           {
                if(document.getElementById('parameterKey'+(i+1) ) != undefined )
                {
                      let key=document.getElementById('parameterKey'+(i+1)).value;
                      let value=document.getElementById('parameterValue'+(i+1)).value;
                      data[key]=value;
                }
               
           }
            data=JSON.stringify(data);
           
     }
     else
     {
         data=document.getElementById('requestJsonText').value;
     }
     
     console.log("URL is",url);
     console.log("Content Type is",contentType);
     console.log("requestType is",requestType);
     console.log("data is",data);
     
     //If the request type is GET,invoke the fetch api to create a GET request
    if(requestType =='GET')
     {
          fetch(url,{
              method: 'GET'
          })
          .then(response=> response.text())
          .then((text)=>{
               document.getElementById('responsePrism').innerHTML = text;
               Prism.highlightAll();
          })
     } 
     else
     {
           fetch(url,{
              method: 'POST',
              body: data,
              headers: {
                  'Content-type': 'application/json; charset=UTF-8'
               }
          })
          .then(response=> response.text())
          .then((text)=>{
               //document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
          })

     }
     
});

