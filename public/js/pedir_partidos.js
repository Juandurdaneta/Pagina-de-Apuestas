//Cuando cargue la pagina
window.onload=()=>{

	datos={
		method:'GET'
	}
	fetch("/Partidos_pedir",datos)
		.then(response =>response.json())
		.then(data=>{
			if(data.status==200){
				alert("funciono");
				const arr=document.getElementsByName("torneo");
				const arr_2=document.getElementsByName("partido");
				const arr_3=document.getElementsByName("horario");
				const torneos=data.torneo;
				const locales=data.local;
				const visitante= data.visitante;
				const tipo= data.tipo;
				const horario=data.horario;
				let i=0;
				for (let i=0;i<7;i++) {
					arr[i].textContent=torneos[i].nombre;
					arr_2[i].textContent=locales[i].nombre +" vs "+visitante[i].nombre;
					arr_3[i].textContent=data.horario[i];
				}
                // registerForm.addEventListener("submit", enviar);
			}
		})
		.catch(err=>console.log('Error:',err));
}
