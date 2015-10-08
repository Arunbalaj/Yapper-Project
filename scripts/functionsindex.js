$(document).ready(function(){
 
	var idleTime = 0;
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
//
  var currentPath = window.location.pathname;
  var currentPage = (currentPath).substring(currentPath.lastIndexOf('/') + 1); 
  if(sessionStorage.getItem('userid')==null)
  {
    $('#body').hide();
  alert("Not authorised Please login")
  location.assign("login.html")
  }
  else
    
    {
    
    if(currentPage == "publicyapps.html")
      {
    	try{
    		
      Listpublic();

    	}
    	catch(e)
    	{
    		document.getElementById("publicy").innerHTML = "No data Available in Public Yapp!";	
    	}
      }
   if(currentPage == "eventyapp.html")
      {
	   Listevent();
//	   try
//		 {
//			 Listevent();
//		 }
//		 catch(e)
//		 {
//			 console.log("Event error"); 
//			 document.getElementById("tblListevent").innerHTML = "No data Available in Event Yapp!";
//			 
//		 }
      }
 
    if(currentPage == "config.html")
    {
    Listcon();
    }
 if(currentPage == "permanentYapps.html")
    {
	 try{
			List();
		}
		catch(e)
		{
			console.log("permanent yapp error");
			document.getElementById("tblList2").innerHTML = "No data Available in permanent Yapp!";
		}
    }
  
 
 if(currentPage == "index.html")
 {
	 try{
	 
	 mausubi();

	 }
		catch(e)
		{
			console.log("mAU chart error");
			
		}
 }
 if(currentPage == "index.html")
 {
	 try{
	 
		 dausubi();
	 }
		catch(e)
		{
			console.log("dAU chart error");
			
			
		}
 }
 if(currentPage == "index.html")
 {
	 try{
	 chattcon();
	
	 }
		catch(e)
		{
			console.log("Type chart error");
			
		}
 }
 if(currentPage == "index.html")
 {
	 var dashboard = true;
	try{
		List();
	}
	catch(e)
	{
		console.log("permanent yapp error");
		document.getElementById("tblList2").innerHTML = "No data Available in permanent Yapp!";
	}
     
	 
	 
     
 }
 
 if(currentPage == "index.html")
 {

	 var dashboard = true;
 try{
	Listpublic();
 }
 catch(e){
	 
	 console.log("Public error"); 
	 document.getElementById("publicy").innerHTML = "No data Available in Public Yapp!"; 
 }
}
 
 if(currentPage == "index.html")
 { 
	 var dashboard = true;
	try
	 {
		 Listevent();
 }
	 catch(e)
	 {
		 console.log("Event error"); 
		 document.getElementById("tblListevent").innerHTML = "No data Available in Event Yapp!";
		 
	 }
    }
}
    
 
  

  
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
  function APIuploadimage(url, strJsonData, success, statusCode, failure)
  {
	  $.ajax({
		  url : url,
          type: 'post',
          processData: false,
          contentType: false,
          data: strJsonData,
          dataType: "json",
          statusCode : statusCode,
          success:success,
          error: failure
         
      });
      return false;
  }
  
  $("#submityapp").click(function(event){
    var name = document.getElementById("name").value; 
     var d1 = document.getElementById("startdate").value; 
      var d2 = document.getElementById("enddate").value;
    
    if (name == null || name == "" && d1 == null || d1 == "" && d2 == null || d2 == "" ) {
          alert("Please fill Name, Start date and End date of Yapp");
          return false;
          
          
          
      }
    else
      {
      checkdate();
      }
  });
    function checkdate()
    {
            console.log(document.getElementById("startdate").value);
            var objFromDate = document.getElementById("startdate").value; 
      var objToDate = document.getElementById("enddate").value;
       
      var FromDate = new Date(objFromDate);
      var ToDate = new Date(objToDate);
      var Fromdate1 = new Date();
      var ToDate1 = new Date();
      Fromdate1.setDate(FromDate.getDate()+1);
      ToDate1.setDate(ToDate.getDate()+1);
          var valCurDate = new Date();
          valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
         
         var CurDate = new Date(valCurDate);
      
    
      
          if(Fromdate1<CurDate)
          {
              alert("Start date should not be greater than today's date");
              return false; 
          }
         
         if(Fromdate1 > ToDate1)
          {
              alert("Start date should be lesser than End date");
              return false; 
          }
         
         else
           {
           createyapp();
           }
         
         function createyapp()
         {
        	 var d1 = document.getElementById("startdate").value; 
             var d2 = document.getElementById("enddate").value;
             var FromDate = new Date(d1);
             var ToDate = new Date(d2);
             var FromDate1 = new Date();
             var ToDate1 = new Date();
             FromDate1.setDate(FromDate.getDate()+1);
             ToDate1.setDate(ToDate.getDate()+1);
var url1= getAuthBaseUrl() + "yapp/create";
 
 var sessionid = sessionStorage.getItem('userid');
 var yapp = JSON.stringify({
     name : $("#name").val(),
    description : $("#initialmessage").val(),
   userId : sessionid,
   latitude : $("#latitude").val(),
  longitude : $("#longitude").val(),
   distanceLimit : $("#radius").val(),   
  start :  FromDate1, 
  end :  ToDate1,
 genre:$("#cate").val(),
  type: "PERMANENT",
  address:({
    city:$('#city').val(),
    }),
  region : $("#region").val(),

    });
console.log(yapp);
 APIPostJsonCall(url1, yapp,function(data, textStatus){
    console.log('successfully Inserted');
   
    console.log(data);
var yappid=data.id;
    	//alert("Uploading image");
    	if($('#imaaa').val()==""||$('#imaaa').val()==null)
    		{
    		
    		alert("sucessfully created")
    		}

else
    		{

var data = new FormData();
    		data.append("yappid", yappid);
    		
    		var files = $('#imaaa')[0].files;
    		if (files.length > 0) {
    			//alert("files is " + files + " files[0] is " +   files[0]);
    			data.append("logo", files[0]);
    		}
    		
    		// send
    		$.ajax({
    			type : "POST",
    			url : getAuthBaseUrl()  + "yapp/set/logo",
    			data : data,
    			contentType : false,
    			processData : false,
    			success : function(data, textStatus) {
    				alert("Logo Uploaded and Yapp Created");
    				$('#imaaa').val(''); 
    			},
    			error : function(jqXHR, textStatus, errorThrown) {
    					alert(errorThrown);
    					//alert("Uploaded");
    			}
    		});
    		$('#imaaa,,#craeted,#cit,#regnss,#latitude,#longitude,#radius,#region,#city').val(''); 
    		}
    	$('#name,#initialmessage,#startdate,#enddate').val('');  	
   List();
    console.log("after list");
 //  alert('successfully Inserted');
  
    },status,
    function(jqXHR, textStatus, errorThrown){
      console.log('fail to insert');
     // alert('Insert Failure:'+errorThrown);
    }
      
      );
      }
    }
      
  
  $("#updateyapp").click(function(event){
	  //alert("in update yapp");
    if(sessionStorage.getItem('userid')==null)
    {
    alert("Not authorised Please login")
    location.assign("login.html")
    }
    else 
      {
    	//alert("IN update FN = "+$("#updateyapp").val());
    var btnValue = $("#updateyapp").val();
    	if(btnValue == "OK"){
    		//alert("VIEW NOT UPDATE.")
    		window.close();
    	}
    	else{
    		event.preventDefault();
    		 var d4 = document.getElementById("sdate").value; 
             var d5 = document.getElementById("dateex1").value;
             var FromDate = new Date(d4);
             var ToDate = new Date(d5);
            
    		var yapp = JSON.stringify(
    		    { 
    		  address:({
    		      city:$('#yappcty').val(),
    		      }),
    		      start:FromDate,
    		      description : $("#yappdes").val(),
    		      distanceLimit : $("#yappdist").val(),
    		      genre: $("#yappgnr").val(),
    		      id : $("#yappid").val(),
    		      latitude : $("#yapplat").val(),
    		      end:ToDate,
    		      longitude : $("#yapplong").val(), 
    		      name : $("#yappname").val(),
    		      region : $("#yappreg").val(),
    		           type: $("#type").val(),
    		      userId:$("#iduser").val(),
    		  });
    		console.log(yapp);

    		var url1= getAuthBaseUrl() + "yapp/update";
    		//alert(url1);
    		       APIPostJsonCall(url1,yapp, function(data,textStatus){
    		                  console.log('successfully Updated');
    		                  alert('successfully Updated');
    		                  closeAndRefresh();
    		                  function closeAndRefresh(){
    		                      opener.location.reload();
    		                      window.close(); 
    		                    }
    		  },status,
    		  function(jqXHR, textStatus, errorThrown){
    		    console.log('fail to update');
    		   // alert('update Failure:'+errorThrown);
    		  }
    		    
    		    );
    	}
     
  
      }
});
  
  $("#viewallyapp").click(function(event){
    if(sessionStorage.getItem('userid')==null)
    {
    alert("Not authorised Please login")
    location.assign("login.html")
    }
    else {
    	
    	 var objFromDate = document.getElementById("craetedpro").value; 
         if(objFromDate=null)List();
         else checkdateper(); 
     }
 });
 
 function checkdateper()
 {
        
  var objFromDate = document.getElementById("craetedpro").value; 
     
   var FromDate = new Date(objFromDate);
       var valCurDate = new Date();
       valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
      
      var CurDate = new Date(valCurDate);
   
       if(FromDate > CurDate)
       {
           alert("Start date should not be less than today's date");
           return false; 
       } 
     
      
      else
        {
    	  try{
    		  List();
  	    	}
  	    	catch(e)
  	    	{
  	    		console.log("permanent yapp error");
  	    		document.getElementById("tblList2").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbspNo data Available for selecetd Criteria!";
  	    	} 

     		 
        }
      
 }
    function List(){
    	//$dataTable.fnDraw(); 
    	
    	var objFromDate = document.getElementById("craetedpro").value; 
      var objToDate = document.getElementById("expirepro").value;
    	          
    	    var FromDate = new Date(objFromDate);
    	     var ToDate = new Date(objToDate);
       
    	     var region = $("#regnpro").val();
         var city = $("#citpro").val();
             var from_start_date = $("#craetedpro").val();
             var  to_end_date =  $("#expirepro").val();
                 var type= "PERMANENT";
                 var  Yapps = "region="+region+"&city="+city+"&from_start_date="+from_start_date+"&to_end_date="+to_end_date+"&type="+type; 
               console.log(Yapps);
               
    var url= getAuthBaseUrl() + "yapp/admin/getAll/?"+Yapps;
   
    
     APIGetJsonCall(url,{},function(data, textStatus){
        console.log( data);
        var delArray = [];
        var selected_index = -1;
        var theadEditOrView = "Edit";
   	 	var theadDelete = "<th data-sort-ignore='true'><a class='btnDelete' style='cursor:pointer; text-decoration: underline;'   >Delete</a></th>";
        if(dashboard){
        	theadEditOrView = "View";
        	theadDelete = "";
        }
        console.log( data);
       
     
        $("#tblList2").html( 
        	"<thead>"+
            " <tr>"+theadDelete+
             " <th>Name of Yapp</th>"+
            " <th>Categories</th>"+
            " <th>Sent To</th>"+
            " <th colspan='2'>Last Updated Date & Time  </th>"+
            " <th>Nearby Users</th>"+
            " <th># of Messages</th>"+
            " <th>State</th>"+
            " <th>City</th>"+
            " <th>Radius</th>"+
          //  " <th>Type</th>"+
//            " <th>End Date</th>"+
//            " <th>Initial Message</th>"+
 //    " <th>Source</th>"+
         //   " <th>YappID</th>"+
            " <th>Status</th>"+
           
            " <th data-sort-ignore='true'>"+theadEditOrView+"</th>"+
            " </tr>"+
            "</thead>"+          
            "   <tbody>"+
            "</tbody>"+
            "<tfoot>"+
			"<tr>"+
		   "<td colspan='14'>"+
		   "<div align='center' class='pagination'></div>"+
		"</td>"+
		"</tr>"+
		"</tfoot>"
           
            ); 
        
       
 
       
        console.log( data);
            var len=data.yapps.length;
            if(len == undefined) len = 1;
            console.log(len);
            
        	for(var i=0;i< len; i++){
            console.log(data);
          var cli = data.yapps[i];
          if(cli == undefined)cli = data.yapps;
          
          var loct;
          var des;
          if(cli.address.city==""||cli.address.city==null)
        	  {
        	  loct=""
          }
        	else{
        		
        		loct=cli.address.city;
        	}
          if(cli.description==""||cli.description==null)
    	  {
        	  des=""
      }
    	else{
    		
    		des=cli.address.city;
    	}
          var valCurDate = new Date(cli.updated);
            valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
            var uptime=new Date(cli.updated);
            uptime = uptime.getHours()+1 + ":" + uptime.getMinutes() + ":" + uptime.getSeconds();
          var valCurexp = new Date(cli.end);
          valCurexp = valCurexp.getMonth()+1 + "/" + valCurexp.getDate() + "/" + valCurexp.getFullYear();
          var deleteCol = "<td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btnDete'/></td>";      
  		if(dashboard)
  			deleteCol="";
  	
              $("#tblList2").append(
            		  "<tr>"+
            		  deleteCol+
                           //"  <td>"+valCurDate+"</td>" + 
                             " <td>"+cli.name+"</td>" + 
                             "  <td>"+"&nbsp"+cli.genre+"</td>" + 
                           "  <td>"+cli.numberOfUsers+"</td>" + 
                         "  <td>"+valCurDate+"</td>" + 
                           "  <td>"+uptime+"</td>" + 
                           "  <td>"+cli.numberOfUsersInArea+"</td>" + 
                           "  <td>"+cli.numberOfMessages+"</td>" + 
                           "  <td >"+cli.region+"</td>" + 
                           "  <td >"+"&nbsp"+loct+"</td>" + 
                             " <td>"+cli.distanceLimit+"</td>" + 
                        //   "  <td>"+cli.type+"</td>" + 
//                           "  <td>"+valCurexp+"</td>" + 
//                           " <td>"+des+"</td>" + 
//                           "  <td>"+cli.source+"</td>" + 
                       //    "  <td>"+cli.id+"</td>" + 
                             "  <td>"+cli.status+"</td>" +
                            "  <td><a class='btnPromoEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;'  >"+theadEditOrView+"</a></td>"+
                           "</tr>"  
                           );
              
              
              
              
            
          	
          }    

        	 if (typeof PreTable == 'undefined') {
                 PreTable = $('#tblList2').footable();
                 }
                 
                 else
                 	{
                	 PreTable.trigger('footable_initialize');//.trigger('footable_redraw');// = $('table').footable();
                 	
                 	}
        	 $('#clear-filterpe').click(function (e) {
                 e.preventDefault();
                 $('#filterpe').val('');
                 PreTable.trigger('footable_clear_filter');
               });
           $(".btnPromoEdit").bind("click", function(){
            console.log(data);
            selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
            console.log(selected_index);
              
            
              var cli = (data.yapps[selected_index]);
              //console.log(cli.parameterType);
              if(cli == undefined)cli = data.yapps;
              var popup=window.open("popuppromo.html","_blank", "width=800,top=100, left=300 height=400");
        	 //popup.focus;
        	 
        	  popup.onload =  function()
              {
                console.log(cli.id);
                var stdate = new Date(cli.start);
                stdate = stdate.getMonth()+1 + "/" + stdate.getDate() + "/" + stdate.getFullYear();
                
                var valCurDate = new Date(cli.end);
                valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
                
                       $(popup.document).contents().find("#yappid").val(cli.id)
                   
                      $(popup.document).contents().find("#yappname").val(cli.name)
                     $(popup.document).contents().find("#yappdes").val(cli.description)
                    $(popup.document).contents().find("#iduser").val(cli.userId)
                    $(popup.document).contents().find("#sdate").val(stdate)
              $(popup.document).contents().find("#dateex1").val(valCurDate) 
                      $(popup.document).contents().find("#yapplat").val(cli.latitude)
                     $(popup.document).contents().find("#yappdist").val(cli.distanceLimit)
                    $(popup.document).contents().find("#yapplong").val(cli.longitude)
              $(popup.document).contents().find("#yappreg").val(cli.region)                  
                      $(popup.document).contents().find("#yappcty").val(cli.address.city)
                     $(popup.document).contents().find("#yappgnr").val(cli.genre)
                    $(popup.document).contents().find("#type").val(cli.type)
                    if(dashboard)
                  	  $(popup.document).contents().find("#updateyapp").val("OK")
                  else
                	  $(popup.document).contents().find("#updateyapp").val("Update")


                              
              }

              });
          
          $(".btnDete").bind("click", function(){
            
            selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
             if($(this).is(':checked')){
               var cli = (data.yapps[selected_index]);
              delArray[selected_index] = (cli.id);
             }
             else{
              
               delArray[selected_index] = null;
             }
              console.log("DelArray ="+delArray); 
          });
            
          $(".btnDelete").bind("click", function(){
            console.log(delArray.length);
             if(delArray.length == 0||delArray.allValuesSame()==true){
              alert("Selecte something to delete.");
             }
             else{
               var r = confirm("Are you sure you want to delete selected Yapp(s) ?");
               if (r == true) {
                 
                 for(var i=0;i<delArray.length;i++){
                 if(delArray[i])
                {
                   console.log(delArray.length);
                   console.log("deleting : "+delArray[i]);
                    var url = getAuthBaseUrl() + "yapp/delete/";
                    APIPostJsonCall(url,delArray[i],
                    function(data, textStatus){
                     
                    },
                    function(jqXHR, textStatus, errorThrown){
                    	//alert('Could not delete '+delArray[i]);
                    });
                   }
                }
                 alert("Yapp(s) successfully deleted");
                 List();
               }           
             }
           });
      
      	},status,
        function(jqXHR, textStatus, errorThrown){
          console.log('fail to insert');
         // alert('view Failure:'+errorThrown);
          if(errorThrown="UnAuthorised") {
        	  alert('UnAuthorised:Please Login');
        	  location.assign("login.html");
          
          }
        }
          
          );
    
    }
    
    
    
    
    $("#excelpermyapp").click(function(event){
    	
    	  var sesemail = sessionStorage.getItem('useremail');
	         
      	//    var FromDate = new Date(objFromDate);
      	  //   var ToDate = new Date(objToDate);
          alert("Report will be mailed to "+sesemail+" shortly");
          var sessionid = sessionStorage.getItem('userid');
           var report =JSON.stringify({
               userId : sessionid,
              region : $("#regnpro").val(),
              location : $("#citpro").val(),
              from : $("#craetedpro").val(),
              to : $("#expirepro").val(),
               reportType : "YAPPS",
               yappType: "PERMANENT"
                   
              });
           console.log(report);
           var url= getAuthBaseUrl() + "yapps/report";
           // alert(url);
         
    			
    	    	 APIPostJsonCall(url,report, function(data,textStatus){
    	    		    	   console.log('successfully entered generated report');
    	    		               
    	    		  },status,
    	    		  function(jqXHR, textStatus, errorThrown){
    	    	            console.log('fail to create');
    	    	            
    	    	            console.log(jqXHR.responseText);
    	    	            var data = jqXHR.responseText;
    	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
    	    	            console.log('report Failure:'+errorThrown);
    	    	          
    	    	
    	    		  }
    	    	        
    	         );
    	 });             
   
    function abc3(){
    	//alert("abc");
    	
    }
       function Listcon()
       {
      
    var url= getAuthBaseUrl() + "configuration/getAll";
    
    
     APIGetJsonCall(url,{},function(data, textStatus){
        console.log(data);
        var selected_index = -1;
        
          $("#tblListcon").html("");
          $("#tblListcon").html(
            "<thead>"+
            " <tr>"+
            " <th>Parameter</th>"+
            " <th>Description</th>"+
            " <th>Value</th>"+
            " <th>Type</th>"+
            " <th>Edit</th>"+
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
          for(var i=0;i< data.configs.length; i++){
            console.log(data);
          var cli = data.configs[i];
          
//          var valCurDate = new Date(data.yapps.expire[i]);
//          valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
          console.log(cli);
              $("#tblListcon").append("<tr>"+
                          // "  <td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
                           "  <td>"+cli.parameterName+"</td>" + 
                           " <td>"+cli.parameterDescription+"</td>" + 
                           "  <td>"+cli.parameterValue+"</td>" + 
                           "  <td>"+cli.parameterType+"</td>" + 
                          "  <td><a class='btnEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;'>Edit</a></td>"+ 
                           "</tr>");
          
          }

          if (typeof conTable == 'undefined') {
        	  conTable = $('#tblListcon').footable();
          }
          
          else
          	{
        	  conTable.trigger('footable_redraw');// = $('table').footable();
          	
          	}
          
         
       $(".btnEdit").bind("click", function(){
            console.log(data);
            selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
            console.log(selected_index);
              
            
              var cli = (data.configs[selected_index]);
              if(cli == undefined)cli = data.configs;
              //console.log(cli.parameterType);
              var popup = window.open("popupconfi.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=500, height=400");
              popup.onload =  function()
              {
                console.log(cli.id);
                       $(popup.document).contents().find("#parameterid").val(cli.id)
                  // $(popup.document).contents().find(display.innerhtml).val(cli.parameterValue)
                     $(popup.document).contents().find("#parname").val(cli.parameterName)
                     $(popup.document).contents().find("#ParameterValue").val(cli.parameterValue)
                 //   document.getElementById("ParameterValue").focus();
                  
                  
                    
              }

              });
          console.log(cli);
     },status,
        function(jqXHR, textStatus, errorThrown){
          console.log('fail to insert');
          //alert('view Failure:'+errorThrown);
        }
          
          );
    
       }
//  });
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
    	        
     function Listuser()
       {  

//	    	var objFromDate = document.getElementById("craetedpro").value; 
//	      var objToDate = document.getElementById("expirepro").value;
//	    	          
//	    	    var FromDate = new Date(objFromDate);
//	    	     var ToDate = new Date(objToDate);
//	       
//	    	     var region = $("#regnpro").val();
//	         var city = $("#citpro").val();
//	             var from_start_date = $("#craetedpro").val();
//	             var  to_end_date =  $("#expirepro").val();
//	                 var type= "PERMANENT";
//	                 var  Yapps = "region="+region+"&city="+city+"&from_start_date="+from_start_date+"&to_end_date="+to_end_date+"&type="+type; 
//	               console.log(Yapps);
       var url = getAuthBaseUrl() + "user/getAll?type=YAPPER&status=ACTIVE";
     
    	 APIGetJsonCall(url,{},function(data, textStatus){
        console.log(data);
        var selected_index = -1;
        var delArray = [];
        
          $("#tblListusr").html("");
          $("#tblListusr").html( 
            "<thead>"+
            " <tr>"+
            " <th><a class='btnDeleteee' href='#' >Delete</a></th>"+
          
            " <th>User ID</th>"+
            " <th>Fb Id</th>"+
            " <th>First Name</th>"+
            " <th>Last Name</th>"+
            " <th>Email&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>"+
            " <th>DOB</th>"+
            " <th>Work</th>"+
            " <th>School</th>"+
            " <th>State</th>"+
            " <th>City&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>"+
            " <th>Status</th>"+
           // " <th># of Reports</th>"+
            " <th>Edit</th>"+
            " </tr>"+
            "</thead>"+
            "<tbody>"+
            "</tbody>"
            );
          for(var i=0;i< data.users.length; i++){
            console.log(data);
          var cli = data.users[i];
          
          var valCurDate = new Date(cli.registered);
            valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
          var valCurdob = new Date(cli.userProfile.dob);
          valCurdob = valCurdob.getMonth()+1 + "/" + valCurdob.getDate() + "/" + valCurdob.getFullYear();
          
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
                             "  <td>"+cli.userProfile.userAddress.state+"</td>" + 
                            "  <td>"+cli.userProfile.userAddress.city+"</td>" + 
                           "  <td>"+cli.status+"</td>" + 
                         //"  <td>"+valCurDate+"</td>" + 
                         //  "  <td>"+cli.reminderCounter+"</td>" + 
                           "  <td><a class='btnEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;' >EDIT</a></td>"+ 
                             "</tr>");

                        
          
          } 
          if (typeof usrTable == 'undefined') {
        	  usrTable = $('#tblListusr').dataTable( {

      		  "bRetrieve" : true,
        	  "scrollY":        "250px",
            "scrollCollapse": false,
            "paging":         false,
            "info":     false,
            "bFilter": false,
            
          	  });
  		}
  		else
  		{
  			usrTable.fnClearTable( 0 );
  			usrTable.fnDraw(true);
  		}
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
             if(delArray.length == 0){
              // alert("Select something to Delete")
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
                    	//alert('Could not delete '+delArray[i]);
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
              //console.log(cli.parameterType);
              var valCurdob = new Date(cli.userProfile.dob);
              valCurdob = valCurdob.getMonth()+1 + "/" + valCurdob.getDate() + "/" + valCurdob.getFullYear();
             
              var popup = window.open("popupyapper.html", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, top=200, left=500, width=800, height=500");
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
          // alert('view Failure:'+errorThrown);
        }
          
          );
     
    
       }
       
       
       
       
  $("#tblconfigset").click(function(event){
    
    if(sessionStorage.getItem('userid')==null)
    {
    alert("Not authorised Please login")
    location.assign("login.html")
    }
    else {
      
    
     event.preventDefault();
     
var config = JSON.stringify(
    { 
  
      id : $("#parameterid").val(), 
      parameterValue: $("#ParameterValue").val(),
      
        

  });

var url1= getAuthBaseUrl() + "configuration/save";
//alert(url1);
       APIPostJsonCall(url1,config, function(data,textStatus){
                  console.log('successfully Updated config');
                  alert("successfully Updated");
                  closeAndRefresh();
                  function closeAndRefresh(){
                      
                    opener.location.reload();
                      window.close(); 
                      
                    }
  //location.assign('viewyapp.html' + "?id=" + data);
  //console.log(data);
  
  },status,
  function(jqXHR, textStatus, errorThrown){
    console.log('fail to update');
   // alert('update Failure:'+errorThrown);
  }
    
    );
    }

});

  
$("#deleteyapp").click(function(event){
        var data = $("#delid").val();   
    // console.log(Yapp);
     var url= getAuthBaseUrl() + "yapp/delete/";
       console.log(url);
      if (confirm('Are you sure you want to Delete the Yapp?')) {
        APIPostJsonCall(url,data,function(data,textStatus){
          //console.log(data);
          
          
       console.log('successfully deletedd')
        },status,
          function(jqXHR, textStatus, errorThrown){
            console.log('fail to delete');
            //alert('delete Failure:'+errorThrown);
          }
            
            );

                } else {
          // Do nothing!
      }
});

$("#viewyapp").click(function(event){
  var sessionid = sessionStorage.getItem('id');
  console.log(sessionid);
    //var id=$("#id").val();
         var id1 =$("#id").val();
    console.log(id);
    //id= JSON.stringify(id);
    console.log(id);
    var yapp = JSON.stringify({
      Id: $("#id").val()
       });
       console.log(yapp);
    
var url= getAuthBaseUrl()+"yapp/get/?id="+id1;
     alert(url);
     APIGetJsonCall(url,{},function(data, textStatus){
        console.log( data);
       // alert("entered view id");
        console.log(data);
        var valCurDate = new Date(data.expire);
        valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
        console.log(data.expire);
        console.log(valCurDate);
        document.getElementById("yappid").value = data.id;
        document.getElementById("yappname").value = data.name;
        document.getElementById("yappdes").value = data.description;
        document.getElementById("iduser").value = data.userId;
        document.getElementById("dateex1").value = valCurDate;
        document.getElementById("yapplat").value = data.latitude;
        document.getElementById("yapplong").value = data.longitude;
        document.getElementById("yappdist").value = data.distanceLimit;
        document.getElementById("yappreg").value = data.region;
        document.getElementById("yappcty").value = data.address.city;
        document.getElementById("yappgnr").value = data.genre;
        document.getElementById("type").value = data.type;
        
     },status,
        function(jqXHR, textStatus, errorThrown){
      // alert('view Failure:'+errorThrown);
        }
          
          );

  });

$("#excelyappind").click(function(event){
	    var sesemail = sessionStorage.getItem('useremail');
	         
	alert("Report will be mailed to "+sesemail+" shortly");
    var url= getAuthBaseUrl() + "yapps/report";
    // alert(url);
    var sessionid = sessionStorage.getItem('userid');
     var report =JSON.stringify({
         userId : sessionid,
        region : $("#regnss").val(),
        location : $("#cit").val(),
        from : $("#craeted").val(),
        to :$("#expire").val(),
        reportType : "YAPPS"
        });
     console.log(report);
    

    APIPostJsonCall(url,report, function(data,textStatus){
      console.log('successfully entered generated report');
      window.location.href = getHost() + '/yapper/filedownload/' + data; 
      
     // alert();
      },status,
      function(jqXHR, textStatus, errorThrown){
        console.log('fail to create');
        
        console.log(jqXHR.responseText);
        var data = jqXHR.responseText;
        window.location.href = getHost() + '/yapper/filedownload/' + data;
        console.log('report Failure:'+errorThrown);
      }
        
        );
});





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
     
       window.close();
  	    	 APIPostJsonCall(url,report, function(data,textStatus){
  	    		    	   console.log('successfully entered generated report');
  	    		    	   alert("Report will be mailed to "+sesemail+" shortly");
  	    		           
  	    		               
  	    		  },status,
  	    		  function(jqXHR, textStatus, errorThrown){
  	    	            console.log('fail to create');
  	    	            
  	    	            console.log(jqXHR.responseText);
  	    	            var data = jqXHR.responseText;
  	    	            alert("Report will be mailed to "+sesemail+" shortly");
  	    	            
  	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
  	    	            console.log('report Failure:'+errorThrown);
  	    	          
  	    	
  	    		  }
  	    	        
  	         );

});



$("#updateyapper").click(function(event){
    //alert("IN updateyapper FN");
    if(sessionStorage.getItem('userid')==null)
  {
  alert("Not authorised Please login")
  location.assign("login.html")
  }
  else 
    {
  //alert("IN update FN");
  var che=$('#usrbandned').is(':checked'); 
  console.log(che);
  if(che==true){
	  
	  var status ="BANNED";
  }
  if(che==false)
	  {
	  var status ="ACTIVE";
	  }
//alert(status);
var objFrdob = document.getElementById("dob").value;
var DOBdate = new Date(objFrdob);

   var user =JSON.stringify({
  
    id : $("#iduser").val(),
     status : status,
       type: $("#typey").val(),
       rank:$("#usrmem").val(),
      
         userProfile:({
            firstName:$('#fname').val(),
            lastName:$('#lname').val(),
            dob:DOBdate,
            school:$('#usrscl').val(),
            work:$('#usrwrk').val(),
            userAddress:({
            	city:$('#usrcty').val(),
               state:$('#usrgn').val(),
            }),
            }),
    username:$("#umail").val(),
});
console.log(user);

var url1= getAuthBaseUrl() + "user/update";

   APIPostJsonCall(url1,user, function(data,textStatus){
	   alert("Update Successful");
		 opener.location.reload();
		 window.close(); 
			console.log("UPDATE SUCCESS");
                  
},status,
function(jqXHR, textStatus, errorThrown){
  console.log('fail to update');
 // alert('update Failure:'+errorThrown);
  closeAndRefresh();
  function closeAndRefresh(){
      opener.location.reload();
      window.close(); 
    }
  
}
 
  );

    }
});

$("#excelpublicyapp").click(function(event){
	
	  var sesemail = sessionStorage.getItem('useremail');
       
	//    var FromDate = new Date(objFromDate);
	  //   var ToDate = new Date(objToDate);
    alert("Report will be mailed to "+sesemail+" shortly");
    var sessionid = sessionStorage.getItem('userid');
     var report =JSON.stringify({
         userId : sessionid,
        region : $("#regnss").val(),
        location : $("#cit").val(),
        from : $("#craeted").val(),
        to : $("#expire").val(),
         reportType : "YAPPS",
         yappType: "PUBLIC"
             
        });
     console.log(report);
     var url= getAuthBaseUrl() + "yapps/report";
    // alert(url);
   
			
	    	 APIPostJsonCall(url,report, function(data,textStatus){
	    		    	   console.log('successfully entered generated report');
	    		               
	    		  },status,
	    		  function(jqXHR, textStatus, errorThrown){
	    	            console.log('fail to create');
	    	            
	    	            console.log(jqXHR.responseText);
	    	            var data = jqXHR.responseText;
	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
	    	            console.log('report Failure:'+errorThrown);
	    	          
	    	
	    		  }
	    	        
	         );
	 });   


$("#viewpublicyapp").click(function(event){
    if(sessionStorage.getItem('userid')==null)
    {
    alert("Not authorised Please login")
    location.assign("login.html")
    }
    else {
    	 
        var objFromDate = document.getElementById("craeted").value; 
        if(objFromDate=null)Listpublic();
        else checkdate2();
    }
});

function checkdate2()
{
       
 
	var objFromDate = document.getElementById("craeted").value; 
    
  var FromDate = new Date(objFromDate);
      var valCurDate = new Date();
      valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
     
     var CurDate = new Date(valCurDate);
  
      if(FromDate > CurDate)
      {
          alert("Start date should not be greater than today's date");
          return false; 
      } 
    
     
     else
       {
    	 try{
    		 Listpublic();
 	    	}
 	    	catch(e)
 	    	{
 	    		console.log("permanent yapp error");
 	    		document.getElementById("publicy").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbspNo data Available for selecetd Criteria!";
 	    	}  
       }
     
}

Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }

    return true;
}

    function Listpublic(){

var region = $("#regnss").val();
 var city = $("#cit").val();
     var from_start_date = $("#craeted").val();
     var  to_end_date = $("#expire").val();
         var type= "PUBLIC";
         var  Yapps = "region="+region+"&city="+city+"&from_start_date="+from_start_date+"&to_end_date="+to_end_date+"&type="+type; 
         $('#expire,#craeted,#cit,#regnss').val('');
var url= getAuthBaseUrl() + "yapp/admin/getAll/?"+Yapps;
     console.log(url);
     APIGetJsonCall(url,{},function(data, textStatus){
    	 var theadEditOrView = "Edit";
    	 var theadDelete = "<th data-sort-ignore='true'><a class='btnDelete' style='cursor:pointer; text-decoration: underline;'   >Delete</a></th>";
         if(dashboard){
         	theadEditOrView = "View";
         	theadDelete = "";
         }
         console.log( data);
            var delArray = [];
            var selected_index = -1;
            console.log( data);
               
                $("#publicy").html(
                	   	"<thead>"+
                        " <tr>"+theadDelete+
                         " <th>Name of Yapp</th>"+
                        " <th>Categories</th>"+
                        " <th>Sent To</th>"+
                        " <th colspan='2'>Last Updated Date & Time</th>"+
                        " <th>Nearby Users</th>"+
                        " <th># of Messages</th>"+
                        " <th>State</th>"+
                        " <th>City&nbsp&nbsp&nbsp&nbsp</th>"+
                        " <th>Radius</th>"+
                      //  " <th>Type</th>"+
//                        " <th>End Date</th>"+
//                        " <th>Initial Message</th>"+
             //    " <th>Source</th>"+
                     //   " <th>YappID</th>"+
                        " <th>Status</th>"+
                       
                        " <th data-sort-ignore='true'>"+theadEditOrView+"</th>"+
                        " </tr>"+
                        "</thead>"+          
                        "   <tbody>"+
                        "</tbody>"+
                        "<tfoot>"+
            			"<tr>"+
            		   "<td colspan='14'>"+
            		   "<div align='center' class='pagination'></div>"+
            		"</td>"+
            		"</tr>"+
            		"</tfoot>"
                    );      console.log( data);
                    
                    var len=data.yapps.length;
                    if(len == undefined) len = 1;
                    console.log(len);
             
                    for(i=0;i<len; i++){
                     console.log(data);
                     var cli = data.yapps[i];
                     if(cli == undefined)cli = data.yapps;
                     var valCurDate = new Date(cli.updated);
                     valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
                     var uptime=new Date(cli.updated);
                     uptime = uptime.getHours()+1 + ":" + uptime.getMinutes() + ":" + uptime.getSeconds();     var valCurexp = new Date(cli.end);
                valCurexp = valCurexp.getMonth()+1 + "/" + valCurexp.getDate() + "/" + valCurexp.getFullYear();
                var deleteCol = "<td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btnDete'/></td>";      
        		if(dashboard)
        			deleteCol="";
                                    
                    $("#publicy").append(
                    		"<tr>"+
                  		  deleteCol+
                                 //"  <td>"+valCurDate+"</td>" + 
                                   " <td>"+cli.name+"</td>" + 
                                   "  <td>"+"&nbsp"+cli.genre+"</td>" + 
                                 "  <td>"+cli.numberOfUsers+"</td>" + 
                               "  <td>"+valCurDate+"</td>" + 
                                 "  <td>"+uptime+"</td>" + 
                                 "  <td>"+cli.numberOfUsersInArea+"</td>" + 
                                 "  <td>"+cli.numberOfMessages+"</td>" + 
                                 "  <td >"+"&nbsp"+cli.region+"</td>" + 
                                 "  <td >"+"&nbsp"+cli.address.city+"</td>" + 
                                   " <td>"+cli.distanceLimit+"</td>" + 
                              //   "  <td>"+cli.type+"</td>" + 
//                                 "  <td>"+valCurexp+"</td>" + 
//                                 " <td>"+des+"</td>" + 
//                                 "  <td>"+cli.source+"</td>" + 
                             //    "  <td>"+cli.id+"</td>" + 
                                   "  <td>"+cli.status+"</td>" +
                                  "  <td><a class='btnPublicEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;'  >"+theadEditOrView+"</a></td>"+
                                 "</tr>"  
                                 );
                    
                }
                    

                    if (typeof PubTable == 'undefined') {
                    	PubTable = $('#publicy').footable();
                        }
                        
                        else
                        	{
                        	PubTable.trigger('footable_initialize');//.trigger('footable_redraw');// = $('table').footable();
                        	
                        	}
                    $('#clear-filterpu').click(function (e) {
                        e.preventDefault();
                        $('#filterpu').val('');
                        PubTable.trigger('footable_clear_filter');
                      });
            		
                 
                $(".btnPublicEdit").bind("click", function(){
                	if(dashboard){
                		//alert("View not edit");
                	}
                    console.log(data);
                    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
                    console.log(selected_index);
                        
                    
                        var cli = (data.yapps[selected_index]);
                        //console.log(cli.parameterType);
                        console.log(cli);
                        if(cli == undefined)cli = data.yapps;
                        var popup = window.open("popuppublic.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=300, width=800, height=400");
                        popup.onload =  function()
                        {
                           // console.log(cli.id);
                            var valCurSt = new Date(cli.start);
                            var valtime= valCurSt.getHours() + ":" + valCurSt.getMinutes() + ":" + valCurSt.getSeconds();
                              valCurSt = valCurSt.getMonth()+1 + "/" + valCurSt.getDate() + "/" + valCurSt.getFullYear();
                            var valCurDate = new Date(cli.end);
                            var valtime2= valCurDate.getHours() + ":" + valCurDate.getMinutes() + ":" + valCurDate.getSeconds();
                            
                            valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
                            
                             $(popup.document).contents().find("#yappid").val(cli.id)
                             
                            $(popup.document).contents().find("#yappname").val(cli.name)
                           $(popup.document).contents().find("#yappdes").val(cli.description)
                          $(popup.document).contents().find("#iduser").val(cli.userId)
                        $(popup.document).contents().find("#dateex1").val(valCurDate) 
                         $(popup.document).contents().find("#sdate").val(valCurSt) 
                         $(popup.document).contents().find("#stime").val(valtime) 
                          $(popup.document).contents().find("#etime").val(valtime2) 
                            $(popup.document).contents().find("#yapplat").val(cli.latitude)
                           $(popup.document).contents().find("#yappdist").val(cli.distanceLimit)
                          $(popup.document).contents().find("#yapplong").val(cli.longitude)
                        $(popup.document).contents().find("#yappreg").val(cli.region)                                
                            $(popup.document).contents().find("#yappcty").val(cli.address.city)
                           $(popup.document).contents().find("#yappgnr").val(cli.genre)
                          $(popup.document).contents().find("#type").val(cli.type)
                          if(dashboard)
                        	  $(popup.document).contents().find("#updateyapp").val("OK")
                        else
                      	  $(popup.document).contents().find("#updateyapp").val("Update")
                    
                        }

                        });
                
                $(".btnDete").bind("click", function(){
                    
                    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
                     if($(this).is(':checked')){
                         var cli = (data.yapps[selected_index]);
                        delArray[selected_index] = (cli.id);
                     }
                     else{
                        
                         delArray[selected_index] = null;
                     }
                        console.log("DelArray ="+delArray); 
                });
                    
                $(".btnDelete").bind("click", function(){
                    console.log(delArray.length);
                     if(delArray.length == 0||delArray.allValuesSame()==true){
                         alert("Select something to delete.")
                    	 console.log("inside null");
                     }
                     else{
                    	 console.log(delArray.allValuesSame());
                         var r = confirm("Are you sure you want to delete selected Yapp(s) ?");
                         if (r == true) {
                             
                             for(var i=0;i<delArray.length;i++){
                             if(delArray[i])
                            {
                                 console.log(delArray.length);
                               console.log("deleting : "+delArray[i]);
                                    var url = getAuthBaseUrl() + "yapp/delete/";
                                    APIPostJsonCall(url,delArray[i],
                                    function(data, textStatus){
                                       
                                    },
                                    function(jqXHR, textStatus, errorThrown){
                                        alert('Could not delete '+delArray[i]);
                                    });
                                 }
                          
                             
                            }
                             alert("Yapp(s) successfully deleted");
                             location.reload();
                         }                   
                     }
                 });
        
     },status,
          function(jqXHR, textStatus, errorThrown){
              console.log('fail to insert');
              //alert('view Failure:'+errorThrown);
          }
                
              );
    
    
    }
    $("#yapperopen").click(function(event){
  	window.open("yappersexport.html", "_blank", "width=700, height=300");
         	
    	
    });
    
   
 
    
    $("#Configyapptype").click(function(event){
    	window.open("popupchattype.html", "_blank", "width=700, height=300");
         	
    	
    });

    $("#exceleventyapp").click(function(event){
    	
    	  var sesemail = sessionStorage.getItem('useremail');
           
    	//    var FromDate = new Date(objFromDate);
    	  //   var ToDate = new Date(objToDate);
         var sessionid = sessionStorage.getItem('userid');
         var report =JSON.stringify({
             userId : sessionid,
            region : $("#regneve").val(),
            location : $("#citeve").val(),
            from : $("#craetedeve").val(),
            to : $("#expireeve").val(),
             reportType : "YAPPS",
             yappType: "EVENT"
                 
            });
         console.log(report);
         var url= getAuthBaseUrl() + "yapps/report";
        // alert(url);
       
    			
    	    	 APIPostJsonCall(url,report, function(data,textStatus){
    	    		    	   console.log('successfully entered generated report');
    	    		    	   alert("Report will be mailed to "+sesemail+" shortly");
    	    		           
    	    		               
    	    		  },status,
    	    		  function(jqXHR, textStatus, errorThrown){
    	    	            console.log('fail to create');
    	    	            
    	    	            console.log(jqXHR.responseText);
    	    	            var data = jqXHR.responseText;
    	    	          alert("Report will be mailed to "+sesemail+" shortly");
    	    	            
    	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
    	    	            console.log('report Failure:'+errorThrown);
    	    	          
    	    	
    	    		  }
    	    	        
    	         );
    	 });  
    
    $("#vieweventyapp").click(function(event){
        if(sessionStorage.getItem('userid')==null)
        {
        alert("Not authorised Please login")
        location.assign("login.html")
        }
        else {
        	 
            var objFromDate = document.getElementById("craetedeve").value; 
            if(objFromDate=null)Listevent();
            else checkdate3(); 
        }
    });
    
    function checkdate3()
    {
           
     var objFromDate = document.getElementById("craetedeve").value; 
        
      var FromDate = new Date(objFromDate);
          var valCurDate = new Date();
          valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
         
         var CurDate = new Date(valCurDate);
      
          if(FromDate > CurDate)
          {
              alert("Start date should not be greater than today's date");
              return false; 
          } 
        
         
         else
           {
         try{
        		 Listevent();
     	}
     	catch(e)
     	{
     		console.log("permanent yapp error");
     		document.getElementById("tblListevent").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbspNo data Available for selecetd Criteria!";
     	}  
           }
         
    }
        function Listevent(){
    
    var region = $("#regneve").val();
     var city = $("#citeve").val();
                 var from_start_date = $("#craetedeve").val();
         var  to_end_date = $("#expireeve").val();
             var type= "EVENT";
             var  Yapps = "region="+region+"&city="+city+"&from_start_date="+from_start_date+"&to_end_date="+to_end_date+"&type="+type; 
             $('#regneve,#citeve,#craetedeve,#expireeve').val('');
      
var url= getAuthBaseUrl() + "yapp/admin/getAll/?"+Yapps;
         console.log(url);
         APIGetJsonCall(url,{},function(data, textStatus){
        	 var theadEditOrView = "Edit";
        	 
           
             
      // 	var theadDelete =  "   <th><input type='button' value='Delete' class='btnDelete'</th>"
        	 var theadDelete = "   <th data-sort-ignore='true'><a class='btnDelete' style='cursor:pointer; text-decoration: underline;'   >Delete</a></th>";
             if(dashboard){
             	theadEditOrView = "View";
             	theadDelete = "";
             }
             console.log( data);
                var delArray = [];
                var selected_index = -1;
              //  console.log( data);
              //  $( "#tblListevent" ).addClass( "table table-bordered" );
                   $("#tblListevent").html(
                		   
                        "<thead>"+
                        "   <tr>"+theadDelete+
                     //   "   <th data-sort-initial='true'>Start Date</th>"+
                        "   <th data-sort-initial='true'>Name of Yapp</th>"+
                        
                          //    "   <th data-sort-initial='true'>Type</th>"+
                     //   "   <th data-sort-initial='true'>End date</th>"+
                     //    "   <th data-sort-initial='true'>YappID</th>"+
                        " <th>Sent To</th>"+
                      " <th colspan='2'>Last Updated Date & Time</th>"+
                        " <th>Nearby Users</th>"+
                        " <th># of Messages</th>"+
                        "   <th data-sort-initial='true'>State</th>"+
                        //  "   <th>Genre</th>"+
                          "   <th data-sort-initial='true'>Location</th>"+
                          "   <th data-sort-initial='true'>Radius</th>"+
                         // "   <th data-sort-initial='true'>Venue</th>"+
                          "   <th data-sort-initial='true'>Source</th>"+
                   
                        "   <th data-sort-initial='true'>Status</th>"+
                        "<th data-sort-ignore='true'>"+theadEditOrView+"</th>"+
                        "   </tr>"+
                        "</thead>"+
                        "   <tbody>"+
                        "</tbody>"+
                        "<tfoot>"+
        				"<tr>"+
        			   "<td colspan='14'>"+
        			   "<div align='center' class='pagination'></div>"+
        			"</td>"+
        			"</tr>"+
        			"</tfoot>"
                        );  
                   
                
                    var len=data.yapps.length;
                    if(len == undefined) len = 1;
                    console.log(len);
                for(i=0;i<len; i++){
                     console.log(data);
                     var cli = data.yapps[i];
                     var loct;
                     
                     
                     if(cli.venueName==""||cli.venueName==null)
               	  {
                    	 loct="N/A"
                 }
               	else{
               		
               		loct=cli.venueName;
               	}
                     
                     if(cli == undefined)cli = data.yapps;
                    	
                    console.log(cli);
                    var valCurDate = new Date(cli.updated);
                    valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
                    var uptime=new Date(cli.updated);
                    uptime = uptime.getHours()+1 + ":" + uptime.getMinutes() + ":" + uptime.getSeconds();
                    var valCurexp = new Date(cli.end);
                    valCurexp = valCurexp.getMonth()+1 + "/" + valCurexp.getDate() + "/" + valCurexp.getFullYear();
            		var deleteCol = "<td><input type = 'checkbox' value='' alt='Delete"+i+"' class='btnDete'/></td>";      
            		if(dashboard)
            			deleteCol="";
            		  
                        $("#tblListevent").append(
                        		
                        		"<tr>"+
                                deleteCol+
                                                    // "  <td>"+valCurDate+"</td>" + 
                                						" <td>"+cli.name+"</td>" + 
                                                           "  <td>"+cli.numberOfUsers+"</td>" + 
                                                     "  <td>"+valCurDate+"</td>" + 
                                                       "  <td>"+uptime+"</td>" + 
                                                       "  <td>"+cli.numberOfUsersInArea+"</td>" + 
                                                       "  <td>"+cli.numberOfMessages+"</td>" + 
                                                       "  <td>"+"&nbsp"+cli.region+"</td>" + 
                                                       //   "  <td>"+cli.genre+"</td>" + 
                                                         "  <td>"+"&nbsp"+cli.address.city+"</td>" + 
                                                         " <td>"+cli.distanceLimit+"</td>" + 
                                                         //"  <td>"+cli.type+"</td>" + 
                                                        // "  <td>"+valCurexp+"</td>" + 
                                                    //     " <td>"+loct+"</td>" + 
                                                         "  <td>"+cli.source+"</td>" + 
                                                
                                                     "  <td>"+cli.status+"</td>" +
                                                     "  <td><a class='btnEventEdit' alt='Edit"+i+"' style='cursor:pointer; text-decoration: underline;' >"+theadEditOrView+"</a></td>"+
                                                     "</tr>"
                                                     );
                    
                        
                    }
                

              
                if (typeof oTable == 'undefined') {
                oTable = $('#tblListevent').footable();
                }
                
                else
                	{
                 oTable.trigger('footable_initialize');//.trigger('footable_redraw');// = $('table').footable();
                	
                	}
                
                $('#clear-filter').click(function (e) {
                    e.preventDefault();
                    $('#filter').val('');
                    oTable.trigger('footable_clear_filter');
                  });
                     $(".btnEventEdit").bind("click", function(){
                        console.log(data);
                        selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
                        console.log(selected_index);
                            
                        
                            var cli = (data.yapps[selected_index]);
                            if(cli == undefined)cli = data.yapps;
                            var popup = window.open("popupevent.html", "_blank", "toolbar=0, scrollbars=0,fullscreen=0, resizable=0, top=100, left=300, width=800, height=460");
                            popup.onload =  function()
                            {
                                console.log(cli.id);
                                var valCurDate = new Date(cli.start);
                                valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
                            var valCurexp = new Date(cli.end);
                            valCurexp = valCurexp.getMonth()+1 + "/" + valCurexp.getDate() + "/" + valCurexp.getFullYear();
                                 
                                 $(popup.document).contents().find("#yappid").val(cli.id)
                                 
                                $(popup.document).contents().find("#yappname").val(cli.name)
                               $(popup.document).contents().find("#yappdes").val(cli.description)
                              $(popup.document).contents().find("#iduser").val(cli.userId)
                           
                             $(popup.document).contents().find("#sdate").val(valCurDate) 
                            $(popup.document).contents().find("#dateex1").val(valCurexp) 
                                $(popup.document).contents().find("#yapplat").val(cli.latitude)
                               $(popup.document).contents().find("#yappdist").val(cli.distanceLimit)
                              $(popup.document).contents().find("#yapplong").val(cli.longitude)
                            $(popup.document).contents().find("#yappreg").val(cli.region)                                
                                $(popup.document).contents().find("#yappcty").val(cli.address.city)
                               $(popup.document).contents().find("#yappgnr").val(cli.genre)
                              $(popup.document).contents().find("#type").val(cli.type)
                              $(popup.document).contents().find("#yappven").val(cli.venueName)
                              if(dashboard)
                            	  $(popup.document).contents().find("#updateyapp").val("OK")
                            else
                          	  $(popup.document).contents().find("#updateyapp").val("Update")

                  
                            }

                            });
                    
                    $(".btnDete").bind("click", function(){
                        
                        selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
                         if($(this).is(':checked')){
                             var cli = (data.yapps[selected_index]);
                            delArray[selected_index] = (cli.id);
                         }
                         else{
                            
                             delArray[selected_index] = null;
                         }
                            console.log("DelArray ="+delArray); 
                    });
                   
                    $(".btnDelete").bind("click", function(){
                        console.log(delArray.length);
                         if(delArray.length == 0||delArray.allValuesSame()==true){
                             alert("Selecte something to delete.")
                         }
                         else{
                             var r = confirm("Are you sure you want to delete selected Yapp(s) ?");
                             if (r == true) {
                                 
                                 for(var i=0;i<delArray.length;i++){
                                 if(delArray[i])
                                {
                                     console.log(delArray.length);
                                   console.log("deleting : "+delArray[i]);
                                        var url = getAuthBaseUrl() + "yapp/delete/";
                                        APIPostJsonCall(url,delArray[i],
                                        function(data, textStatus){
                                            
                                            location.reload();
                                        },
                                        function(jqXHR, textStatus, errorThrown){
                                            console.log('Could not delete '+delArray[i]);
                                        });
                                     }
                                } 
                                 alert("Yapp(s) successfully deleted");
                                 location.reload();
                             }                   
                         }
                     });
                    
                    
         },status,
              function(jqXHR, textStatus, errorThrown){
                  console.log('fail to insert');
                  console.log('view Failure:'+errorThrown);
              }
                    
                  );
        
        }


function Barchar()
{
	
	 google.load("visualization", "1", {packages:["corechart"]});
     google.setOnLoadCallback(drawChart);
     function drawChart() {
       var data = google.visualization.arrayToDataTable([
         ['Month', 'Mid-Atlantic', 'Pacific', 'East', 'Mountain'],
         ['Jan',  1000, 4000, 2000, 1500],
         ['Feb', 1170,4060,2500,1400],
         ['March', 1200, 1120,2302,1123],
         ['April', 1111, 1540,2222,3212]
       ]);

       var options = {
         title: 'Monthly Users',
         is3D: true,
         vAxis: {title: 'Montly Users',  titleTextStyle: {color: 'red'}}
       };

       var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

       chart.draw(data, options);
       
       
       
       
     }
	}

});
