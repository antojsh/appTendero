(function(){
	var btnRegister 		= document.querySelector('#btnRegister');
	btnRegister.addEventListener('click',function(){
		var name 				= document.querySelector('#nameNegocio').value;
		var user 				= document.querySelector('#userName').value;
		var email 				= document.querySelector('#email').value;
		var password 			= document.querySelector('#password').value;
		var repeatPassword 		= document.querySelector('#validePassword').value;
		if(valFormLogin(name,user,email,password,repeatPassword)){
			$.ajax({
			  url: "http://localhost:3000/register",
			  type:'POST',
			  data:{'name':name,'user':user,'email':email,'password':password},
			  success: function(res){
			    alert(JSON.stringify(res))
			  },
			  error:function(err){
			  	alert(JSON.stringify(err))
			  }
			});
		}
		
	},false)
})()

function valFormLogin(name,user,email,password,repeatPassword){
	var status=false;
	if(name=='' || user =='' || email=='' || password=='' || repeatPassword==''){
		alert('Debe llenar todos los campos');
		status=false;
	}
	else{
		if(password!=repeatPassword){
			$('#validePassword').addClass('errorColorInput')
			status=false;
		}else{
			$('#validePassword').removeClass('errorColorInput')
			status=true;
		}

	}
	return status;
		
}