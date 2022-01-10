//     Primer js_demo sin locaStorage     
var selectedRow = null;
var array =[];

UpdatePageRefresh();


function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();

    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
}

function readFormData() {
    var formData = {};
    formData["Id_producto"] = document.getElementById("Id_producto").value; 
    formData["nombre_producto"] = document.getElementById("nombre_producto").value;
    formData["existencia"] = document.getElementById("existencia").value;
    formData["precio"] = document.getElementById("precio").value;
    return formData;
}

function insertNewRecord(formData) {
    var table = document.getElementById("jugue_list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.Id_producto;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.nombre_producto;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.existencia;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.precio;

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML=  '<button onClick= onEdit(this)>Modificar</button> <button onClick= onDelete(this)>Eliminar</button>'

    array.push(formData);

    localStorage.setItem("array", JSON.stringify(array));
}

//Boton de modificar
function onEdit(td) {
selectedRow = td.parentElement.parentElement;
document.getElementById('Id_producto').value = selectedRow.cells[0].innerHTML;
document.getElementById('nombre_producto').value = selectedRow.cells[1].innerHTML;
document.getElementById('existencia').value = selectedRow.cells[2].innerHTML;
document.getElementById('precio').value = selectedRow.cells[3].innerHTML;   
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.Id_producto;
    selectedRow.cells[1].innerHTML = formData.nombre_producto;
    selectedRow.cells[2].innerHTML = formData.existencia;
    selectedRow.cells[3].innerHTML = formData.precio;

    array.splice(selectedRow.rowIndex-1,1,{Id_producto:formData.Id_producto,nombre_producto:formData.nombre_producto,existencia:formData.existencia,precio:formData.existencia});
    localStorage.setItem("array",JSON.stringify(array));

}

//Boton de eliminar
function onDelete(td) {
if(confirm('¿Esta seguro de eliminar este registro?')){
    row = td.parentElement.parentElement;
    document.getElementById('jugue_list').deleteRow(row.rowIndex);
    
    array.splice(row.rowIndex-1, 1);
    localStorage.setItem("array",JSON.stringify(array));
}
resetForm();
}

// Boton de Reiniciar
function resetForm() {
document.getElementById('Id_producto').value = '';
document.getElementById('nombre_producto').value = '';
document.getElementById('existencia').value = '';
document.getElementById('precio').value = '';
}

function UpdatePageRefresh() {
    if(localStorage.getItem("array") == null){
        console.log("No hay nada en el localStorage")
    }else{
        array = JSON.parse(localStorage.getItem("array"));
        for (let index = 0; index < array.length; index++) {
            let Id_producto = array[index].Id_producto;
            let nombre_producto= array[index].nombre_producto;
            let existencia= array[index].existencia;
            let precio= array[index].existencia;

            document.getElementsById("tbody").innerHTML += 
            `<tr>
   <td>${Id_producto}</td>
   <td>${nombre_producto}</td>
   <td>${existencia}</td>
   <td>${precio}</td>
   <td><button onClick= onEdit(this)>Modificar</button> <button onClick= onDelete(this)>Eliminar</button></td>
   </tr>
   `
 
        }

    }

}






