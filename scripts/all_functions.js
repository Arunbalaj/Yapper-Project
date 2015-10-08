$(document).ready(function(){
	
	var idleTime = 0;
	console.log(1);
	    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
	    $(this).mousemove(function (e) {
	        idleTime = 0;
	    });
	    $(this).keypress(function (e) {
	        idleTime = 0;
	    });
	function timerIncrement() {
	    idleTime = idleTime + 1;
	    if (idleTime > 13) { // 20 minute
	    	  sessionStorage.removeItem('userid');
	          sessionStorage.removeItem('useremail');
	          var url1= getAuthBaseUrl() + "logout";
	        	 APIGetTextCall(url1,function(data, textStatus){
	        	    location.assign("login.html");
	        		    },
	        		    function(jqXHR, textStatus, errorThrown){
	        		      console.log('fail to logout');
	        		     // alert('Insert Failure:'+errorThrown);
	        		    }
	        		      
	        		      );
	        			
	        		 }
	}
	
	var currentPath = window.location.pathname;
	var currentPage = (currentPath).substring(currentPath.lastIndexOf('/') + 1); 
	console.log(currentPage);
	var addBool=false;
	if(currentPage == "Admin.html"){
		if(sessionStorage.getItem('userid') == null){
			alert("Not authorised Please login");
			location.assign("login.html");
		}
		else{
			CRUDAdminsReady();
		}
	}
	else if(currentPage == "AddOrEditAdmin.html"){
		var getUserObj="";
		console.log("SETTING getUserObj to null");
		AddOrEditAdminReady();
	}
		
	function CRUDAdminsReady(){	
		getAllAdmins();			
	}
	function AddOrEditAdminReady(){
		var sessionid = sessionStorage.getItem('id');
		if(sessionid==null)
		{
			addBool=true;
			$("#AOEupdate").html('Add');	
		}
		else{
			addBool = false;
			//get id from session and call GETUSER API , to fill out AOE fields	
			getUserAPI(sessionid);
			console.log(getUserObj);
			
			$("#AOEfName").val(getUserObj.userProfile.firstName);
			$("#AOElName").val(getUserObj.userProfile.lastName);
			$("#AOEphone").val(getUserObj.userProfile.mobilePhone);
			$("#AOEemail").val(getUserObj.username);
//			$("#AOEType option:selected").val(getUserObj.type);
			$("#AOEType option:selected").text(getUserObj.type);
			$("#AOEemail").prop("readonly",true);
			$("#AOEupdate").html('Update');
			$("#AOEusername").addClass('input-disabled');
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
  				console.log(data);
  				location.assign("Admin.html");
  				
  				
			  },
			  function(jqXHR, textStatus, errorThrown){
				  console.log('fail to login');
				  alert("Please check your username and password and try again");
//				  alert('Login Failure:'+errorThrown);
			  }
		  );
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
							alert("Password could not be reset at this time. Please try again later.");
//						  alert('reset Failure:'+errorThrown);
					  }
				  );
			}
		}
	});
//////RESET_PWD FUNCS END////////
//////CRUD_ADMINS FUNCS START////////
	console.log(getAuthBaseUrl() + "user/getAll?type=ALL_ADMINS");
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
			 	var delAll = false;
				
				$("#tblList").html(
					"<thead>"+
					
//					"	<th><a class='CRUDDelete' href='#' >Delete</a></th>"+
					"	<th data-sort-ignore='true'><input type = 'checkbox' value='' alt='Delete"+999+"' class='btnFormDelete'/>Delete</th>"+
					"	<th>First Name</th>"+
				
					"	<th>Last Name</th>"+
					"	<th>Email</th>"+
					"	<th>Phone</th>"+
					"	<th>Admin Type</th>"+
				
					"	<th data-sort-ignore='true'>Edit</th>"+
					
					"</thead>"+
					"<tbody>"+
					"</tbody>"+
		            "<tfoot>"+
					"<tr>"+
				   "<td colspan='14'>"+
				   "<div align='center' class='pagination'></div>"+
				"</td>"+
				"</tr>"+
				"</tfoot>"
					);
				
				var len=tableData.length;
				if(len == undefined) len = 1;
	          
	            
				for(var i=0;i< len; i++){
				var cli = tableData[i];
				 if(cli == undefined)cli = tableData;
				console.log(cli.username +" TYPE:"+ cli.type);

//				console.log(cli);
				$("#tblList").append("<tr>"+
				"	<td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btnFormDelete'/></td>" +
//				"	<td><input id = 'rememberMe' type = 'checkbox' value='' alt='Delete"+i+"' class='btnFormDelete'/></td>" +
				"	<td>"+cli.userProfile.firstName+"</td>" + 
			
				" <td>"+cli.userProfile.lastName+"</td>" + 
				"	<td>"+cli.username+"</td>" + 
				"	<td>"+cli.userProfile.mobilePhone+"</td>" + 
				"	<td>"+cli.type+"</td>" + 
				
				 "	<td><a class='btnFormEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;' >Edit</a></td>"+
//				"	<td><img src='Images/edit.png' alt='Edit"+i+"' class='btnFormEdit'/></td>" +
				"</tr>");		
				} 
				 if (typeof oTable == 'undefined') {
		              oTable = $('#tblList').footable();
		              }
		              
		              else
		              	{
		            	  oTable.trigger('footable_initialize');//.trigger('footable_redraw');// = $('table').footable();
		              	
		              	}
				 $('#clear-filterad').click(function (e) {
		              e.preventDefault();
		              $('#filterad').val('');
		              oTable.trigger('footable_clear_filter');
		            });
				 
				 $('#clear-filterpu').click(function (e) {
                     e.preventDefault();
                     $('#filterpu').val('');
                     PubTable.trigger('footable_clear_filter');
                   });
				 
			 $(".btnFormDelete").bind("click", function(){
				selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
				console.log("index: "+selected_index);
				
				if($(this).is(':checked')){
					if(selected_index == 999){
						$(".btnFormDelete").prop('checked', true);
						for(var i=0;i< tableData.length; i++){
							var cli = (tableData[i]);
							delArray[i] = (cli.username);
						}
						delAll = true;
					}
					else{
						var cli = (tableData[selected_index]);
						delArray[selected_index] = (cli.username);
					}					 
				 }
				 else{
					 if(selected_index == 999){
						$(".btnFormDelete").prop('checked', false);
						 delArray=[];
						 delAll = false;
						}
						else{
							 delArray[selected_index] = "";
						}
				 }
					console.log("DelArray = "+delArray);			
			 });
//			 $("#CRUDDelete a").bind("click", function(){
			$(".CRUDDelete").bind("click", function(){
				 if(delArray.length == 0){
					 alert("Please select an item to delete and try again.")
				 }
				 else{
					 if(delAll){
						 var allConfirm = confirm("Are you sure you want to delete ALL admins? This action cannot be undone.");
						 	if (allConfirm == true){
								 for(var i=0;i<delArray.length;i++){
									 if(delArray[i]){
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
				 }
			 });
			 $(".btnFormEdit").bind("click", function(){
					console.log(tableData);
					selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
					var cli = (tableData[selected_index]);
					
					addBool=false;	
				//GET ID FROM THIS OPERATOR AND SET SESSIONID
					sessionStorage.setItem('id',cli.id);
					var popup = window.open("AddOrEditAdmin.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=400, height=500");
				});	
		}
		$("#addAdmin").click(function(e){
			addBool=true;
			sessionStorage.removeItem('id');
			var popup = window.open("AddOrEditAdmin.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=400, height=500");
		
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
	$("#AOEphone").blur(function(){
		var phone = $("#AOEphone").val();
		if(phone){
			var phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
				if(!(phoneRegex.test(phone)))
				{
					$("#AOEphoneError").html("Please enter a valid phone number");
				}
				else{
					$("#AOEphoneError").html("");
				}
		}
	});
	$("#AOEemail").blur(function(){
		var msg = validateEmail($("#AOEemail").val());
		$("#AOEemailError").html(msg);
	});
	$("#AOEcancel").click(function(e){
		//opener.location.reload();
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