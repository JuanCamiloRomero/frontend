const d = document,
$form = d.querySelector("#find"),
$table = d.querySelector(".table"),
$button = d.querySelector("#btnenviar"),
$template = d.querySelector("#students").content,   
$fragment = d.createDocumentFragment();



$button.addEventListener("click",()=>{
    save();
});

const save = async () =>{
    try{
       
    let resp = await fetch(`http://localhost:8080/api/student-registration/${$form.gender.value}/${$form.municipalityOfBirth.value}`),
    json = await resp.json(resp);
    
    json.forEach(element => {
        console.log($template.querySelector(".name"));
        $template.querySelector(".idStudent").textContent=element.idStudent;
        $template.querySelector(".name").textContent=element.nameStudent;
        $template.querySelector(".age").textContent=element.age;
        $template.querySelector(".gender").textContent=element.gender;
        $template.querySelector(".date").textContent=element.birthDate;
        $template.querySelector(".identification").textContent=element.identificationNumber;
        $template.querySelector(".department").textContent=element.departmentOfBirth;
        $template.querySelector(".city").textContent=element.municipalityOfBirth;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
        
    });
    $table.querySelector("tbody").appendChild($fragment);
    if(!resp.ok)throw {
        status:resp.status, statusText:resp.statusText
    };
    }catch(error){
        $table.insertAdjacentElement("afterend", `<p>${error}</p>`);
    
        console.log(error);
    }

}

