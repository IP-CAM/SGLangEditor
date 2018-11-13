<?php
/**
 * @brief This is settings controller for SG Language Editor module.
 * This controller is responsible for module install/remove and enable/desable.
 * @author Sergey Gadzhilov
 * @email  gadzhilov.sergey@gmail.com
 */
class ControllerExtensionModuleSgLangEditor extends Controller
{
   private $MODULE_PATH      = 'extension/module/sg_lang_editor';
   private $ERROR_PERMISSION = 'error_permission';
   private $OPTION_STATUS    = 'module_sg_lang_editor_status';
   private $ACTION_UPDATE    = 'extension/module/sg_lang_editor/update';

   /**
    * @brief This member contains errors codes.
    */
   private $m_error = null;

   /**
    * @brief This member contains prepared data.
    */
   private $m_data = array();

   /**
    * @brief This is main function for the controller.
    */
   public function index()
   {
      $this->load->language($this->MODULE_PATH);
      $this->document->setTitle($this->language->get('heading_title'));

      $this->setBreadcrumbs();
      $this->setCommonData();
      $this->checkErrors();
      
      $this->m_data['cancel'] = $this->getLink('marketplace/extension', 'type=module');
      $this->m_data['action'] = $this->getLink($this->ACTION_UPDATE);
      $this->m_data['module_status'] = $this->OPTION_STATUS;
      $this->m_data['module_status_enabled'] = $this->config->get($this->OPTION_STATUS);

      $this->response->setOutput($this->load->view($this->MODULE_PATH, $this->m_data));
   }

   /**
    * @brief This method checks if error is set and decodes it.
    */
   private function checkErrors()
   {
      if ($this->m_error != null)
      {
         $this->m_data['error'] = $this->language->get($this->m_error);
      }
   }

   /**
    * @brief This method is called when user saves options.
    */
   public function update()
   {
      if ($this->user->hasPermission('modify', $this->MODULE_PATH) &&
          isset($this->request->post[$this->OPTION_STATUS]))
      {
         if ($this->request->post[$this->OPTION_STATUS] != $this->config->get($this->OPTION_STATUS))
         {
            $this->load->language($this->MODULE_PATH);
            $this->load->model('setting/setting');
            $this->model_setting_setting->editSetting($this->MODULE_NAME, $this->request->post);
            $this->session->data['success'] = $this->language->get('text_success');
         }
         $this->response->redirect($this->getLink('marketplace/extension', 'type=module'));
      }
      else
      {
         $this->m_error = $this->ERROR_PERMISSION;
         $this->index();
      }
   }

   /**
    * @brief This method generates link by specifiyed path
    * @param path for link.
    * @param additional parameters.
    */
   private function getLink($path, $param = null)
   {
      $params = 'user_token=' . $this->session->data['user_token'];

      if ($param != null)
      {
         $params .= '&'.$param;
      }

      return $this->url->link($path, $params, true);
   }

   /**
    * @brief This method fills member m_data with common information for admin.
    */
   private function setCommonData()
   {
      $this->m_data['header']      = $this->load->controller('common/header');
      $this->m_data['footer']      = $this->load->controller('common/footer');
      $this->m_data['column_left'] = $this->load->controller('common/column_left');
   }

   /**
    * @brief This method fills member m_data with breadcrumbs.
    */
   private function setBreadcrumbs()
   {
      $breadcrumbs = array(
         'text_home'      => 'common/dashboard',
         'text_extension' => 'marketplace/extension',
         'heading_title'  => $this->MODULE_PATH
      );

      $this->m_data['breadcrumbs'] = array();
      foreach($breadcrumbs as $text => $href)
      {
         $this->m_data['breadcrumbs'][] = array(
            'text' => $this->language->get($text),
            'href' => $this->getLink($href)
         );
      }
   }
}
?>
