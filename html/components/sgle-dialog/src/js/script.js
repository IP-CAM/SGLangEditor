$(document).ready(function(){
   //=require sgle-input\src\js\main.js
   //=require sgle-textarea\src\js\main.js
   //=require main.js
  
   var dialog = new SgleDialog();
   var data = [
      "File name",
      "Key",
      "English text",
      "Ukraine text"
   ];
   dialog.setData(data);
   dialog.showDialog();
});