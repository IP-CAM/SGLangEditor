SgleDialog.DIALOG_SELECTOR = ".sgle-dialog";
SgleDialog.CLOSE_BUTTON    = ".sgle-dialog-header__close";

function SgleDialog(){
   var self = this;
   var $m_dialog = $(SgleDialog.DIALOG_SELECTOR);

   function __constructor(){
      $m_dialog.find(SgleDialog.CLOSE_BUTTON).click(self.closeDialog);
   }

   self.closeDialog = function(){
      $m_dialog.hide();
   }

   __constructor();
}