/**
 * Created by Administrator on 2017/5/11 0011.
 */
/**
 * Created by Administrator on 2017/5/11 0011.
 */
/**
 * Created by Taoz on 4/15/2015.
 */

var $ROOTPATH$ = '';

var whiteBackground = {
  'backgroundColor': '#ffffff',
  'borderStyle': 'none'
};


function findElementByName(name, options) {
  var target;
  for( var i in options) {
    var op = options[i];
    if( name == op.name){
      target = op.element;
      break;
    }
  }
  return target
}

function ajaxSimpleGet(url, successFunc) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      var errCode = data.errCode;
      var msg = data.msg;
      if (errCode != 0) {
        console.log('errCode=' + errCode + ', msg=' + msg);
        alert('错误: ' + msg);
      } else {
        successFunc(data)
      }
    }.bind(this),
    error: function (xhr, status, err) {
      console.log("error");
      console.error(this.props.url, xhr, status, err.toString());
    }.bind(this)
  });
}

function ajaxSimplePost(url, postData, successFunc) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'POST',
    data: postData,
    success: function (data) {
      var errCode = data.errCode;
      var msg = data.msg;
      if (errCode != 0) {
        console.log('errCode=' + errCode + ', msg=' + msg);
        alert('错误: ' + msg);
      } else {
        successFunc(data)
      }
    }.bind(this),
    error: function (xhr, status, err) {
      console.log("error");
      console.error(this.props.url, xhr, status, err.toString());
      alert('Error:' + err);
    }.bind(this)
  });
}


function ajaxJsonPost(url, postData, successFunc) {

  var sendData = JSON.stringify(postData);
  console.log("ajaxJsonPost: postData=" + postData);
  console.log("ajaxJsonPost: sendData=" + sendData);
  $.ajax({
    url: url,
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    data: sendData,
    success: function (data) {
      var errCode = data.errCode;
      var msg = data.msg;
      if (errCode != 0) {
        console.log('errCode=' + errCode + ', msg=' + msg);
      } else {
        successFunc(data);
      }
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(url, xhr, status, err.toString());
    }.bind(this)
  });
}


function ajaxJsonPostWithError(url, postData, successFunc) {

  var sendData = JSON.stringify(postData);
  console.log("ajaxJsonPost: postData=" + postData);
  console.log("ajaxJsonPost: sendData=" + sendData);
  $.ajax({
    url: url,
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    data: sendData,
    success: function (data) {
      successFunc(data);
    }.bind(this),
    error: function (xhr, status, err) {
      var Num="";
      for(var i=0;i<6;i++)
      {
        Num+=Math.floor(Math.random()*10);
      }
      console.log(xhr,status,err.toString());
      window.closeWebview(window.osType);
    }.bind(this)
  });
}
function ajaxGetWithoutAlert(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'GET',
    success:function(res){
      if(res.errCode == 0) successFunc(res);
      else errorFunc(res)

    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}

function ajaxJsonPostWithoutAlert(url, postData, successFunc,errorFunc) {

  var sendData = JSON.stringify(postData);
  console.log("ajaxJsonPost: postData=" + postData);
  console.log("ajaxJsonPost: sendData=" + sendData);
  $.ajax({
    url: url,
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    data: sendData,
    success: function (res) {
      if(res.errCode == 0) successFunc(res);
      else errorFunc(res)
    }.bind(this),
    error: function (xhr, status, err) {
      errorFunc(err)
    }.bind(this)
  });
}
function ajaxGet(url,successFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'GET',
    success:function(res){
      if(res.errCode == 0) successFunc(res);
      else {
        // alert("errCode: " + res.errCode + ", msg: " + res.msg);
        // alert("登陆已超时，请重新登陆");
        window.closeWebview(window.osType);
        console.log("errCode: " + res.errCode + ", msg: " + res.msg);

      }
    }.bind(this),
    error:function(xhr,status,err){
      var Num="";
      for(var i=0;i<6;i++)
      {
        Num+=Math.floor(Math.random()*10);
      }
      console.log(xhr,status,err.toString());
      window.closeWebview(window.osType);
    }.bind(this)
  })
}

//门限登录过期问题
function ajaxGetBless(url,successFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'GET',
    success:function(res){
      if(res.errCode == 0) successFunc(res);
      else {
        // alert("errCode: " + res.errCode + ", msg: " + res.msg);
        // alert("登陆已超时，请重新登陆");
        window.closeWebview(window.osType);
        console.log("errCode: " + res.errCode + ", msg: " + res.msg);

      }
      successFunc(res);
    }.bind(this),
    error:function(xhr,status,err){
      var Num="";
      for(var i=0;i<6;i++)
      {
        Num+=Math.floor(Math.random()*10);
      }
      console.log(xhr,status,err.toString());
      window.closeWebview(window.osType);
    }.bind(this)
  })
}

function ajaxGetWithError(url,successFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'GET',
    success:function(res){
      successFunc(res);

    }.bind(this),
    error:function(xhr,status,err){
      var Num="";
      for(var i=0;i<6;i++)
      {
        Num+=Math.floor(Math.random()*10);
      }
      console.log(xhr,status,err.toString());
      window.closeWebview(window.osType);
    }.bind(this)
  })
}
//亲情号码库接口
function ajaxGetFamilyNumber(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'GET',
    success:function(res){
      successFunc(res);
    }.bind(this),
    error: function (xhr, status, err) {
      errorFunc(err)
    }.bind(this)
  })
}
//亲情号码库替换接口
function ajaxFamilyReplace (url,data,successFunc,errorFunc){
  var dataJson = JSON.stringify(data);
  $.ajax({
    url:url,
    dataType:'json',
    contentType: 'application/json',
    type:'POST',
    data:dataJson,
    success:function(res){
      successFunc(res)
    }.bind(this),
    error:function(xhr, status, err){
      errorFunc(err)
    }.bind(this)
  })
}

//亲情号码库添加接口
function ajaxAddFamily(url,data,successFunc,errorFunc){
  var dataJson = JSON.stringify(data);
  $.ajax({
    url:url,
    dataType:'json',
    contentType: 'application/json',
    type:'POST',
    data:dataJson,
    success:function(res){
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}
//获取亲情号码库列表
function ajaxGetFamilyList(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'get',
    success: function (res) {
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}

//流量签约包状态获取接口
function ajaxGetSignStatus(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'get',
    success: function (res) {
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}

//流量签约包详情接口
function ajaxGetOrderHistory(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'get',
    success: function (res) {
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}

//查询是否已经进行过身份验证
function ajaxQuerySignStatus(url,successFunc,errorFunc){
  $.ajax({
    url:url,
    dataType:'json',
    type:'get',
    success: function (res) {
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}
//流量签约包确认接口
function ajaxSignConform(url,data,successFunc,errorFunc){
  var dataJson = JSON.stringify(data);
  $.ajax({
    url:url,
    dataType:'json',
    contentType: 'application/json',
    type:'POST',
    data:dataJson,
    success:function(res){
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}

//post请求统一入口
function ajaxPost(url,data,successFunc,errorFunc){
  var dataJson = JSON.stringify(data);
  $.ajax({
    url:url,
    dataType:'json',
    contentType: 'application/json',
    type:'POST',
    data:dataJson,
    success:function(res){
      successFunc(res)
    }.bind(this),
    error:function(xhr,status,err){
      errorFunc(err)
    }.bind(this)
  })
}



