
// unique id for local storage key
var uniqueKey = 0;
// if(localStorage.getItem("len1"))uniqueKey=localStorage.getItem("len1")
var uniqueKey2 = -1;
// static ksiz=0

// show all expense list items on dom content load / on page load
window.addEventListener("DOMContentLoaded", ()=> {
    const len1=localStorage.getItem("len1")
    const len2=localStorage.getItem("len2")
    console.log(len1,"  ",len2)
    if(len1)uniqueKey=len1;
    if(len2)uniqueKey2=len2;
    // Object.keys(localStorage).forEach((key) => {
    //     let expense_obj = localStorage.getItem(key);
    //     addtopage(expense_obj);
    // })
    for(var i=0;i<100;i++){
        if(!localStorage.getItem(i))continue
        addtopage(localStorage.getItem(i))
    }
    for(var i=-1;i>-100;i--){
        if(!localStorage.getItem(i))continue
        // console.log("item exists at ",i)
        donelist(localStorage.getItem(i))
    }
})

function deletetodo(e,maindiv){
    console.log("in delete todo")
    console.log(e)
    for(var i=0;i<100;i++){
        if(localStorage.getItem(i)==e){
            localStorage.removeItem(i);break;
        }
    }
    maindiv.remove()
    console.log(uniqueKey2+" "+e)
    localStorage.setItem(uniqueKey2,e);
    uniqueKey2--;
    if(localStorage.getItem("len2")){
        const c=parseInt(localStorage.getItem("len2"))-1
        localStorage.setItem("len2",c)
    }
    else localStorage.setItem("len2",-2);
    donelist(e)
}

function addtolist(hasstr){
    console.log("adding to list")
    var str_item=hasstr
    if(!hasstr){
        const val=document.querySelectorAll('input')
        if(val[0].value==""){
            alert("please input a value");return
        }
        str_item=val[0].value+"  ---  "+val[1].value+"  "
        val[0].value="";val[1].value="";
    }
    console.log(uniqueKey)
    addtopage(str_item)
    localStorage.setItem(uniqueKey,str_item);
    uniqueKey++;
    if(localStorage.getItem("len1")){
        const c=parseInt(localStorage.getItem("len1"))+1
        localStorage.setItem("len1",c)
    }
    else localStorage.setItem("len1",1);
//    tem('text',list);
}

function addtopage(str_item){
    const maindiv= document.createElement('div')
    const lab= document.createElement('label')

    const newtxt=document.createTextNode(str_item)
    lab.append(newtxt)
    const donebutton= document.createElement('button')
    const butttxt=document.createTextNode(" done")
    donebutton.append(butttxt)
    donebutton.addEventListener("click",() => deletetodo(str_item,maindiv))
    // const brnxt= document.createElement('br')
    maindiv.append(lab);maindiv.append(donebutton);
    document.getElementById('intodo').append(maindiv)
}

function donelist(str_item){
    // console.log(maindiv)
    const maindiv= document.createElement('div')
    const lab= document.createElement('label')

    const newtxt=document.createTextNode(str_item)
    lab.append(newtxt)
    const donebutton= document.createElement('button')
    const butttxt=document.createTextNode("Undone")
    donebutton.append(butttxt)
    const rem= document.createElement('button')
    const remtxt=document.createTextNode("Remove")
    rem.append(remtxt)
    donebutton.addEventListener("click",() => undone(str_item,maindiv))
    rem.addEventListener("click",() => deletedone(str_item,maindiv))
    // const brnxt= document.createElement('br')
    maindiv.append(lab);maindiv.append(donebutton);maindiv.append(rem);
    document.getElementById('indone').append(maindiv)
   
}
function deletedone(str_item,maindiv){
    if(maindiv)maindiv.remove()
    for(var i=-1;i>-100;i--){
        if(localStorage.getItem(i)==str_item){
            localStorage.removeItem(i);break;
        }
    }
}
function undone(str_item,maindiv){
    deletedone(str_item,maindiv)
    addtolist(str_item)
}