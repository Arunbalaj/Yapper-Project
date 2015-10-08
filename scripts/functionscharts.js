
  
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
  
  
  
  
  function maus()
	{
	  var popup=window.open("popupmau.html", "_blank", "width=700,top=100, left=300 height=400");
	  popup.focus; 	
  	
  }
  function mausub(){
	  var frmf = document.getElementById("maujn").value;
		var tto = document.getElementById("maurpt").value;
	  
	  if (frmf == null || frmf == "" && tto == null || tto == "") {
        alert("Please Fill From and To Fields");
    	return(false);
       
	  }

	  
        	var frm_year = frmf.substr(3,5);
        	var frm_month = frmf.substr(0,2);
        	
         	
        	var to_year =  tto.substr(3,5);
        	var to_month = tto.substr(0,2);	
        	if (frm_year== to_year && frm_month > to_month) {
        		alert('"From" Month should not exceed "To" Month');
        		return(false);
        	}
         	if (frm_year > to_year) {
        		alert('"From" Year should not exceed "To" Year');
        		return(false);
        	}
        	
        
        
    
  else
  	{
		var doc = window.opener.document,
		maujn1 = doc.getElementById("maujn1"),
		maurpt1 = doc.getElementById("maurpt1"),
		mauctype1 = doc.getElementById("mauctype1"),
		maucty1 = doc.getElementById("maucty1"),
		maurgn1 = doc.getElementById("maurgn1"),
		mauloc1 = doc.getElementById("mauloc1"),
		mauzc1 = doc.getElementById("mauzc1");
		
		maujn1.value = document.getElementById("maujn").value;
		maurpt1.value = document.getElementById("maurpt").value;
		mauctype1.value = document.getElementById("mauctype").value;
		maucty1.value = document.getElementById("maucty").value;
		maurgn1.value = document.getElementById("maurgn").value;
		mauloc1.value = document.getElementById("mauloc").value;
		mauzc1.value = document.getElementById("mauzc").value;
	window.close();
	window.onunload = function (e) {
	    opener.mausubi();
	}
	  }
  }
  
  
  var arraydat;
  function mausubi()
  
  {
	  var sessionid = sessionStorage.getItem('userid');
      

		 var userid = sessionid;
		 var from = $("#maujn1").val();
		 var to = $("#maurpt1").val();
		 var  yapptype = $("#mauctype1").val();
		 var city= $("#maucty1").val();
		 var state = $("#maurgn1").val();
		 var country = $("#mauloc1").val();
		 var zip = $("#mauzc1").val();
		 console.log(from);
	 if(from==""){
		 from="01-12";
	 }
		 if(to==""){
			 to="12-25";
		 }
//		 
		 var MAUList="userid="+userid+"&from="+from+"&to="+to+"&yapptype="+yapptype+"&city="+city+"&state="+state+"&country="+country+"&zip="+zip;
			var url= getAuthBaseUrl() + "mau/get/?"+MAUList;
		//   alert(url);
		   APIGetJsonCall(url,{},function(data, textStatus){
	   	         console.log(data);
	    	arraydat=data;
	    
	   	
	    	try{
	      		drawChart();
	      	}
	      	catch(e){
	      		
	      		alert("No new data for selected criteria");
	      	}
	   	     
	   	      function drawChart() {
	   	    	
	   	       var len=arraydat.maus.length;
	   	    
               var chttype= [];
               var maudd= [];
	               for(var i=0;i<len;i++){
		                    var cli = arraydat.maus[i];
		                    chttype[i]=cli.date+ ":" + cli.chatType;
	                        maudd[i]=cli.maus;
	               }
	               
	               console.log(chttype);
	              chattype=JSON.stringify(chttype);
	              console.log(chttype[0]);

	              var data = new google.visualization.DataTable();
	              data.addColumn('string', 'Yapp');
	              data.addColumn('number', 'Users');
	            
	              for(var i=0;i<len;i++){
	              data.addRows([
	                [chttype[i], parseInt(maudd[i])]
	              ]); 
	              }


	   var options = {
	                  // legend: 'none',
	              		  is3D: true,
	                      title: 'Monthly Users'
	                                  };

	             var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                                   chart.draw(data,options);
	                                                             }	             
	   	     },status,
	          function(jqXHR, textStatus, errorThrown){
	              console.log('fail to Get Mau');
	              //alert('view Failure:'+errorThrown);
	          }
	                
	              );
  }
  
function maurep(){
	  
	  var sessionid = sessionStorage.getItem('userid');
	  var sesemail = sessionStorage.getItem('useremail');
      
	    

		 var userid = sessionid;
		 var from1 = $("#maujn1").val();
		 var to1 = $("#maurpt1").val();
		
		 
	 if(from1==""){
		 from1="01-14";
	 }
		 if(to1==""){
			 to1="11-25";
		 }
		 var report =JSON.stringify({
             userId : sessionid,
             reportType : "Maus",
            from : from1,
            to : to1,
            city: $("#maucty1").val(),
            state : $("#maurgn1").val(),
            country : $("#mauloc1").val(),
            zip : $("#mauzc1").val()
                 
            });
console.log(report);
		 var url= getAuthBaseUrl() + "mau/report/";
		 console.log(url);
			 APIPostJsonCall(url,report, function(data,textStatus){
		    	   console.log('successfully entered generated report');
		    	   alert("Report will be mailed to "+sesemail+" shortly");
		           
		               
		  },status,
		  function(jqXHR, textStatus, errorThrown){
	            console.log('fail to create');
	            
	            console.log(jqXHR.responseText);
	            var data = jqXHR.responseText;
	           alert("Report will be mailed to "+sesemail+" shortly");
	            
	          //window.location.href = getHost() + '/yapper/filedownload/' + data;
	            console.log('report Failure:'+errorThrown);
	          
	
		  }
	                
	              );
	  
	  
  }


  function daus()
	{	
	  
	  var popupd=window.open("popupdau.html", "_blank", "width=700,top=100, left=300 height=400");
	  popupd.focus; 	
	
}
  
  
  function dausub(){
	  var frmf = document.getElementById("daujn").value;
		var tto = document.getElementById("daurpt").value;
	  
	  if (frmf == null || frmf == "" && tto == null || tto == "") {
          alert("Please Fill From and To date");
          return false;
          
          
          
      }
    else
    	{
		var doc = window.opener.document,
		daujn1 = doc.getElementById("daujn1"),
		daurpt1 = doc.getElementById("daurpt1"),
		dauctype1 = doc.getElementById("dauctype1"),
		daucty1 = doc.getElementById("daucty1"),
		daurgn1 = doc.getElementById("daurgn1"),
		dauloc1 = doc.getElementById("dauloc1"),
		dauzc1 = doc.getElementById("dauzc1");
		
		daujn1.value = document.getElementById("daujn").value;
		daurpt1.value = document.getElementById("daurpt").value;
		dauctype1.value = document.getElementById("dauctype").value;
		daucty1.value = document.getElementById("daucty").value;
		daurgn1.value = document.getElementById("daurgn").value;
		dauloc1.value = document.getElementById("dauloc").value;
		dauzc1.value = document.getElementById("dauzc").value;
	window.close();
	window.onunload = function (e) {
	    opener.dausubi();
	}
	  }
  }
  var arraydau;
 function dausubi()
  
  {
	  var sessionid = sessionStorage.getItem('userid');
	  
	  var frrr=$("#daujn1").val();
	  console.log(frrr);
	  var frm;
	 frm=frrr.substr(3,2)+"-"+frrr.substr(0,2)+"-"+frrr.substr(8,10);
	 var trr=$("#daurpt1").val();
	 var to3;
	 to3=trr.substr(3,2)+"-"+trr.substr(0,2)+"-"+trr.substr(8,10);
	    

		 var userid = sessionid;
		 var from = frm;
		 var to = to3;
		 var  yapptype = $("#dauctype1").val();
		 var city= $("#daucty1").val();
		 var state = $("#daurgn1").val();
		 var country = $("#dauloc1").val();
		 var zip = $("#dauzc1").val();
		 if(from==""||from=="--"){
			 from="01-01-12";
		 }
			 if(to==""||to=="--"){
				 to="30-12-25";
			 }
		 
		 var DAUList="userid="+userid+"&from="+from+"&to="+to+"&yapptype="+yapptype+"&city="+city+"&state="+state+"&country="+country+"&zip="+zip;
			var url= getAuthBaseUrl() + "dau/get/?"+DAUList;
		//   alert(url);
		   APIGetJsonCall(url,{},function(data, textStatus){
	   	         console.log(data);
	   	      arraydau=data;
	  	    
	   	   console.log(arraydau);
		      	try{
		      		drawChart();
		      	}
		      	catch(e){
		      		
		      		alert("No new data for selected criteria");
		      	}
		   	     
		   	      function drawChart() {
		   	    	
		   	       var len=arraydau.daus.length;
		   	    console.log(arraydau);
	               var chttype= [];
	               var daudd= [];
		               for(var i=0;i<len;i++){
			                    var cli = arraydau.daus[i];
			                    chttype[i]=cli.date;//+ ":" + cli.chatType;
		                        daudd[i]=cli.daus;
		               }
		               
		               console.log(chttype);
		              chattype=JSON.stringify(chttype);
		              console.log(daudd[0]);
		              

		     var data = new google.visualization.DataTable();
	              data.addColumn('string', 'DAY');
	              data.addColumn('number', 'Users');
		            
		              for(var i=0;i<len;i++){
		              data.addRows([
		                [chttype[i], parseInt(daudd[i])]
		              ]); 
		              }
		            var options = {
		            	//	legend: 'none',
		            		title: 'Daily Users'//,
//		            		curveType: 'function',
		            	    
		            };

		            var chart = new google.visualization.LineChart(document.getElementById('chart_line'));

		            chart.draw(data, options);
		            }	             
		   	                            
	    	     },status,
	          function(jqXHR, textStatus, errorThrown){
	              console.log('fail to Get Dau');
	              //alert('view Failure:'+errorThrown);
	          }
	                
	              );
  }
  
 function daurep(){
	  
	  var sessionid = sessionStorage.getItem('userid');
	  var sesemail = sessionStorage.getItem('useremail');
      
	  var frrr=$("#daujn1").val();
	  console.log(frrr);
	  var frm;
	 frm=frrr.substr(3,2)+"-"+frrr.substr(0,2)+"-"+frrr.substr(8,10);
	 var trr=$("#daurpt1").val();
	 var to3;
	 to3=trr.substr(3,2)+"-"+trr.substr(0,2)+"-"+trr.substr(8,10);  

		 var userid = sessionid;
		 var from1 = frm;
		 var to1 = to3;
		
		 
	 if(from1==""||from1=="--"){
		 from1="01-01-14";
	 }
		 if(to1==""||to1=="--"){
			 to1="10-12-25";
		 }
		 var report =JSON.stringify({
            userId : sessionid,
            reportType : "Daus",
           from : from1,
           to : to1,
           city: $("#daucty1").val(),
           state : $("#daurgn1").val(),
           country : $("#dauloc1").val(),
           zip : $("#dauzc1").val()
                
           });
console.log(report);
		 var url= getAuthBaseUrl() + "dau/report/";
		 console.log(url);
			 APIPostJsonCall(url,report, function(data,textStatus){
		    	   console.log('successfully entered generated report');
		    	   alert("Report will be mailed to "+sesemail+" shortly");
		           
		               
		  },status,
		  function(jqXHR, textStatus, errorThrown){
	            console.log('fail to create');
	            
	            console.log(jqXHR.responseText);
	            var data = jqXHR.responseText;
	           alert("Report will be mailed to "+sesemail+" shortly");
	            
	          //window.location.href = getHost() + '/yapper/filedownload/' + data;
	            console.log('report Failure:'+errorThrown);
	          
	
		  }
	                
	              );
	  
	  
 }
  function chattyperr()
	{
		
		
		var pop=window.open('popupchattype.html','','height=400,top=100, left=300,width=700'); return true;
		pop.focus;
		
	}
  
  function upchat(){
	  var frmf = document.getElementById("ctjn").value;
		var tto = document.getElementById("ctrpt").value;
	  
	  if (frmf == null || frmf == "" && tto == null || tto == "") {
        alert("Please Fill From and To date");
        return false;
        
        
        
    }
  else
  	{
	  var doc = window.opener.document,
		ctjn1 = doc.getElementById("ctjn1"),
		ctrpt1 = doc.getElementById("ctrpt1"),
		ctctype1 = doc.getElementById("ctctype1"),
		ctcty1 = doc.getElementById("ctcty1"),
		ctrgn1 = doc.getElementById("ctrgn1"),
		ctloc1 = doc.getElementById("ctloc1"),
		ctzc1 = doc.getElementById("ctzc1");
		
		ctjn1.value = document.getElementById("ctjn").value;
		ctrpt1.value = document.getElementById("ctrpt").value;
		ctctype1.value = document.getElementById("ctctype").value;
		ctcty1.value = document.getElementById("ctcty").value;
		ctrgn1.value = document.getElementById("ctrgn").value;
		ctloc1.value = document.getElementById("ctloc").value;
		ctzc1.value = document.getElementById("ctzc").value;
	window.close();
window.onunload = function (e) {
	try{
		opener.chattcon();
  }
  catch(e)
  {
	  alert("No new data for selected criteria");
  }
    
}
  }
  }
var Chattype;
var arraydct;
function chattcon()
{
//$("#viewchattype").click(function(event){
	  var sessionid = sessionStorage.getItem('userid');
      
	   

	  
	  var frrr=$("#ctjn1").val();
	  console.log(frrr);
	  var frm;
	 frm=frrr.substr(3,2)+"-"+frrr.substr(0,2)+"-"+frrr.substr(8,10);
	 var trr=$("#ctrpt1").val();
	 var to3;
	 to3=trr.substr(3,2)+"-"+trr.substr(0,2)+"-"+trr.substr(8,10);
	 var userid = sessionid;
		 var from = frm;
		 var to = to3;
		 var  yapptype = $("#ctctype1").val();
		 var city= $("#ctcty1").val();
		 var state = $("#ctrgn1").val();
		 var country = $("#ctloc1").val();
		 var zip = $("#ctzc1").val();
		 if(from==""||from=="--"){
			 from="01-01-12";
		 }
			 if(to==""||to=="--"){
				 to="30-12-25";
			 }
		 
		 var YappsChatsList="userid="+userid+"&from="+from+"&to="+to+"&yapptype="+yapptype+"&city="+city+"&state="+state+"&country="+country+"&zip="+zip;
			var url= getAuthBaseUrl() + "yapps/chats/get/?"+YappsChatsList;
		//   alert(url);
		   APIGetJsonCall(url,{},function(data, textStatus){
	   	         console.log(data);
	   	      arraydct=data;
	  	    
	   	   console.log(arraydct);
		      drawChart();
		   	      function drawChart() {
		   	    	console.log("drawing");
		   	       var len=arraydct.yappsChats.length;
		   	    console.log(arraydct);
	               var ctchttype= [];
	               var perman= [];
	               var publ= [];
	               var event= [];
		               for(var i=0;i<len;i++){
			                    var cli = arraydct.yappsChats[i];
			                    console.log(i);
			                    ctchttype[i]=cli.chatType+ ":" + cli.date;
			                    if(cli.chatType=="PERMANENT")
			                    	{
			                    	perman[i]=cli.totalMessages;
			                    	}
			                    
			                    if(cli.chatType=="PUBLIC")
		                    	{
			                    	publ[i]=cli.totalMessages;
		                    	}
			                    
			                    if(cli.chatType=="EVENT")
		                    	{
			                    	event[i]=cli.totalMessages;
		                    	}
		               }
		               
		               //console.log();
		             
		              

		     var data = new google.visualization.DataTable();
	              data.addColumn('string', 'Type');
	              data.addColumn('number', 'Permanent');
	              data.addColumn('number', 'Public');
	              data.addColumn('number', 'Event');
	              
		              for(var i=0;i<len;i++){
		              data.addRows([
		                [ctchttype[i], parseInt(perman[i]),parseInt(publ[i]),parseInt(event[i])]
		              ]); 
		              }
		            var options = {
		            		//legend: 'none',
		            		//xaxis:'none',
		            		title: 'Chat Type'//,
//		            		curveType: 'function',
		            	    
		            };

		            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

		            chart.draw(data, options);
		            }	             
		   	                            
	    	     },status,
	          function(jqXHR, textStatus, errorThrown){
	              console.log('fail to Get Dau');
	              //alert('view Failure:'+errorThrown);
	          }
	                
	              );
}




function chttyprep()
{
	 
	
		var sessionid = sessionStorage.getItem('userid');
		  var sesemail = sessionStorage.getItem('useremail');
	     
	      

		  var frrr=$("#ctjn1").val();
		  console.log(frrr);
		  var frm;
		 frm=frrr.substr(3,2)+"-"+frrr.substr(0,2)+"-"+frrr.substr(8,10);
		 var trr=$("#ctrpt1").val();
		 var to3;
		 to3=trr.substr(3,2)+"-"+trr.substr(0,2)+"-"+trr.substr(8,10);
		 

			 var userid = sessionid;
			 var from1 = frm;
			 var to1 = to3;

		if(from1==""||from1=="--"){
			 from1="01-10-13";
		 }
			 if(to1==""||to1=="--"){
				 to1="01-12-25";
			 }

			 
			 
var report =JSON.stringify({
         userId : sessionid,
         reportType : "YAPPS_CHATS",
        from : from1,
        to : to1,
        yappType:$("#ctctype1").val(),
        city: $("#ctcty1").val(),
        state : $("#ctrgn1").val(),
        country:$("#ctloc1").val(),
        zip:$("#ctzc1").val()
        });
		 
console.log(report);
		 var url= getAuthBaseUrl() + "yapps/chats/report/";
		 console.log(url);
			 APIPostJsonCall(url,report, function(data,textStatus){
		    	   console.log('successfully entered generated report');
		    	  alert("Report will be mailed to "+sesemail+" shortly");
		           
		               
		  },status,
		  function(jqXHR, textStatus, errorThrown){
	            console.log('fail to create');
	            
	            console.log(jqXHR.responseText);
	            var data = jqXHR.responseText;
	           alert("Report will be mailed to "+sesemail+" shortly");
	            
	       //window.location.href = getHost() + '/yapper/filedownload/' + data;
	            console.log('report Failure:'+errorThrown);
	          
	
		  }
	                
	              );
	  }

function cchar()
{
console.log(Chattype);

	var preml=0;
	var EVE=0;
	var PUB=0;

		         
		var url= getAuthBaseUrl() + "yapp/admin/getAll/?"+Chattype;
		     console.log(url);
		     APIGetJsonCall(url,{},function(data, textStatus){
		   	         console.log(data);
		   	         var len=data.yapps.length;
		   	         var l1= data.length;
		             if(data=={})len=0;       
		             if (len==undefined)len=0;
		                    var cli = data.yapps;
		                console.log(len);
		                console.log(l1);
		               console.log(preml);
		               for(var i=0;i<len;i++){
		            	   var cli = data.yapps[i];
		            	   //console.log(cli.type);
		            	   if(cli.type=="PERMANENT")
		            	   {
		            		
		            		preml++;
		            	   }
		            	   if(cli.type=="EVENT")
		            	   {
		            		
		            		EVE++;
		            	   }
		            	   if(cli.type=="PUBLIC")
		            	   {
		            		
		            		PUB++;
		            	   }
		            	   
		               }
		               console.log(preml);  
		               console.log(PUB);
		               console.log(EVE);
		              
		               //window.close(); 

		             
		                    
		    	     },status,
		          function(jqXHR, textStatus, errorThrown){
		              console.log('fail to insert');
		              //alert('view Failure:'+errorThrown);
		          }
		                
		              );
		    
		    
	
		     try{
		      		drawChart();
		      	}
		      	catch(e){
		      		
		      		alert("No new data for selected criteria");
		      	}
    //google.load("visualization", "1", {packages:["corechart"]});
    //google.setOnLoadCallback(drawChart);
	 function drawChart() {
		 console.log("Updating Chat Type");
	   var data = google.visualization.arrayToDataTable([
	     ['Chat Type', 'PERMANENT', 'PUBLIC','EVENT'],
	     ['Chat type',  preml,      PUB,  EVE],
	     
	   ]);

	   var options = {
	     title: 'Chat Type',
	     hAxis: {title: '', titleTextStyle: {color: 'red'}}
	   };

	   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

	   chart.draw(data, options);

	 }
	 }


function pie()
{

    google.setOnLoadCallback(drawChart);
    function drawChart() {
    	var n1="01/01/14" ;
var numb=11;
      var data = google.visualization.arrayToDataTable([
        ['Region', 'Users this Month'],
        [n1,     numb],
        ['Mid-Atlantic',      2],
        ['North-East',  2],
       ['West', 2],
        ['Mountain',    7]
      ]);

      var options = {
          //legend: 'none'
    		  is3D: true,
        title: 'Monthly Users'
      };

     var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data,options);
    }
    }

function linec()
{
	google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
   //var person = {"firstName":22, "lastName":22, "age":46};
    var person = {firstName:11, lastName:"Doe", age:46};
    console.log(person[0]);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['DAY', 'USERS'],
        ['10/20',  person["firstName"]],
        ['10/19',  1170],
         ['10/18',  660],
        ['10/17',  1030]
      ]);

      var options = {
        title: 'Daily Users'
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_line'));

      chart.draw(data, options);
    }}

