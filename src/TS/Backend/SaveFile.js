import {app,database} from './Firebase.js'
import {  ref, set,push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Reference to the 'users' node in the 



function addData()
{

    const userRef = ref(database,"/savedFiles");

    var ele=document.getElementById(currentSelectedContainer);
    let sections= Array.from(ele.children)

    let sectionList=[]
    sections.forEach(element => {
      if(element.id.includes("section"))
      sectionList.push({
        id:element.id,
        data:element.innerHTML
      })
      
    });



    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = urlParams.get('name');
    let metaData={
      fileName:title,
      sections:sectionList
    }

    // Write an object with user details
    push(userRef, metaData)
      .then(() => {
        console.log('User data written successfully!');
      })
      .catch((error) => {
        console.error('Error writing user data:', error);
      });
    
}




document.getElementById('savedatabtn').addEventListener('click', addData);

