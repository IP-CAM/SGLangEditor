<?php
/**
 * @brief This is settings controller for SG Language Editor module.
 * This controller is responsible for module install/remove and enable/desable.
 * @author Sergey Gadzhilov
 * @email  gadzhilov.sergey@gmail.com
 */
class ControllerExtensionModuleSgLangEditor extends Controller
{
   private $MODULE_NAME      = 'module_sg_lang_editor';
   private $MODULE_PATH      = 'extension/module/sg_lang_editor';
   private $OPTION_STATUS    = 'module_sg_lang_editor_status';

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
      
      $this->m_data['exit_link'] = $this->getLink('marketplace/extension', 'type=module');
      $this->response->setOutput($this->load->view($this->MODULE_PATH, $this->m_data));
   }

   /**
    * @brief This method prepares installation for the module
   */
   public function install()
   {
      $this->load->model('setting/setting');
      $this->model_setting_setting->editSetting($this->MODULE_NAME, array($this->OPTION_STATUS => 1));
      $this->config->set($this->OPTION_STATUS, 1);
   }

   /**
    * @brief This method prepares uninstallation for the module
   */
   public function uninstall()
   {
      $this->load->model('setting/setting');
      $this->model_setting_setting->deleteSetting($this->MODULE_NAME);
      $this->config->set($this->OPTION_STATUS, 0);
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
