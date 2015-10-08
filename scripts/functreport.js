
  
  
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
           alert(url);
         
    			
    	    	 APIPostJsonCall(url,report, function(data,textStatus){
    	    		    	   console.log('successfully entered generated report');
    	    		    	   window.stop();   
    	    		  },status,
    	    		  function(jqXHR, textStatus, errorThrown){
    	    	            console.log('fail to create');
    	    	            
    	    	            console.log(jqXHR.responseText);
    	    	            var data = jqXHR.responseText;
    	    	          //  window.location.href = getHost() + '/yapper/filedownload/' + data;
    	    	            console.log('report Failure:'+errorThrown);
    	    	            window.stop();
    	    	
    	    		  }
    	    	        
    	         );
    	 });         