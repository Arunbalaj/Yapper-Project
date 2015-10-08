$(function() {   var idleTime = 0;
  console.log(1);
      //Increment the idle time counter every minute.
      var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

      
     
      //Zero the idle timer on mouse movement.
      $(this).mousemove(function (e) {
          idleTime = 0;
      });
      $(this).keypress(function (e) {
          idleTime = 0;
      });

  function timerIncrement() {
      idleTime = idleTime + 1;
     
     console.log(idleTime);
      if (idleTime > 13) { // 11 minute
    	  
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('useremail');
        location.assign("login.html");
        
          
      }
  }

  var currentPath = window.location.pathname;
  var currentPage = (currentPath).substring(currentPath.lastIndexOf('/') + 1); 
  if(sessionStorage.getItem('userid')==null)
  {
   alert("Not authorised Please login")
  location.assign("login.html")
  }
  else
    
    {
    
 if(currentPage == "user.html")
  {
	 try{
  Listuser();
  }
	 catch(e){
		 console.log("table error");
		 
	 }
	 }
 
 }
  
  
	//var otable=  
  
 //   otable.fnDraw();
 
 
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

  function APIGetJsonCall(url, strJsonData, success, statusCode, failure) 
  {
    $.ajax({
      url : url,
      type : "GET",
      contentType : "application/json; charset=utf-8",
      data : strJsonData,
      dataType : "json",
      statusCode : statusCode,
      async : false,
      success : success,
      error : failure
    });
  }

  function APIPostJsonCall(url, strJsonData, success, statusCode, failure) 
  {
    $.ajax({
      url : url,
      type : "POST",
      contentType : "application/json; charset=utf-8",
      data : strJsonData,
      dataType : "json",
      statusCode : statusCode,
      async : false,
      success : success,
      error : failure
    });
  }
  
  //function viewuser()
 //{
 $("#viewuser").click(function(event){
    	    if(sessionStorage.getItem('userid')==null)
    	    {
    	    alert("Not authorised Please login")
    	    location.assign("login.html")
    	    }
    	    else {
    	     
    	    	
    	    	Listuser();
    	    }
    	 
    	    });
    	  	        
    

 Array.prototype.allValuesSame = function() {

	    for(var i = 1; i < this.length; i++)
	    {
	        if(this[i] !== this[0])
	            return false;
	    }

	    return true;
	}
  
  function Listuser()
       {  
	  console.log(sessionStorage.getItem('user'));
	  
//
//	     var region = $("#regnpro").val();
//  var city = $("#citpro").val();
//      var from_start_date = $("#craetedpro").val();
//      var  to_end_date =  $("#expirepro").val();
//          var type= "PERMANENT";
//          var  Yapps = "region="+region+"&city="+city+"&from_start_date="+from_start_date+"&to_end_date="+to_end_date+"&type="+type; 
//
	  var url = getAuthBaseUrl() + "user/getAll?type=YAPPER";
      
    	 APIGetJsonCall(url,{},function(data, textStatus){
        console.log(data);
        var selected_index = -1;
        var delArray = [];
//      
//        
       
       
          $("#tblListusr").html( 
            "<thead>"+
            " <tr>"+
            " <th data-sort-ignore='true'><a class='btnDeleteee' style='cursor:pointer; text-decoration: underline;'   >Delete</a></th>"+
            " <th>User ID</th>"+
            " <th>Fb Id</th>"+
            " <th>First Name</th>"+
            " <th>Last Name</th>"+
            " <th>Email</th>"+
            " <th>DOB</th>"+
            " <th>Work</th>"+
            " <th>School</th>"+
            " <th>State</th>"+
            " <th>City</th>"+
            " <th>Status</th>"+
            " <th data-sort-ignore='true'>Edit</th>"+
            " </tr>"+
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
          
          
          var len=data.users.length;
          if(len == undefined) len = 1;
          console.log(len);
         
          for(var i=0;i<len; i++){
            console.log(data);
          var cli = data.users[i];
          if(cli == undefined)cli = data.users;
          var valCurDate = new Date(cli.registered);
            valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
          var valCurdob = new Date(cli.userProfile.dob);
          valCurdob = valCurdob.getMonth()+1 + "/" + valCurdob.getDate() + "/" + valCurdob.getFullYear();
          
          try{
        	  sta=cli.userProfile.userAddress.state;
          }
         catch(e)
         {
        	 sta=""; 
         }
         try{
        	cit= cli.userProfile.userAddress.city;
         }
         catch(e)
         {
        	 cit="";
         }
          
          console.log(cli);
              $("#tblListusr").append(
                      
                                 "<tr>"+
                                 " <td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btusDelete'/></td>" +
                                 "  <td>"+cli.id+"</td>" + 
                                 "  <td>"+cli.facebookId+"</td>" + 
                                 "  <td>"+cli.userProfile.firstName+"</td>" + 
                                 "  <td>"+cli.userProfile.lastName+"</td>" + 
                                 "  <td>"+cli.username+"</td>" + 
                                 " <td>"+valCurdob+"</td>" + 
                                 "  <td>"+cli.userProfile.work+"</td>" + 
                                 "  <td>"+cli.userProfile.school+"</td>" + 
                                 "  <td>"+sta+"</td>" + 
                                 "  <td>"+cit+"</td>" + 
                                 "  <td>"+cli.status+"</td>" + 
                                 "  <td><a class='btnEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;' >EDIT</a></td>"+ 
                                 "</tr>");

                        
          
          }

          if (typeof oTable == 'undefined') {
          oTable = $('#tblListusr').footable();
          }
          
          else
          	{
        	  oTable.trigger('footable_initialize');//trigger('footable_redraw');// = $('table').footable();
          	
          	}
          $('#clear-filterus').click(function (e) {
              e.preventDefault();
              $('#filterus').val('');
              oTable.trigger('footable_clear_filter');
            });
       
          $(".btusDelete").bind("click", function(){
            selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
             if($(this).is(':checked')){

               var cli = (data.users[selected_index]);
              delArray[selected_index] = (cli.username);
             }
             else{

               delArray[selected_index] = "";
             }
              console.log("DelArray = "+delArray);      
           });

          $(".btnDeleteee").bind("click", function(){
             if(delArray.length == 0||delArray.allValuesSame()==true){
              alert("Select something to Delete")
             }
             else{
               var r = confirm("Are you sure you want to delete marked Yapper(s)?");
               if (r == true) {
               for(var i=0;i<delArray.length;i++){
                 if(delArray[i])
                {
                   
                     console.log("deleting : "+delArray[i]);
                    var url = getAuthBaseUrl() + "user/delete/";
                    APIPostJsonCall(url,delArray[i],
                    function(data, textStatus){
                      
                    },
                    function(jqXHR, textStatus, errorThrown){
                      console.log('Could not delete '+delArray[i]);
                    });
                   }
                }
               alert("User(s) successfully deleted");
               location.reload();
               }           
             }
           });
         
          $(".btnEdit").bind("click", function(){
            console.log(data);
            selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
            console.log(selected_index);
              
            
              var cli = (data.users[selected_index]);
              if(cli == undefined)cli = data.users;
              //console.log(cli.parameterType);
              var valCurdob = new Date(cli.userProfile.dob);
              valCurdob = valCurdob.getMonth()+1 + "/" + valCurdob.getDate() + "/" + valCurdob.getFullYear();
             
              var popup = window.open("popupyapper.html", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, top=100, left=300, width=700, height=450");
              popup.onload =  function()
              {
                console.log(cli.id);
                
                if(cli.status == "BANNED")
                	{
                	console.log("hre")
                	
                	$(popup.document).contents().find("#usrbandned").prop("checked", true);
                	}
                $(popup.document).contents().find("#fname").val(cli.userProfile.firstName)
                  // $(popup.document).contents().find(display.innerhtml).val(cli.parameterValue)
                     $(popup.document).contents().find("#lname").val(cli.userProfile.lastName)
                    $(popup.document).contents().find("#umail").val(cli.username) 
                   
                  $(popup.document).contents().find("#fbid").val(cli.facebookId)
                 $(popup.document).contents().find("#iduser").val(cli.id)
                $(popup.document).contents().find("#typey").val(cli.type)
                $(popup.document).contents().find("#stat").val(cli.status)
                
                $(popup.document).contents().find("#dob").val(valCurdob)
                $(popup.document).contents().find("#usrgn").val(cli.userProfile.userAddress.state)
               $(popup.document).contents().find("#usrcty").val(cli.userProfile.userAddress.city)
               $(popup.document).contents().find("#usrmem").val(cli.rank)
               
               $(popup.document).contents().find("#usrjn").val(valCurDate)
               $(popup.document).contents().find("#usrwrk").val(cli.userProfile.work)
              $(popup.document).contents().find("#usrscl").val(cli.userProfile.school)
              
                    
              }

              });
      
          
          //console.log(cli);/
         
          
           },status,
        function(jqXHR, textStatus, errorThrown){
          console.log('fail to insert');
          //alert('view Failure:'+errorThrown);
        }
          
          );
    	 
    
       }
 
  
  
  //$("#Excelyapper").click(function(event){

	 
  $("#Excelyapper").click(function(event){
  	  var sesemail = sessionStorage.getItem('useremail');
       
    	//    var FromDate = new Date(objFromDate);
    	  //   var ToDate = new Date(objToDate);
         var sessionid = sessionStorage.getItem('userid');
         var report =JSON.stringify({
             userId : sessionid,
            region : $("#usrregion").val(),
            reportType : "USERS",
            registered:$("#usrjndate").val(),
             status: $("#usrstat").val()
                 
            });
         console.log(report);
         var url= getAuthBaseUrl() + "users/report";
         //alert(url);
       
    			
    	    	 APIPostJsonCall(url,report, function(data,textStatus){
    	    		    	   console.log('successfully entered generated report');
    	    		    	   alert("Report will be mailed to "+sesemail+" shortly");
    	    		    	   window.close();
    	    		               
    	    		  },status,
    	    		  function(jqXHR, textStatus, errorThrown){
    	    	            console.log('fail to create');
    	    	            
    	    	            console.log(jqXHR.responseText);
    	    	            var data = jqXHR.responseText;
    	    	            alert("Report will be mailed to "+sesemail+" shortly");
    	    	            
    	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
    	    	            console.log('report Failure:'+errorThrown);
    	    	            window.close();
    	    	          
    	    	
    	    		  }
    	    	        
    	         );

  });



  $("#yapperopen").click(function(event){
	window.open("yappersexport.html", "_blank", " top=100, left=300,width=700, height=300");
       	
  	
  });
});