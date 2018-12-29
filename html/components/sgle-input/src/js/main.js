SgleInput.LABEL_CLASS   = ".sgle-input__label";
SgleInput.INPUT_CLASS   = ".sgle-input__input";

function SgleInput($control){
   var self = this;
   var $m_control = $control;

   self.setLabel = function(label){
      $m_control.find(SgleInput.LABEL_CLASS).text(label);
   }

   self.setValue = function(value){
      $m_control.find(SgleInput.INPUT_CLASS).val(value);
   }
}