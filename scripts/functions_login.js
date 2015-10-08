$(document).ready(function(){
	

	var currentPath = window.location.pathname;
	var currentPage = (currentPath).substring(currentPath.lastIndexOf('/') + 1); 
	console.log(currentPage);
	var addBool=false;
	if(currentPage == "login.html")
		loginReady();
		
	
	function loginReady(){
		$("#second").hide();
		if(document.cookie){ 
			var email = $.cookie('email');
			var pwd = $.cookie('pwd');
			if(typeof email!='undefined' && typeof pwd!='undefined'){
				$("#email").val(email);
				$("#password").val(pwd);
				$("#rememberMe").prop('checked', true);
			}
		}
	}
	
////////////// READY FUNCTIONS END HERE////
	function validateEmail(eml){
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!(re.test(eml)))
		{
			return "Please enter a valid email id";
		}
		return "";
	}
	function validatePwd(Plength){
		if(Plength<8 || Plength >16){
			return "Password should have 8-16 chars";
		}
		return "";
	}
//////LOGIN FUNCS START////////
	$("#email").blur(function(){
		var msg = validateEmail($("#email").val());
		$("#login_error").html(msg);
	});
	$("#password").blur(function(){
		var pwd = $("#password").val().length;
		var msg = validatePwd(pwd);
		$("#login_perror").html(msg);
	});
	$("#login").click(function(event){
 	   event.preventDefault();
 	   var username=$("#email").val();
  	   var password=$("#password").val();
  	   var remember = $("#rememberMe").is(':checked');
  	 
  	   
  	   if (username == null || username == "" && password == null || password == "") {
         alert("Please Fill Email and Password");
         return false;
         
         
         
     }
   else
   	{
 	   var  formData = "username="+username+"&password="+password+"&remember="+remember;	
 	   var url= getOpenBaseUrl() + "admin/login";
		APIPostTextCall(url, 
			formData,
			function(data, textStatus){
				if(remember && typeof username!='undefined' && typeof password!='undefined'){
		  			$.cookie('email', username);
					$.cookie('pwd', password);
				  }
				  else{
					  $.removeCookie('email');
					  $.removeCookie('pwd');
				  }

  				sessionStorage.setItem('userid',data);
  				sessionStorage.setItem('useremail',username);
  			
  				console.log(data);
  				location.assign("index.html");
  				
  				
			  },
			  function(jqXHR, textStatus, errorThrown){
				  console.log('fail to login');
				  console.log('Login Failure:'+errorThrown);
				  if(errorThrown=="Bad Request"||errorThrown=="Unauthorized")
					  {
					  alert("Please check your username and password and try again");
					  }
			  }
		  );
   	}
	  });
	
	$("#forgotPwd").click(function() {
		var eml=$("#email").val();
		$("#first").slideUp("slow", function() {
			$("#second").slideDown("slow");
			$("#ferror").html("");
	
		});
		$("#forgotEmail").val(eml);
	});
	$("#forgotEmail").blur(function(){
		var msg = validateEmail($("#forgotEmail").val());
		$("#ferror").html(msg);
		
	});
	$("#sendEmail").click(function(){
		var email = $("#email").val();
		validateEmail(email);
		APIGetTextCall(getOpenBaseUrl() + "reset_password?username="+email,
			function(data, textStatus){
				$("#second").slideUp("slow", function() {
					$("#first").slideDown("slow");
				});
			},
			function(jqXHR, textStatus, errorThrown){
				if(errorThrown=="Not Found")
					{
					
					alert("This email is not registered");
					};
				console.log('fail to send forgot password');
			}
		);		
	});
	$("#backtoLogin").click(function() {
		$("#second").slideUp("slow", function() {
			$("#first").slideDown("slow");
			$("#login_error").html("");
			$("#login_perror").html("");
		});
	});
		
//////LOGIN FUNCS END////////
//////RESET_PWD FUNCS START////////

	$("#old_pwd").blur(function(){
		var msg = validatePwd($("#old_pwd").val().length);
		$("#reset_perror").html(msg);
	});
	$("#new_pwd").blur(function(){
		var msg = validatePwd($("#new_pwd").val().length)
		if(msg!=""){
			match($("#new_pwd").val(), $("#confirm_pwd").val());
		}
		$("#reset_perror").html(msg);
		
	});
	$("#confirm_pwd").blur(function(){
		var msg = validatePwd($("#confirm_pwd").val().length);
		if(msg!="")
			match($("#new_pwd").val(), $("#confirm_pwd").val());
		$("#reset_perror").html(msg);
			
	});
	function match(Pwd1, Pwd2){
		if(Pwd1!="" && Pwd2!=""){
			if(Pwd1!=Pwd2){
				$("#matchError").html("New passwords do not match");
				return false;
			}
			$("#matchError").html("");
			return true;
		}
	}
	$("#PReset").click(function(event){
		event.preventDefault();
		var boolmatch = match($("#new_pwd").val(), $("#confirm_pwd").val());
		if(boolmatch){
			if(match($("#new_pwd").val(), $("#old_pwd").val()))
				$("#matchError").html("New and Old passwords cannot be the same");
			else{
				$("#matchError").html("");
				console.log("Calling reset password API")
				var password = "password="+$("#new_pwd").val();
				var url= getAuthBaseUrl() + "user/update/password/";
				console.log(url);
				APIPostTextCall(url, password,
					function(data, textStatus){
						console.log('PASSWORD RESET');
						alert("Password has been reset successfully, Please log in using new password.");
						location.assign("login.html");
					  },
					  function(jqXHR, textStatus, errorThrown){
						  console.log('failed reset');
						  alert('reset Failure:'+errorThrown);
					  }
				  );
			}
		}
	});
//////RESET_PWD FUNCS END////////
//////CRUD_ADMINS FUNCS START////////
	 function getAllAdmins(){
		 APIGetJsonCall(getAuthBaseUrl() + "user/getAll?type=ALL_ADMINS",
			function(data, textStatus){
				displayTable(data.users);
			 },
			 function(jqXHR, textStatus, errorThrown){
			 	console.log('Failed getall');
			}
	 	);
	 }
	 function displayTable(tableData){
		 		var delArray = [];
		 		var delCount = 0;
			 	var selected_index = -1;
				$("#tblList").html("");
				$("#tblList").html(
					"<thead>"+
					"	<th><a class='CRUDDelete' href='#' >Delete</a></th>"+
//					"	<th>Delete</th>"+
					"	<th>First Name</th>"+
					"	<th></th>"+
					"	<th>Last Name</th>"+
					"	<th>Email</th>"+
					"	<th>Phone</th>"+
					"	<th>Admin Type</th>"+
					"	<th></th>"+
					"	<th>Edit</th>"+
					"	</tr>"+
					"</thead>"+
					"<tbody>"+
					"</tbody>"
					);
				for(var i=0;i< tableData.length; i++){
				var cli = tableData[i];
//				console.log(cli);
				$("#tblList").append("<tr>"+
				"	<td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btnFormDelete'/></td>" +
//				"	<td><input id = 'rememberMe' type = 'checkbox' value='' alt='Delete"+i+"' class='btnFormDelete'/></td>" +
				"	<td>"+cli.userProfile.firstName+"</td>" + 
				"	<td></td>" + 
				" <td>"+cli.userProfile.lastName+"</td>" + 
				"	<td>"+cli.username+"</td>" + 
				"	<td>"+cli.userProfile.mobilePhone+"</td>" + 
				"	<td>"+cli.type+"</td>" + 
				"	<td></td>" + 
				 "	<th><a class='btnFormEdit' alt='Edit"+i+"' href='#' >Edit</a></th>"+
//				"	<td><img src='Images/edit.png' alt='Edit"+i+"' class='btnFormEdit'/></td>" +
				"</tr>");		
				} 
				
			 $(".btnFormDelete").bind("click", function(){
				selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
				 if($(this).is(':checked')){
//					 alert(selected_index+" Checkbox clicked");
					 var cli = (tableData[selected_index]);
					delArray[selected_index] = (cli.username);
				 }
				 else{
//					 alert(selected_index+" UNCHECKED");
					 delArray[selected_index] = "";
				 }
					console.log("DelArray = "+delArray);			
			 });
//			 $("#CRUDDelete a").bind("click", function(){
			$(".CRUDDelete").bind("click", function(){
				 if(delArray.length == 0){
					 alert("Please select an item to delete and try again.")
				 }
				 else{
					 for(var i=0;i<delArray.length;i++){
						 if(delArray[i])
						{
							 var r = confirm("Are you sure you want to delete admin "+delArray[i]+"? This action cannot be undone.");
							 if (r == true) {
								 console.log("deleting : "+delArray[i]);
								var url = getAuthBaseUrl() + "user/delete/";
								APIPostJsonCall(url,delArray[i],
								function(data, textStatus){
									alert("Admin(s) successfully deleted");
									location.reload();
								},
								function(jqXHR, textStatus, errorThrown){
									alert('Could not delete '+delArray[i]);
								});
							 }
						} 
					 }					 
				 }
			 });
			 $(".btnFormEdit").bind("click", function(){
					console.log(tableData);
					selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
					var cli = (tableData[selected_index]);
					
					addBool=false;	
				//GET ID FROM THIS OPERATOR AND SET SESSIONID
					sessionStorage.setItem('id',cli.id);
					var popup = window.open("AddOrEditAdmin.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=400, height=400");
				});	
		}
		$("#addAdmin").click(function(e){
			addBool=true;
			sessionStorage.removeItem('id');
			var popup = window.open("AddOrEditAdmin.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=400, height=400");
		
		});
//		$("#editAdmin").click(function(e){
//			addBool=false;	
//			//GET ID FROM THIS OPERATOR AND SET SESSIONID
//			sessionStorage.setItem('id',"11");
//			e.preventDefault();
//			window.location.href = "AddOrEditAdmin.html";
//		});
//////CRUD_ADMINS FUNCS END////////
//////ADD OR EDIT FUNCS START////////
	function getUserAPI(id){
		var urlGet = getAuthBaseUrl() + "user/get?id="+id
		APIGetJsonCall(urlGet,
 			function(data, textStatus){
				getUserObj = data;
				console.log("Setting getUserObj with DATA from RESPONSE");
				console.log(getUserObj);
 			},
 			function(jqXHR, textStatus, errorThrown){
 				console.log('Failed getall');
 			}
 		);	
	}
	function checkIfEmptyName(name){
		if(name)
			return "";
		else
			return "Cannot be empty";
	}
	$("#AOEfName").blur(function(){
		var msg = checkIfEmptyName($("#AOEfName").val());
		$("#AOEnameError").html(msg);		
	});
	$("#AOElName").blur(function(){
		var msg = checkIfEmptyName($("#AOElName").val());
		$("#AOElnameError").html(msg);
	});
	$("#AOEemail").blur(function(){
		var msg = validateEmail($("#AOEemail").val());
		$("#AOEemailError").html(msg);
	});
	$("#AOEcancel").click(function(e){
		opener.location.reload();
			 window.close();
//		e.preventDefault();
//		window.location.href='Admin.html';
	});
	$("#resetCancel").click(function(e){
		opener.location.reload();
			 window.close();
//		e.preventDefault();
//		window.location.href='Admin.html';
	});
	$("#AOEupdate").click(function(e){
		e.preventDefault();
//		alert("add= "+addBool);
		if(addBool)
			addAdmin();
		else
			editAdmin();
		// window.location.href='Admin.html';
	});
	function addAdmin(){
		var url= getAuthBaseUrl() + "admin/create/";
	    var jsonObj =JSON.stringify({"username" : $("#AOEemail").val(),
	    	"type":$("#AOEType option:selected").val(),
	    	"userProfile":{
	    		"firstName" : $("#AOEfName").val(),
	    		"lastName" : $("#AOElName").val(),
	    		"MobilePhone":$("#AOEPhone").val()
	    	}
	    });
	    console.log(url);
		console.log(jsonObj);
	     APIPostJsonCall(
  			url,
  			jsonObj,
  			function(data, textStatus){
  				opener.location.reload();
 				 window.close();
//  				window.location.href='Admin.html';
  	   			console.log("ADD SUCCESS");
  	   		},
  	   	  	function(jqXHR, textStatus, errorThrown){
  	   			console.log(jqXHR.status);

  	   			if(jqXHR.status == 409){
  	  	   			$("#AddFailError").html("User with same email already exists. Try Again.")
  	   			}
  	   			else
  	   				$("#AddFailError").html("Unable to add Admin. Try Again.")
  	   		  console.log('ADD FAIL '+errorThrown);
  			});
	}
	function editAdmin(){
		//UPDATE API
		getUserObj.userProfile.firstName = $("#AOEfName").val();
		getUserObj.userProfile.lastName = $("#AOElName").val();
		getUserObj.userProfile.mobilePhone = $("#AOEphone").val();
		getUserObj.type = $("#AOEType option:selected").val();
			
		var url= getAuthBaseUrl() + "user/update/";
		console.log("Obj sent to Update API "+url);
		console.log(getUserObj);
		
		APIPostJsonCall(
	  			url,
	  			JSON.stringify(getUserObj),
	  			function(data, textStatus){
	  				alert("Update Successful");
	  				 opener.location.reload();
	  				 window.close(); 
	  	   			console.log("UPDATE SUCCESS");
//	  	   			windows.location.href="Admin.html";
	  	   		},
	  	   	  	function(jqXHR, textStatus, errorThrown){
	  	   			console.log(jqXHR.status);
	  	   		$("#AddFailError").html("Unable to edit Admin. Try Again.")
	  	   		  console.log('EDIT FAIL '+errorThrown);
	  			});
	}
//////ADD OR EDIT FUNCS END////////

/////GENERIC API FUNCS AFTER THIS
			function getOpenBaseUrl(){
				return getHost() + "/yapper/v1/open/";
			}

			function getAuthBaseUrl(){
				return getHost() + "/yapper/v1/auth/";
			}

			function getHostFull(){
				return getHost() + "/yapper/";
			}

			function getHost(){
	
				var p = location.href;
				var indexStart = 0;
				var indexEnd1 = p.indexOf('//', indexStart);
				var indexEnd2 = p.indexOf('/', indexEnd1 + 2);
				var result = null;
				if (indexEnd2 != -1) result = p.substring(indexStart, indexEnd2);
				else result = p.substring(indexStart);
				return result;
			}

			function APIPostJsonCall(url,jsonData,success,failure){
				$.ajax({
					url : url,
					type : "POST",
					contentType : "application/json; charset=utf-8",
					data : jsonData,
					dataType : "json",
					statusCode : null,
					async : false,
					cache:false,
					success : success,
					error : failure
				});
			}

			function APIGetJsonCall(url,success,failure){
				$.ajax({
					url : url,
					type : "Get",
					contentType : "application/json; charset=utf-8",
					data : null,
					dataType : "json",
					statusCode : null,
					async : false,
					cache:false,
					success : success,
					error : failure
				});
			}

			function APIPostTextCall(url,textData,success,failure){
				$.ajax({
					url : url,
					type : "POST",
					data : textData,
					dataType : "text",
					statusCode : null,
					async : false,
					cache:false,
					success : success,
					error : failure
				});
			}

			function APIGetTextCall(url,success,failure){
				$.ajax({
					url : url,
					type : "GET",
					data : null,
					dataType : "text",
					statusCode : null,
					async : false,
					cache:false,
					success : success,
					error : failure
				});
			}
	
});