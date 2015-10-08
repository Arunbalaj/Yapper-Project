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
     
      //console.log();
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
    
	  if(currentPage == "config.html")
	    {
	    Listcon();
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
  function Listcon()
  {
 
var url= getAuthBaseUrl() + "configuration/getAll";


APIGetJsonCall(url,{},function(data, textStatus){
   console.log(data);
   var selected_index = -1;
   
//     $("#tblListcon2").html(
//       "<thead>"+
//       " <tr>"+
//       " <th>Parameter</th>"+
//       " <th>Description</th>"+
//       " <th>Value</th>"+
//       " <th>Type</th>"+
//       " <th></th>"+
//       " <th>Edit</th>"+
//       " </tr>"+
//       "</thead>"+
//       "<tbody>"+
//       "</tbody>"
//       );
//     
     $('#tblListcon2').dataTable( {
         "data": data.configs,
         "columns": [
             { "title": "ParameterName" },
             { "title": "ParameterDescription" },
             { "title": "ParameterValue" },
             { "title": "ParameterType", "class": "center" },
             
         ]
     } ); 
     
     for(var i=0;i< data.configs.length; i++){
       console.log(data);
     var cli = data.configs[i];
//     var valCurDate = new Date(data.yapps.expire[i]);
//     valCurDate = valCurDate.getMonth()+1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
     console.log(cli);
         $("#tblListcon").append("<tr>"+
                     // "  <td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
                      "  <td>"+cli.parameterName+"</td>" + 
                      " <td>"+cli.parameterDescription+"</td>" + 
                      "  <td>"+cli.parameterValue+"</td>" + 
                      "  <td>"+cli.parameterType+"</td>" + 
                      "  <td></td>" + 
                      "  <th><a class='btnEdit' alt='Edit"+i+"' href='#' >Edit</a></th>"+ 
                      "</tr>");
     
     }$(".btnEdit").bind("click", function(){
       console.log(data);
       selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
       console.log(selected_index);
         
       
         var cli = (data.configs[selected_index]);
         console.log(cli.parameterType);
         var popup = window.open("popupconfi.html", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=200, left=500, width=400, height=400");
         popup.onload =  function()
         {
           console.log(cli.id);
                  $(popup.document).contents().find("#parameterid").val(cli.id)
             // $(popup.document).contents().find(display.innerhtml).val(cli.parameterValue)
                $(popup.document).contents().find("#parname").val(cli.parameterName)
                $(popup.document).contents().find("#ParameterValue").val(cli.parameterValue)
               document.getElementById("ParameterValue").focus();
             
             
               
         }

         });
     console.log(cli);
},status,
   function(jqXHR, textStatus, errorThrown){
     console.log('fail to insert');
     alert('view Failure:'+errorThrown);
   }
     
     );

  }
});