
const d = document,
$form = d.querySelector("#student"),
button = d.querySelector("#form1");

button.addEventListener("click",(e)=>{
    e.preventDefault();
   
    let validName = new RegExp("^([A-Za-zÑñ]+['\-]{0,1}[A-Za-zÑñ]+)(\s+([A-Za-zÑñ]+['\-]{0,1}[A-Za-zÑñ]+))*$");
    

    if(!validateNoEmty()){
        return;
    }
    if(!validName.test($form.nameStudent.value)){
        alert("Ingrese un Nombre Valido");
    }
    
   
   if(validDate()){
    save();
   }
   

});

const validateNoEmty = () =>{
    let status=false;
    if($form.nameStudent.value ==""){
        alert("debe ingresar un nombre");
        return;
    }
    if($form.age.value ==""){
        alert("debe ingresar una edad");
        return;
    }
    if($form.gender.value ==""){
        alert("debe selecionar un genero");
        return;
    }

   
    if($form.birthDate.value ==""){
        alert("selecione una fecha");
        return;
    }

    if($form.identificationNumber.value ==""){
        alert("ingrese un numero de documento");
        return;
    }
    if($form.departmentOfBirth.value ==""){
        alert("ingrese el departamento de nacimiento");
        return;
    }

    if($form.municipalityOfBirth.value ==""){
        alert("ingrese el municipio de nacimiento");
        return;
    }
    status=true;
    return status;
}
const save = async () =>{
    try{
       let student = new FormData($form);
       console.log(student.get("nameStudent"));

    
    let options= {
        method:"POST",
        headers:{
            "Content-type":"application/json; charset=utf-8",
        },
        body:JSON.stringify({
            'nameStudent':$form.nameStudent.value,
            'age':$form.age.value,
            'gender':$form.gender.value,
            'birthDate':$form.birthDate.value,
            'identificationNumber':$form.identificationNumber.value,
            'departmentOfBirth':$form.departmentOfBirth.value,
            'municipalityOfBirth':$form.municipalityOfBirth.value,
    
        })

    },
    
    resp = await fetch("http://localhost:8080/api/student-registration",{

    method:"POST",
    body:student,
    

    }),
    json = await resp.json();
    console.log(json);
    if(!resp.ok)throw {
        status:resp.status, statusText:resp.statusText
    };
    }catch(error){

    
        console.log(error);
    }

}

const validDate = () =>{

    let currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth()+1,
    year = currentDate.getFullYear(),
    status =true;



    let birdDate = $form.birthDate.value,
    array = birdDate.split('-');

    
    
        if( array[0] > year  ){
            alert("la fecha no puede ser mayor a la actual");
            status=false
        }

        if(array[0] >=year && array[1] > month){
            alert("la fecha no puede ser mayor a la actual");
            status=false;
        }

        if(array[0] >=year && array[1] >= month && array[2]>day){
            alert("la fecha no puede ser mayor a la actual");
            status=false;
        }

        return status;
    

}