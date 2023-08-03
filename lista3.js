cargarDatos();
document.querySelector("#buscar").addEventListener('click',traerDatos);
document.querySelector("#pedido").addEventListener('click',verPedido);

let datos=null;
let a=true;
let pre_ven=0.0;

function cargarDatos(){
    const xhttp= new XMLHttpRequest();
    xhttp.open('GET','base_json.json',true);
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            datos=JSON.parse(this.responseText);
            console.log(datos);
            let res=document.querySelector('#res');
            let busc=document.querySelector('#busca');
            let busc1=busc.value;
            let busc2=busc1.toUpperCase();
            console.log(busc2);
            res.innerHTML='';
        }
    }
}

function traerDatos(){
    let busc=document.querySelector('#busca');
    let busc1=busc.value;
    let busc2=busc1.toUpperCase();



    let elementoActivo = document.querySelector('input[name="inlineRadioOptions"]:checked');

    console.log(busc2);
    res.innerHTML='';
    a=true;
    pre_ven=0.0;

    for (let item of datos){
        if (item.NOMBRE.includes(busc2)){
            if(elementoActivo.value=="lista1"){
                pre_ven=parseFloat(item.VENTA1);
            }
            if(elementoActivo.value=="lista2"){
                pre_ven=parseFloat(item.VENTA2);
            }
            if(elementoActivo.value=="lista3"){
                pre_ven=parseFloat(item.VENTA3);
            }

            pre_ven=pre_ven*(1+item.IVA);

            let id_row='row'+item.ORDEN;
            let colorea=""
            if(a){
                colorea="table-secondary";
                a=false;
            }else{
                colorea="table-light";
                a=true;
            }

            res.innerHTML+=`
                <tr id=${id_row} class="${colorea}">
                    <td><button onclick= "info(${item.IVA},${item.CABYS},${item.CODIGO},${item.VENTA1},${item.VENTA2},${item.VENTA3})" id="nombres">${item.NOMBRE}</button></td>
                    <td>${item.IVA}</td>
                    <td>${pre_ven.toFixed(2)}</td>
                    <td><button onclick= "carga(${item.ORDEN})" id="canti">${item.CANT}</button></td>
                    <td><button onclick= "bonif(${item.ORDEN})" id="bonif">${item.BONI}</button></td>
                    <td><button onclick= "descu(${item.ORDEN})" id="descu">${item.DESC}</button></td>
                <tr/>
            `
        }
    }
}

function verPedido(){
    let busc=document.querySelector('#busca');
    let busc1=busc.value;
    let busc2=busc1.toUpperCase();



    let elementoActivo = document.querySelector('input[name="inlineRadioOptions"]:checked');

    console.log(busc2);
    res.innerHTML='';
    a=true;
    pre_ven=0.0;

    for (let item of datos){
        if (item.CANT>0){
            if(elementoActivo.value=="lista1"){
                pre_ven=parseFloat(item.VENTA1);
            }
            if(elementoActivo.value=="lista2"){
                pre_ven=parseFloat(item.VENTA2);
            }
            if(elementoActivo.value=="lista3"){
                pre_ven=parseFloat(item.VENTA3);
            }

            pre_ven=pre_ven*(1+item.IVA);

            let id_row='row'+item.ORDEN;
            let colorea=""
            if(a){
                colorea="table-secondary";
                a=false;
            }else{
                colorea="table-light";
                a=true;
            }

            res.innerHTML+=`
                <tr id=${id_row} class="${colorea}">
                    <td><button onclick= "info(${item.IVA},${item.CABYS},${item.CODIGO},${item.VENTA1},${item.VENTA2},${item.VENTA3})" id="nombres">${item.NOMBRE}</button></td>
                    <td>${item.IVA}</td>
                    <td>${pre_ven.toFixed(2)}</td>
                    <td><button onclick= "carga(${item.ORDEN})" id="canti">${item.CANT}</button></td>
                    <td><button onclick= "bonif(${item.ORDEN})" id="bonif">${item.BONI}</button></td>
                    <td><button onclick= "descu(${item.ORDEN})" id="descu">${item.DESC}</button></td>
                <tr/>
            `
        }
    }
}




function carga(colu){
    let cantidad=prompt("Ingrese cantidad:","0");
    datos[colu].CANT=cantidad;
    let fil=document.getElementById("row"+colu);
    celda=fil.getElementsByTagName('td');
    celda[3].innerHTML=`<td><button onclick= "carga(${colu})" id="canti">${cantidad}</button></td>`
}


function bonif(colu){
    let cantidad=prompt("Ingrese cantidad:",datos[colu].CANT);
    datos[colu].BONI=cantidad;
    let fil=document.getElementById("row"+colu);
    celda=fil.getElementsByTagName('td');
    celda[4].innerHTML=`<td><button onclick= "bonif(${colu})" id="bonif">${cantidad}</button></td>`
}

function descu(colu){
    let cantidad=prompt("Ingrese cantidad:");
    datos[colu].DESC=cantidad;
    let fil=document.getElementById("row"+colu);
    celda=fil.getElementsByTagName('td');
    celda[5].innerHTML=`<td><button onclick= "descu(${colu})" id="descu">${cantidad}</button></td>`
}

function info(c_iva,c_cabys,c_codi,c_pre1,c_pre2,c_pre3){
    confirm("Código:"+c_codi+"\nIva:"+c_iva*100+"% \n"+"Cabys:"+c_cabys+"\nPrecio 1: "+c_pre1+"\nPrecio 2: "+c_pre2+"\nPrecio 3: "+c_pre3);
}