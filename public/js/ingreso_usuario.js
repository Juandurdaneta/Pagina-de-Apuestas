//Registro
var registerForm=document.getElementById("Registro")
var boton=document.getElementById("ingresar")

const enviar=(e)=>{
	console.log(email)
	e.preventDefault();
	if(registerForm.checkValidity()){
		var form=new FormData(registerForm);
		let myheaders=new Headers();
		var datos={
			method:"POST",
			headers:myheaders,
			body:form
		}
		fetch("/registro",datos)
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


//login
/* var sesionForm=document.getElementById("Login")
var ingreso=document.getElementById("enviar")

const iniciar=(e)=>{
	e.preventDefault();
	if(sesionForm.checkValidity()){
		var form=new FormData(sesionForm);
		let myheaders=new Headers();
		var datos={
			method:"POST",
			headers:myheaders,
			body:form
		}
		fetch("/login",datos)
		.then(response =>response.json())
		.then(data=>{
			if(data.status==200){
				alert(data.mensaje)
                window.location.assign('http://localhost:3000/Dashboard');
			}
			else
				alert(data.mensaje);
		})
		.catch(err=>console.log('Error:',err));
	}else 
		alert("ocurrio un problema");
}

sesionForm.addEventListener("submit", iniciar);  */