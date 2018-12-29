SgleDialog.DIALOG_SELECTOR    = ".sgle-dialog";
SgleDialog.BUTTON_CLOSE       = ".sgle-dialog-header__close";
SgleDialog.BUTTON_CANCEL      = ".sgle-dialog__cancel";
SgleDialog.BUTTON_SAVE        = ".sgle-dialog__save";
SgleDialog.INPUT_FILE         = ".sgle-dialog__file";
SgleDialog.INPUT_KEY          = ".sgle-dialog__key";
SgleDialog.TEXTAREA_LANG_FROM = ".sgle-dialog__lang-from";
SgleDialog.TEXTAREA_LANG_TO   = ".sgle-dialog__lang-to";

function SgleDialog(){
   var self = this;
   var $m_dialog = $(SgleDialog.DIALOG_SELECTOR);
   var m_InputFile = new SgleInput($m_dialog.find(SgleDialog.INPUT_FILE));
   var m_InputKey  = new SgleInput($m_dialog.find(SgleDialog.INPUT_KEY));
   var m_TextareaLangFrom = new SgleTextarea($m_dialog.find(SgleDialog.TEXTAREA_LANG_FROM));
   var m_TextareaLangTo = new SgleTextarea($m_dialog.find(SgleDialog.TEXTAREA_LANG_TO));

   function __constructor(){
      $m_dialog.find(SgleDialog.BUTTON_CLOSE).click(self.closeDialog);
      $m_dialog.find(SgleDialog.BUTTON_CANCEL).click(self.closeDialog);
      $m_dialog.find(SgleDialog.BUTTON_SAVE).click(self.saveData);
   }

   self.saveData = function(){

   }
   
   self.setData = function(data){
      m_InputFile.setValue(data[0]);
      m_InputKey.setValue(data[1]);
      m_TextareaLangFrom.setValue(data[2]);
      m_TextareaLangTo.setValue(data[3]);
   }

   self.closeDialog = function(){
      $m_dialog.hide();
   }

   self.showDialog = function(){
      $m_dialog.show();
   }

   __constructor();
}