var registerForm=document.getElementById("Dashboard")
var boton=document.getElementById("boton")

const enviar=(e)=>{
	e.preventDefault();
	if(registerForm.checkValidity()){
		var form=new FormData(registerForm);
		let myheaders=new Headers();
		var datos={
			method:"POST",
			headers:myheaders,
			body:form
		}
		fetch("/Dashboard/enviar",datos)
		.then(response =>response.json())
		.then(data=>{
			if(data.status==200){
				alert(data.mensaje)
			}
			else
				alert(data.mensaje);
		})
		.catch(err=>console.log('Error:',err));
	}else 
		alert("ocurrio un problema");
}

registerForm.addEventListener("submit", enviar);