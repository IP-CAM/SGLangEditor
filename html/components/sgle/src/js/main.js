/*------------------------------------ */
Sgle.TABLE = ".sgle-table";

function Sgle(){
   var self = this;
   var m_table = new SgleTable(Sgle.TABLE);

   function __constructor(){
      m_table.onRowClick(self.editTranslation);
   }

   self.editTranslation = function(translation){
      var editDialog = new SgleDialog();
      editDialog.setData(translation.getFields());
      editDialog.showDialog();
   }

   __constructor();
}
/*------------------------------------ */