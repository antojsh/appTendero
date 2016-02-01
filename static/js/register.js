
$(document).ready(function(){
	var imagenesCategoria={
	  'icon-pizza ':'pizzaNueva.jpg',
      'icon-eat-food-hotdog-streamline':'comidaRapida.jpg',
      'icon-ios-nutrition':'tienda.jpg',
      'icon-paw':'veterinario.jpg',
      'icon-torso-female':'estilista.jpg',
      'icon-tools':'mecanico.jpg',
      'icon-user-md':'medico.jpg',
      'icon-camera-1':'fotografo.jpg'
	}
	 cargarImagenesCategoria(imagenesCategoria)
	var btnRegister 		= document.querySelector('#btnRegister');
	btnRegister.addEventListener('click',function(e){
		e.preventDefault();
		var name 				= document.querySelector('#fullName').value;
		var user 				= document.querySelector('#userName').value;
		var email 				= document.querySelector('#email').value;
		var password 			= document.querySelector('#password').value;
		var repeatPassword 		= document.querySelector('#validePassword').value;
		if(valFormLogin(name,user,email,password,repeatPassword)){
			$.ajax({
			  url: "http://192.168.130.87:3000/saveUser",
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
})

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
function cargarImagenesCategoria(img){
	$.each(img, function(key, val) {
		$('.'+key).css('background','url(/static/img/'+val+')');
	})
}



