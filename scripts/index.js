window.onload=function(){
  var date=new Date();
  //ajax
  var ajax=function(o){
    var req=new XMLHttpRequest();
    req.open('get',o.url);
    req.send();
    req.onreadystatechange=function(){
      if(this.readyState==this.DONE&&this.status==200){
        o.onsuccess(this.response);
      }
    };
  };
 
 var date2string=function(){
  return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
 }
 document.onmousedown=function(e){
  e.preventDefault();
 };

 //当天图片
 var dangtianpic=function(){
    ajax({
      url:'http://localhost:3000/tupian?time='+date2string(),
      onsuccess:function(data){
        dingwei_p.innerHTML='';
          if(data!=='none'){
            data=JSON.parse(data);
            console.log(data);
            for(var i=0;i<data.length;i++){
              var el=document.createElement('img');
              el.setAttribute('class','tupian');
              el.setAttribute('data',i);
              el.src='pics/'+data[i];
              dingwei_p.appendChild(el);
            }
          }

          dingwei_p.onclick=function(e){
            fangda.innerHTML='<div class="guanbi" id="guanbi"></div>';
            if(e.target.getAttribute('class')=='tupian'){
              fangda.style.display='block';
              var mm=e.target.getAttribute('src');
              console.log(mm);
              var el=document.createElement('img');
              el.setAttribute('src',mm)
              el.setAttribute('class','t_center');
              fangda.appendChild(el);
              guanbi.onclick=function(){
                fangda.style.display='none';
              };
            }
          }

      }
    });

 }


// var tu_shuzu;
// var suoyoupic=function(){
//   ajax({
//     url:'http://localhost:3000/riqi',
//     onsuccess:function(data){
//        data=JSON.parse(data);
//        console.log(data);
//        var tu_shuzu=[];
//        for(var riqi in data){
//         tu_shuzu.push(riqi.split('-'));
//        }
//        // console.log(tu_shuzu);
//     }
//   });
// };
// suoyoupic();


  	var $=function(e){
  		return document.getElementById(e);
  	};
    var ZHENG=24*60*60*1000;
    var xiao=document.getElementsByClassName('xiao');
    // qian
    //dang 
    // xia
    // var CURR;
    //红线的位置
    var shijianxianchange=function(){
      var date=new Date();
      hongxian.style.top=(date.getHours()*60+date.getMinutes())/(24*60)*1009+40+'px';
      if(date.getHours()<12){
        if(date.getMinutes()<10){ shuzih.innerHTML='上午'+date.getHours()+':'+'0'+date.getMinutes();}
        else{shuzih.innerHTML='上午'+date.getHours()+':'+date.getMinutes();}
      }
      else if(date.getHours()==12){
        if(date.getMinutes()<10){ shuzih.innerHTML='中午'+date.getHours()+':'+'0'+date.getMinutes();}
        else{shuzih.innerHTML='中午'+date.getHours()+':'+date.getMinutes();}

      }else{
        if(date.getMinutes()<10){ shuzih.innerHTML='下午'+date.getHours()+':'+'0'+date.getMinutes();}
        else{shuzih.innerHTML='下午'+(date.getHours()-12)+':'+date.getMinutes();}

      }
    };
    shijianxianchange();

    setInterval(shijianxianchange,500);
    //横线周围文字的样式
    var shuzi=document.getElementsByClassName('shuzi');
    for(var i=0;i<shuzi.length;i++){
      if(date.getHours()<12&&shuzi[i].getAttribute('class').indexOf('xw')==-1){
        if(date.getHours()==Number(shuzi[i].innerHTML)&&date.getMinutes()<=30){
          shuzi[i].innerHTML='';

        }
        
      }
      else if(date.getHours()==12&&shuzi[i].innerHTML=='中午'){
          shuzi[i].innerHTML='';
      }
      else if(date.getHours()>12&&shuzi[i].getAttribute('class').indexOf('xw')!==-1){
         if(date.getHours()-12==Number(shuzi[i].innerHTML)){
          shuzi[i].innerHTML='';

        }
      }
     
    }
 

    var jintian_d=date.getDate();  
    var jintian_m=date.getMonth();  
    var jintian_y=date.getFullYear(); 
    var jintian_w=date.getDay();

    var L;
    var nowdate=new Date(Date.now());
    var isrunnian=function(year){
      if(year%4==0&&year%100!=0||year%400==0){
        return true;
      }else{
        return false;
      }
    };



    //onmousedown
    //每月天数
    var meiyuetianshu=[31,28,31,30,31,30,31,31,30,31,30,31];
    var shangyige;
    // 
    var addClass=function(el,s){
        var tmp=el.getAttribute('class').split(' ');
        var dict={};
        for(var i=0;i<tmp.length;i++){
          dict[tmp[i]]=true;
        }
        if(!dict[s]){
          el.setAttribute('class',el.getAttribute('class')+' '+s);
        }
    };
   var removeClass=function(el,s){
      var tmp=el.getAttribute('class').split(' ');
        var dict={};
        for(var i=0;i<tmp.length;i++){
          dict[tmp[i]]=true;
        }
        delete dict[s];
        var ns='';
        for(var name in dict){
          ns+=' '+name;
        }
        el.setAttribute('class',ns);
    };
    //画日历
    var huarili=function(){

      var i=0;
      var tmp=date.getDate();
      date.setDate(1);//今天   变成 1号 这个月的第一天是星期几

      var xingqi=date.getDay();
      date.setDate(tmp);
      L=xingqi==0?6:xingqi-1;
      for(var k=0;k<xiao.length;k++){

         removeClass(xiao[k],'fense');
          removeClass(xiao[k],'jintian_');
      }
      
      if(date.getMonth()-1==1&&isrunnian(date.getFullYear())){
          meiyuetianshu[1]=29;
      }
      else if(date.getMonth()-1==1&&!isrunnian(date.getFullYear())){
         meiyuetianshu[1]=28;
      }

      if(date.getMonth()-1==-1){
        var shangyuetianshu=31;
      }
      
      else{
       
        var shangyuetianshu=meiyuetianshu[date.getMonth()-1];//上月天数
        
        
      }
      //前一月
      for(;i<L;i++){
       //26 27 28 29 30 31
        xiao[i].innerHTML=shangyuetianshu-(L-i-1);
       
        xiao[i].removeAttribute('id');
        xiao[i].setAttribute('pr',true);
        xiao[i].style.color='#ccc';

      }
      //当月
     
      for(;i<meiyuetianshu[date.getMonth()]+L;i++){
        
        xiao[i].innerHTML=i-L+1;
        xiao[i].setAttribute('id','d'+(i-L+1));
         
        if(jintian_y==date.getFullYear()&&jintian_m==date.getMonth()&&xiao[i].innerHTML==jintian_d){

            xiao[i].style.color='red';
            addClass(xiao[i],'fense');
        }else{
            xiao[i].style.color='black';
        }
          


        xiao[i].removeAttribute('pr');
        xiao[i].removeAttribute('nx');
        if(jintian_y==date.getFullYear()&&jintian_d==tmp&&jintian_m==date.getMonth()&&xiao[i].innerHTML==tmp){
          addClass(xiao[i],'hong');
          xiao[i].style.color='white';
        }
          

      }
      

      // 下一月
      var D=i;
      for(;i<xiao.length;i++){

        xiao[i].innerHTML=i-D+1;
        xiao[i].removeAttribute('id');
        xiao[i].style.color='#ccc';

        xiao[i].setAttribute('nx',true);
      }
    };
    huarili();
   
    //数据结构

    var prevDay=function(){
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
     
      targetdate=currentdate-1;
      if(targetdate==0){
        targetyear=currentyear;
        targetmonth=currentmonth-1;
        if(targetmonth==-1){
          targetyear=currentyear-1;
          targetmonth=11;
        }
        if(targetmonth==1){
          if(isrunnian(targetyear)){
            meiyuetianshu[1]=29;
          }
          else{
            meiyuetianshu[1]=28;
          }
        }
        targetdate=meiyuetianshu[targetmonth];

      }else{
         targetmonth=currentmonth;
          targetyear=currentyear;
      }
     
     
      date=new Date(targetyear,targetmonth,targetdate);
      
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());

    };


    var nextDay=function(){
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
      if(currentmonth+1==1&&isrunnian(currentyear)){
        meiyuetianshu[1]=29;
      }
      if(currentmonth+1==1&&!isrunnian(currentyear)){
        meiyuetianshu[1]=28;
      }
  
      targetdate=currentdate+1;
      
      if(meiyuetianshu[currentmonth]<targetdate){
        targetyear=currentyear;
        targetmonth=currentmonth+1;
       
        if(targetmonth==12){
          targetyear=currentyear+1;
          targetmonth=0;

        }
        targetdate=1;
      }else{
        targetmonth=currentmonth;
         targetyear=currentyear;

      }
       
     
      date=new Date(targetyear,targetmonth,targetdate);
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
    };
    var nowC;
    var week=['日','一','二','三','四','五','六'];
    var ondatechange=function(){  
      if(shangyige){ 
        removeClass(shangyige,'hui');
      }
      var xx=date.getDate();
      var el=document.getElementById('d'+xx);
      addClass(el,'hui');

      if(jintian_d==xx&&jintian_m==(date.getMonth())&&jintian_y==date.getFullYear()){
        el.style.color='red';

        removeClass(el,'hui');
        if(jintian_w==6||jintian_w==0){

          a_ri.style.background='#F7F7F7';
           addClass(el,'jintian_1');

        }else{
            addClass(el,'jintian_');
        }
         
        
        addClass(el,'hong');

        el.style.color='white';
        hongxian.style.display='block';
      }else{
        removeClass(el,'hong');
   
      }
     
      shangyige=el;


      today.innerHTML=date.getDate();
      var ss=date.getFullYear()+' 年 '+(date.getMonth()+1)+' 月 '+date.getDate()+' 日'+' 星期'+week[date.getDay()];
      detail.innerHTML=ss;
      ye_mo_d.innerHTML=ss.slice(0,-3);
      y_www.innerHTML=ss.slice(-3);


      dangtianpic();
    };
    ondatechange();

    for(var i=0;i<xiao.length;i++){

      xiao[i].onclick=function(){
        for(var j=0;j<xiao.length;j++){
          if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
             removeClass(xiao[j],'hong');
             xiao[j].style.color='red';
          } 
        }

        hongxian.style.display='none';
        if(this.getAttribute('class').indexOf('xiu')!=-1){
          a_ri.style.background='#f7f7f7';
        }else{     
            a_ri.style.background='white';
           
        }

        this.onmousedown=function(e){
          e.preventDefault();
        };
        // console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
        var a=date.getFullYear();
        var b=date.getMonth();
        var c=date.getDate();
        var x,y,z;
        if(this.hasAttribute('id')){
          date.setDate(this.innerHTML);
          ondatechange();     
        }
        else if(this.hasAttribute('pr')){
          z=this.innerHTML;
          y=b-1;
          x=a;
          date=new Date(x,y,z);
          huarili();
           ondatechange();
        }
        else if(this.hasAttribute('nx')){

          z=this.innerHTML;
          
          y=b+1;
          x=a;

          date=new Date(x,y,z);
            // 根据abc得到逻辑正确的xyz
          huarili();
             
          ondatechange();
        }

          
        
      };
    }
    
    le_but.onclick=function(){
      
       if(date.getDay()==6||date.getDay()==0){
        a_ri.style.background='#f7f7f7';
      }else{
         a_ri.style.background='white';
      }

      for(var j=0;j<xiao.length;j++){
          if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
             removeClass(xiao[j],'hong');
             xiao[j].style.color='red';
          }     
      }

      hongxian.style.display='none';
      if(this.getAttribute('class').indexOf('xiu')!=-1){
        a_ri.style.background='#f7f7f7';
      }else{
        a_ri.style.background='white';
           
      }
      prevDay();
      huarili();
      ondatechange();
    };
    le_but.onmousedown=function(e){
      e.preventDefault();
    };
    ri_but.onmousedown=function(e){
      e.preventDefault();
    };
    ri_but.onclick=function(){
    
       if(date.getDay()==6||date.getDay()==0){
        a_ri.style.background='#f7f7f7';
      }else{
         a_ri.style.background='white';
      }
       for(var j=0;j<xiao.length;j++){
            if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
               removeClass(xiao[j],'hong');
               xiao[j].style.color='red';

            }
          
           
          }
        hongxian.style.display='none';
        if(this.getAttribute('class').indexOf('xiu')!=-1){
          a_ri.style.background='#f7f7f7';
        }else{
            a_ri.style.background='white';           
        }
          nextDay();
       huarili();
      ondatechange();
    };
    //前往今天
    qianw.onclick=function(){
      date=new  Date();
      huarili();
      ondatechange();
    };
 

//红心大战

};//最后