$(document).ready(function(){
   //=require main.js
   
   var table = new SgleTable(".sgle-table");
   table.onRowClick(function(row){
      var new_row = new SgleTableRow();
      new_row.setFields(row.getFields());
      table.addRow(new_row);
   });
});