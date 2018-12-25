/*-------------------------------------------------*/
function SgleActionsManager(){
   var self = this;
   var m_actions = {};

   self.addAction = function(name, callback){
      if (name && callback && typeof callback == "function"){
         
         if (!(name in m_actions)){
            m_actions[name] = new Array();
         }

         m_actions[name].push(callback);
      }
   }

   self.runActions = function(name, params){
      if (name && (name in m_actions)){
         for (let i = 0; i < m_actions[name].length; ++i){
            m_actions[name][i](params);
         }
      }
   }
}
/*-------------------------------------------------*/
SgleTableRow.ROW_CLASS_NAME = "sgle-table__row";
SgleTableRow.ROWS_SELECTOR  = ".sgle-table__row";
SgleTableRow.STYLE_GREY     = "sgle-table__row_dark";

function SgleTableRow(){
   var self = this;
   var $m_row = $(document.createElement("tr"));
   var m_actions = new SgleActionsManager();

   function __constructor(){
      $m_row.addClass(SgleTableRow.ROW_CLASS_NAME);

      $m_row.click(function(){
         m_actions.runActions("onRowClick", self)
      });
   }

   self.addField = function(value){
      var td = document.createElement("td");
      td.innerText = value;
      $m_row.append(td);
   }

   self.setFields = function(fields){
      if (fields){
         for (let i = 0; i < fields.length; ++i){
            self.addField(fields[i]);
         }
      }
   }

   self.addStyle = function(style){
      $m_row.addClass(style);
   }

   self.getRow = function(){
      return $m_row;
   }

   self.onRowClick = function(callback){
      m_actions.addAction("onRowClick", callback);
   }
   
   self.getFields = function(){
      let tds = $m_row.find("td");
      let fields = [];

      for (let i = 0; i < tds.length; ++i){
         fields.push(tds[i].innerText);
      }

      return fields;
   }
   
   __constructor();
}
/*-------------------------------------------------*/
SgleTable.BODY_SELECTOR = ".sgle-table__body";

function SgleTable(table){
   var self = this;
   var m_rows = [];
   var m_table = $(table);
   var m_actions = new SgleActionsManager();
   
   function rowClick(row){
      m_actions.runActions("onRowClick", row);
   }
   
   function __constructor(){
      var rows = [
         ["Dynamic 1", "Dynamic 1", "Dynamic 1", "Dynamic 1"],
         ["Dynamic 2", "Dynamic 2", "Dynamic 2", "Dynamic 2"],
         ["Dynamic 3", "Dynamic 3", "Dynamic 3", "Dynamic 3"],
         ["Dynamic 4", "Dynamic 4", "Dynamic 4", "Dynamic 4"],
         ["Dynamic 5", "Dynamic 5", "Dynamic 5", "Dynamic 5"]
      ]

      for (let i = 0; i < rows.length; ++i){
         let row = new SgleTableRow();
         row.setFields(rows[i]);
         self.addRow(row);
      }
   }

   self.onRowClick = function(callback){
      m_actions.addAction("onRowClick", callback);
   }

   self.addRow = function(row){

      if (m_rows.length % 2){
         row.addStyle(SgleTableRow.STYLE_GREY);
      }

      m_rows.push(row);
      row.onRowClick(rowClick);
      m_table.find(SgleTable.BODY_SELECTOR).append(row.getRow());
   }

   __constructor();
}
/*-------------------------------------------------*/