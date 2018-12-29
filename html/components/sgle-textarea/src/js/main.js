SgleTextarea.LABEL = ".sgle-textarea__label";
SgleTextarea.INPUT = ".sgle-textarea__input";

function SgleTextarea($control){
   var self = this;
   var $m_control = $control;
   
   self.setLabel = function(label){
      $m_control.find(SgleTextarea.LABEL).text(label);
   }
   
   self.setValue = function(value){
      $m_control.find(SgleTextarea.INPUT).val(value);
   }
}