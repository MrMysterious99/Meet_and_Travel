

function x(br){
    button=window.event.target;
    parent=button.parentElement;
    forma=parent.getElementsByTagName('form')[0];

    let f=document.getElementById("forma"+br);
    
    p=f[0].value;
    g=f[0].defaultValue;
    ff=new FormData(f);
}

//This functions creates elements that are common for all creations
//return - a JSON object that contains all the common elements that a specificCreate function will use to append specific elements 
function commonCreate(){
    //the row of the page container
    divPageRow=document.getElementsByClassName('row')[0];
    
    //one specific container
    divContainer=document.createElement('div');
    divContainer.classList.add(...['col-11', 'col-md-5', 'order-1', 'result-container'])
    
    //row for the specific container - the specific class (trip/group/wish...) will have to be added by the specificCreate function
    divContainerRow=document.createElement('div');
    divContainerRow.classList.add('row');
    
    //the div that will contain the image
    div1=document.createElement('div');
    div1.classList.add('col-3');

    //the div that will contain the body
    div2=document.createElement('div');
    div2.classList.add('col-6');

    //the div that will contain the buttons and the hidden form
    div3=document.createElement('div');
    div3.classList.add('col-3');

    return {'divPageRow':divPageRow,
            'divContainer':divContainer,
            'divContainerRow':divContainerRow,
            'div1':div1,
            'div2':div2,
            'div3':div3
        };
    
}
//the argument to the function is an object returned by commonCreate() after specificCreate appended specific elements
//this functions adds the object to the page 
function addToPage(commonCreateObj){
    commonCreateObj['divContainerRow'].appendChild(commonCreateObj['div1']);
    commonCreateObj['divContainerRow'].appendChild(commonCreateObj['div2']);
    commonCreateObj['divContainerRow'].appendChild(commonCreateObj['div3']);
    commonCreateObj['divContainer'].appendChild(commonCreateObj['divContainerRow']);
    commonCreateObj['divPageRow'].appendChild(commonCreateObj['divContainer']);
}


//Depending on the 'class' of the JSON object that's received from the server does the specific append
function polymorphicAppend(obj){
    //obj=testData;
    switch(obj['class']){
        case "group":
            appendElement(createGroupJSON(obj.data));

            break;
    }

}

//obj is the JSON representation of the element that's being created
function appendElement(obj){

    commonCreateObj=commonCreate();

    //specific class for the divContainerRow
    commonCreateObj['divContainerRow'].classList.add(obj['class']);
    
    img=document.createElement('img');
    img.classList.add('slika');
    img.src=obj['image'];

    commonCreateObj['div1'].appendChild(img);

    obj['p'].forEach(data => {
        p=document.createElement('p');
        p.innerHTML=data;
        commonCreateObj['div2'].appendChild(p);
    });
    obj['button'].forEach(b=>{
        //button 
    button=document.createElement('button');
    button.classList.add(...b['class']);
    //button.onclick=x;//= ////////////////////////
    button.setAttribute('onclick',b['onclick']);
    button.innerHTML=b['text'];
    commonCreateObj['div3'].appendChild(button);
    });


    //form
    forma=document.createElement('form');
    
    obj['input'].forEach(data=>{
        input=document.createElement('input');
        input.setAttribute("type",'hidden');
        input.setAttribute('value',data);
        forma.appendChild(input);
    });
    

    commonCreateObj['div3'].appendChild(forma);

    //done with specific creation

    addToPage(commonCreateObj);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create_ResName_JSON IS THE ONLY THIS THAT HAS TO BE CREATED FOR EACH NEW RESULT REPRESENTATION AND TO ADD A CASE IN THE SWITCH STATEMENT!

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//creates the JSON object that is used to create specific elements for the Group
function createGroupJSON(obj){ 
return {
'class':'trip',
'image':obj['image'],
'p':[obj['where'],obj['from'],obj['to'],"budget: $"+obj['budget'],"members: "+obj['members']],
'button':[{
    'class':['btn','btn-success'],
    'onclick':'x()',//function for the onclick event
    'text':'Request'
}],//end button
'input':[obj['groupid']]
};
}

//JSON object that's received from the server 
/*
{
    class:Group or Arrangement or Wish or.......
    data: {
        class
        budget:...
        where:...
        userid:...,
        groupid:...,
        .......
    }
}

*/







function sendResult(json_obj){
    let xhr = new XMLHttpRequest(); //XML Object
    xhr.open("POST","php/ProcessResult.php",true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
            
            
          //obj=JSON.parse(xhr.responseText);
          localStorage.setItem('obj',xhr.responseText);
          location.href = "Results.php";
        }
      }
    }
    // json_obj={

    //     'class':'group',
    //     'imagePath':'php/images/1620843858relayfinal.png',
    //     'where':'Belgrade',
    //     'from':'20-01-2021',
    //     'to':'22-01-2021',
    //     'budget':500,
    //     'members':69,
    //     'groupId':1
    // }
    xhr.setRequestHeader("Content-Type","application/json");
    json_obj=JSON.stringify(json_obj);
    xhr.send(json_obj); // sending formData to php
  }
  


  //ne moram da clearujem localStorage jer kad uradim drugi mapping cu da ga preklopim, a ovako mozemo da radimo refresh
  //ako bi nekako dodavao jos elemenata morao bih da izvadim da dodam da preklopim da vratim u localstorage i onda da refreshujem - ali ovo nemamo
  //bolje ipak preko php-a jer ovako <a href za ovu stanu ne moze>
  //imali bi druge probleme da idemo preko <a href> -> onda moramo GET i onda moramo to sto odradimo u PHP da stavimo u hidden element i da odatle procitamo sto je ok
  // moze i tako 
  function onLoad(){
    obj=localStorage.getItem('obj');
    obj=JSON.parse(obj);
    for(i=0;i<obj.data.length;i++){
        polymorphicAppend(obj.data[i]);
    }
  }