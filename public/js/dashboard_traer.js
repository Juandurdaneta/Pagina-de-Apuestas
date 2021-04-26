//Cuando cargue la pagina
window.onload=()=>{

	datos={
		method:'GET'
	}
	fetch("/Dashboard/traer",datos)
		.then(response =>response.json())
		.then(data=>{
			if(data.status==200){
				alert("funciono");
				const arr=["username","correo","pass","EDAD","nacionalidad","total_apostado","total_ganado"];
				const arr2=[data.nombre,data.correo,data.password,data.edad,data.nacionalidad,data.total_apostado,data.total_ganado];
				let i=0;
				for (const name of arr) {
					let part =document.getElementById(name);
					part.value=arr2[i++];
				}
                // registerForm.addEventListener("submit", enviar);
			}
		})
		.catch(err=>console.log('Error:',err));
}
