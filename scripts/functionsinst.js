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
    
 if(currentPage == "install.html")
  {
	 try{
		 Listinst();
  }
	 catch(e){
		 console.log("table error");
		 document.getElementById("tblListinst").innerHTML = "No data Available in Installs!";
		 
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
 $("#viewinst").click(function(event){
    	    if(sessionStorage.getItem('userid')==null)
    	    {
    	    alert("Not authorised Please login")
    	    location.assign("login.html")
    	    }
    	    else {
    	     
    	    	try{
    	    	Listinst();
    	    	}
    	    	catch(e)
    	    	{
    	    		console.log("permanent yapp error");
    	    		document.getElementById("tblListinst").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbspNo data Available in Installs for selecetd Criteria!";
    	    	}
    	    }
    	 
    	    });
    	  	        
    

    
  function Listinst()
       {  
	 // console.log(sessionStorage.getItem('user'));
	  var userid = sessionStorage.getItem('userid');

	     var status = $("#insstat").val();
  var city = $("#inscity").val();
      var state = $("#insregion").val();
           var  inst = "userid="+userid+"&status="+status+"&city="+city+"&state="+state; 
 
	  var url = getAuthBaseUrl() + "users/installs/get?"+inst;
      
    	 APIGetJsonCall(url,{},function(data, textStatus){
        console.log(data);
       
//        
       
       
          $("#tblListinst").html( 
            "<thead>"+
            " <tr>"+
           // " <th><a class='btnDeleteee' href='#' >Delete</a></th>"+
          
            " <th>First name</th>"+
            " <th>Last Name</th>"+
            " <th>Email</th>"+
            " <th>Facebook Id</th>"+
            " <th>App Version</th>"+
            
            " <th>Is Banned?</th>"+
            " <th>User Type</th>"+
            " <th>Install Date</th>"+
            " <th>Update Date</th>"+
            " <th>Install Location</th>"+
            " <th>Last Location</th>"+
           // " <th># of Reports</th>"+
           " <th>Receives Notification</th>"+
            " </tr>"+
            "</thead>"+
            " <tbody>"+
            "</tbody>"+
            "<tfoot>"+
			"<tr>"+
		   "<td colspan='14'>"+
		   "<div align='center' class='pagination'></div>"+
		"</td>"+
		"</tr>"+
		"</tfoot>"
            );

          
          
          var len=data.userInstallsList.length;
          if(len == undefined) len = 1;
    
          for(var i=0;i< len; i++){
            console.log(data);
          var cli = data.userInstallsList[i];
          if(cli == undefined)cli = data.userInstallsList;
//          
//          var valCurDate = new Date(cli.registered);
//            valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
//          var valCurdob = new Date(cli.userProfile.dob);
//          valCurdob = valCurdob.getMonth()+1 + "/" + valCurdob.getDate() + "/" + valCurdob.getFullYear();
//       
          
          console.log(cli);
              $("#tblListinst").append(
                      
                   "<tr>"+
                //  " <td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btusDelete'/></td>" +
                 "  <td>"+cli.firstName+"</td>" + 
                 "  <td>"+cli.lastName+"</td>" + 
                 "  <td>"+cli.email+"</td>" + 
                           "  <td>"+cli.fbId+"</td>" + 
                           "  <td>"+cli.appVersion+"</td>" + 
                            " <td>"+cli.isBanned+"</td>" + 
                            "  <td>"+cli.userType+"</td>" + 
                            "  <td>"+cli.installDate+"</td>" + 
                             "  <td>"+cli.updateDate+"</td>" + 
                            "  <td>"+cli.installLocation+"</td>" + 
                           "  <td>"+cli.lastLocation+"</td>" + 
                         "  <td>"+cli.receivesNotification+"</td>" + 
                         //  "  <td>"+cli.reminderCounter+"</td>" + 
                     //      "  <td><a class='btnEdit' alt='Edit"+i+"' href='#' >EDIT</a></td>"+ 
                             "</tr>");

                        
          
          }
          if (typeof oTable == 'undefined') {
              oTable = $('#tblListinst').footable();
              }
              
              else
              	{
            	  oTable.trigger('footable_initialize');//.trigger('footable_redraw');// = $('table').footable();
              	}
            	  $('#clear-filterin').click(function (e) {
                      e.preventDefault();
                      $('#filterin').val('');
                      oTable.trigger('footable_clear_filter');
                    });
         
          
           },status,
        function(jqXHR, textStatus, errorThrown){
          console.log('fail to insert');
          //alert('view Failure:'+errorThrown);
        }
          
          );
    	 
    
       }
 
  
  
  
  $("#exinst").click(function(event){
	  alert("Report will be mailed to "+sesemail+" shortly");
	  var sessionid = sessionStorage.getItem('userid');
	 
	  var sesemail = sessionStorage.getItem('useremail');
      
	    
		 var userid = sessionid;

		          

		 var report =JSON.stringify({
	        userId : sessionid,
	        reportType : "UsersInstalls",
	     
	       city: $("#inscity").val(),
	       state : $("#insregion").val(),
	       status : $("#insstat").val()
	            
	       });
	console.log(report);
		 var url= getAuthBaseUrl() + "users/installs/report/";
		 console.log(url);
			 APIPostJsonCall(url,report, function(data,textStatus){
		    	   console.log('successfully entered generated report');
		    	   
		           
		               
		  },status,
		  function(jqXHR, textStatus, errorThrown){
	            console.log('fail to create');
	            
	            console.log(jqXHR.responseText);
	            var data = jqXHR.responseText;
	           //alert("Report will be mailed to "+sesemail+" shortly");
	            
	          //window.location.href = getHost() + '/yapper/filedownload/' + data;
	            console.log('report Failure:'+errorThrown);
	          

		  }
	                
	              );
		
  });
});