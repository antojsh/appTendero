
$(document).ready(function(){
	window.location='#login'
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
		$('.notificationtop .contentNotification').children().html('')
		var name 				= document.querySelector('#fullName').value;
		var user 				= document.querySelector('#userName').value;
		var email 				= document.querySelector('#email').value;
		var password 			= document.querySelector('#password').value;
		var repeatPassword 		= document.querySelector('#validePassword').value;
		
			$.ajax({
			  url: "http://192.168.1.72:3000/saveUser",
			  type:'POST',
			  data:{'name':name,'user':user,'email':email,'password':password,'password_confirmation':repeatPassword},
			  
			  success: function(res){
			  	console.log(JSON.stringify(res))
			    if(res.data.error){
			    	var erros= res.message.replace("ValidationError:","")
			    	erros=erros.split(',')
			    	for (var i = erros.length - 1; i >= 0; i--) {
			    		$('.notificationtop .contentNotification').children().append('<li>- '+erros[i]+'</li>');
			    		
			    	};
			    	$('.notificationtop').fadeIn()
					
			    }else{
			    	$('.notificationtop').fadeOut()
			    	alert('Guardado')
			    }
			  },
			  error:function(err){
			  	alert(JSON.stringify(err))
			  }
			});
		
		
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
			$('.notificationtop').fadeIn()
			$('.notificationtop .contentNotification').children().html('Las contraseñas no coninciden')
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

document.querySelector('#btnLogin').addEventListener('click',function(e){
	e.preventDefault()
	var userLogin = document.querySelector('#userLogin').value;
	var passLogin = document.querySelector('#passLogin').value;
	$.ajax({
		  url: "http://192.168.130.87:3000/auth/login",
		  type:'POST',
		  data:{'user':userLogin, 'password':passLogin},
		  success: function(data){
		    if(data.status==200){
		    	if(data.data.token){
		    		localStorage.setItem("token", data.data.token);
		    		window.location='/timeline'
		    	}

		    }
		  },
		  error:function(err){
		  	alert(JSON.stringify(err))
		  }
		    	
	});
},false)



