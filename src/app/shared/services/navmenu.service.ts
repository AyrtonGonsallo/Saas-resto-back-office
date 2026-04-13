import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environment';

export interface Menu {
  headTitle1?: string;
  level?: number;
  badge?: boolean;
  path?: string;
  line?: boolean;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  id?: number;
  devOnly?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  horizontalList?: boolean;
  items?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavmenuService {
  public language: boolean = false;
  public isShow: boolean = false;
  public closeSidebar: boolean = false;

  constructor() {}

  MENUITEMS: Menu[] = [
    {
      headTitle1: 'General',
      line: false,devOnly: true,
    },
    {
      id: 1,
      level: 1,
      title: 'Dashboard',
      icon: 'Home',devOnly: true,
      badge: true,
      type: 'sub',
      active: true,
      children: [
        { path: '/dashboard/default', title: 'Default', type: 'link' },
        { path: '/dashboard/ecommerce', title: 'Ecommerce', type: 'link' },
        { path: '/dashboard/project', title: 'Project', type: 'link' },
      ],
    },
    {
      id: 2,
      level: 1,
      title: 'Widgets',
      icon: 'Pie',
      type: 'sub',
      devOnly: true,
      active: false,
      children: [
        { path: '/widgets/general', title: 'General', type: 'link' },
        { path: '/widgets/chart', title: 'Chart', type: 'link' },
      ],
    },
    {
      headTitle1: 'Gestion',
      line: true,
    },
    {
      id: 35,
      level: 1,
      title: 'Rôles',
      path: '/roles/liste-roles',
      icon: 'Shield',
      active: false,
    },
    {
      id: 36,
      level: 1,
      title: 'Sociétés',
      path: '/societes/liste-societes',
      icon: 'Bag',
      active: false,
    },
    {
      id: 43,
      level: 1,
      title: 'Paramètres',
      path: '/parametres/liste-parametres',
      icon: 'Setting',
      active: false,
    },
    {
      id: 37,
      level: 1,
      title: 'Restaurants',
      path: '/restaurants/liste-restaurants',
      icon: 'Home',
      active: false,
    },
    {
      id: 45,
      level: 1,
      title: 'Type de cuisine',
      path: '/types-de-cuisine/liste-types-cuisine',
      icon: 'order-product',
      active: false,
    },
    {
      id: 38,
      level: 1,
      title: 'Utilisateurs',
      path: '/utilisateurs/liste-utilisateurs',
      icon: 'Profile',
      active: false,
    },
    {
      id: 47,
      level: 1,
      title: 'Zones du restaurant',
      path: '/zones-restaurant/liste-zones-restaurant',
      icon: 'order-product',
      active: false,
    },
    {
      id: 48,
      level: 1,
      title: 'Notifications',
      path: '/notifications/liste-notifications',
      icon: 'order-product',
      active: false,
    },
    {
      id: 39,
      level: 1,
      title: 'Tables',
      path: '/tables/liste-tables',
      icon: 'Work',
      active: false,
    },
    {
      id: 40,
      level: 1,
      title: 'Catégories de produits',
      path: '/categories-produit/liste-categories-produit',
      icon: 'Category',
      active: false,
    },
    {
      id: 41,
      level: 1,
      title: 'Produits',
      path: '/produits/liste-produits',
      icon: 'Buy',
      active: false,
    },
    {
      id: 42,
      level: 1,
      title: 'Variations de produits',
      path: '/variations-produit/liste-variations-produit',
      icon: 'order-product',
      active: false,
    },
    {
      id: 46,
      level: 1,
      title: 'Menus',
      path: '/menus/liste-menus',
      icon: 'order-product',
      active: false,
    },
    {
      id: 43,
      level: 1,
      title: 'Créneaux',
      path: '/creneaux/liste-creneaux',
      icon: 'order-product',
      active: false,
    },
    {
      id: 44,
      level: 1,
      title: 'Services',
      path: '/services/liste-services',
      icon: 'order-product',
      active: false,
    },
    {
      id: 45,
      level: 1,
      title: 'Tags',
      path: '/tags/liste-tags',
      icon: 'order-product',
      active: false,
    },
    {
      id: 45,
      level: 1,
      title: 'Réservations',
      path: '/reservations/liste-reservations',
      icon: 'order-product',
      active: false,
    },
    {
      headTitle1: 'Applications',
      line: true,
      devOnly: true,
    },
    {
      id: 3,
      level: 1,
      title: 'Project',
      icon: 'Info-circle',
      type: 'sub',
      active: false,
      devOnly: true,
      horizontalList: true,
      children: [
        { path: '/project/list', title: 'Project List', type: 'link' },
        { path: '/project/create', title: 'Create New', type: 'link' },
      ],
    },
    {
      id: 4,
      level: 1,
      path: '/file-manager',
      title: 'File Manager',
      icon: 'Paper',
      devOnly: true,
      type: 'link',
    },
    {
      id: 5,
      level: 1,
      title: 'Ecommerce',
      type: 'sub',
      icon: 'Bag',
      devOnly: true,
      horizontalList: true,
      active: false,
      children: [
        { path: '/ecommerce/products', title: 'Product', type: 'link' },
        { path: '/ecommerce/product-page', title: 'Product page', type: 'link' },
        { path: '/ecommerce/add-products', title: 'Add Product', type: 'link' },
        { path: '/ecommerce/product-list', title: 'Product List', type: 'link' },
        { path: '/ecommerce/payment-details', title: 'Payment Details', type: 'link' },
        { path: '/ecommerce/order-history', title: 'Order History', type: 'link' },
        {
          title: 'invoice',
          type: 'sub',
          level: 2,
          active: false,
          children: [
            { path: '/invoice/invoice1', title: 'Invoice-1', type: 'link' },
            { path: '/invoice/invoice2', title: 'Invoice-2', type: 'link' },
            { path: '/invoice/invoice3', title: 'Invoice-3', type: 'link' },
            { path: '/invoice/invoice4', title: 'Invoice-4', type: 'link' },
            { path: '/invoice/invoice5', title: 'Invoice-5', type: 'link' },
            { path: '/invoice/invoice6', title: 'Invoice-6', type: 'link' },
          ],
        },
        { path: '/ecommerce/cart', title: 'Cart', type: 'link' },
        { path: '/ecommerce/wishlist', title: 'Wishlist', type: 'link' },
        { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },
        { path: '/ecommerce/pricing', title: 'Pricing', type: 'link' },
      ],
    },
    {
      id: 6,
      level: 1,
      title: 'Letter-box',
      path: '/letter-box',
      devOnly: true,
      icon: 'Message',
      active: false,
      type: 'link',
    },
    {
      id: 7,
      level: 1,
      title: 'Chat',
      type: 'sub',
      icon: 'Chat',
      devOnly: true,
      active: false,
      children: [
        { path: '/chat/private-chat', title: 'Private Chat', type: 'link' },
        { path: '/chat/group-chat', title: 'Group Chat', type: 'link' },
      ],
    },
    {
      id: 8,
      level: 1,
      title: 'Users',
      icon: 'Profile',
      type: 'sub',
      devOnly: true,
      active: false,
      children: [
        { path: '/user/users-profile', title: 'Users Profile', type: 'link' },
        { path: '/user/profile-edit', title: 'Users Edit', type: 'link' },
        { path: '/user/users-cards', title: 'Users Cards', type: 'link' },
      ],
    },
    { level: 1, id: 9, devOnly: true, path: '/bookmarks', title: 'Bookmarks', icon: 'Bookmark', type: 'link' },
    {
      level: 1,
      id: 10,
      path: '/contacts',
      bookmark: true,
      devOnly: true,
      title: 'Contact',
      icon: 'Contacts',
      type: 'link',
    },
    {
      level: 1,
      id: 11,
      path: '/task',
      bookmark: true,
      title: 'Tasks',
      devOnly: true,
      icon: 'Tick-square',
      type: 'link',
    },
    { level: 1, id: 12,devOnly: true, path: '/calender', title: 'Calender', icon: 'Calendar', type: 'link' },
    { level: 1, id: 13,devOnly: true, path: '/social-app', title: 'Social App', icon: 'Camera', type: 'link' },
    { level: 1, id: 14,devOnly: true, path: '/todo', bookmark: true, title: 'To-Do', icon: 'Edit', type: 'link' },
    {
      level: 1,
      id: 15,devOnly: true,
      path: '/search-pages',
      title: 'Search Result',
      icon: 'Search',
      type: 'link',
    },
    {
      headTitle1: 'Components',
      line: true,devOnly: true,
    },
    {
      id: 16,devOnly: true,
      level: 1,
      title: 'Buttons',
      path: '/buttons',
      icon: 'More-box',
      type: 'link',
    },
    {
      id: 17,
      level: 1,devOnly: true,
      title: 'Ui-Kits',
      icon: 'Folder',
      type: 'sub',
      active: false,
      children: [
        { path: '/ui-kits/typography', title: 'Typography', type: 'link' },
        { path: '/ui-kits/avatars', title: 'Avatars', type: 'link' },
        { path: '/ui-kits/grid', title: 'Grid', type: 'link' },
        { path: '/ui-kits/helper-classes', title: 'Helper Classes', type: 'link' },
        { path: '/ui-kits/tag-n-pills', title: 'Tag & Pills', type: 'link' },
        { path: '/ui-kits/progress-bar', title: 'Progress', type: 'link' },
        { path: '/ui-kits/popover', title: 'Popover', type: 'link' },
        { path: '/ui-kits/tooltip', title: 'Tooltip', type: 'link' },
        { path: '/ui-kits/alert', title: 'Alert', type: 'link' },
        { path: '/ui-kits/modal', title: 'Modal', type: 'link' },
        { path: '/ui-kits/dropdown', title: 'Dropdown', type: 'link' },
        { path: '/ui-kits/according', title: 'Accordion', type: 'link' },
        { path: '/ui-kits/tabs', title: 'Tabs', type: 'link' },
        { path: '/ui-kits/list', title: 'Lists', type: 'link' },
      ],
    },
    {
      id: 18,
      level: 1,devOnly: true,
      title: 'Bonus UI',
      icon: 'Ticket-star',
      type: 'sub',
      horizontalList: true,
      active: false,
      children: [
        { path: '/bonus-ui/breadcrumb', title: 'Breadcrumb', type: 'link' },
        { path: '/bonus-ui/pagination', title: 'Pagination', type: 'link' },
        { path: '/bonus-ui/ribbons', title: 'Ribbons', type: 'link' },
        { path: '/bonus-ui/toasts', title: 'Toasts', type: 'link' },
        { path: '/bonus-ui/rating', title: 'Rating', type: 'link' },
        { path: '/bonus-ui/dropzone', title: 'Dropzone', type: 'link' },
        { path: '/bonus-ui/sweetalert2', title: 'SweetAlert2', type: 'link' },
        { path: '/bonus-ui/owl-carousel', title: 'Owl Carousel', type: 'link' },
        { path: '/bonus-ui/range-slider', title: 'Range Slider', type: 'link' },
        { path: '/bonus-ui/image-cropper', title: 'Image Cropper', type: 'link' },
        { path: '/bonus-ui/basic-card', title: 'Basic Card', type: 'link' },
        { path: '/bonus-ui/creative-card', title: 'Creative Card', type: 'link' },
        { path: '/bonus-ui/timeline', title: 'Timeline', type: 'link' },
      ],
    },
    {
      id: 19,
      level: 1,devOnly: true,
      title: 'Icons',
      icon: 'Activity',
      type: 'sub',
      active: false,
      children: [
        { path: '/icons/flag-icons', title: 'Flag icon', type: 'link' },
        { path: '/icons/fontawesome-icons', title: 'Fontawesome Icon', type: 'link' },
        { path: '/icons/ico-icons', title: 'Ico Icon', type: 'link' },
        { path: '/icons/themify-icons', title: 'Themify Icon', type: 'link' },
        { path: '/icons/feather-icons', title: 'Feather Icon', type: 'link' },
        { path: '/icons/weather-icons', title: 'Weather Icon', type: 'link' },
      ],
    },

    {
      id: 20,
      level: 1,devOnly: true,
      title: 'Charts',
      icon: 'Chart',
      type: 'sub',
      active: false,
      children: [
        { path: '/chart/apex-chart', title: 'Apex Chart', type: 'link' },
        { path: '/chart/chartist-chart', title: 'Chartist Chart', type: 'link' },
        { path: '/chart/chartjs-chart', title: 'Chartjs Chart', type: 'link' },
        { path: '/chart/google-chart', title: 'Google Chart', type: 'link' },
      ],
    },
    {
      headTitle1: 'Forms & Table',
      line: true,devOnly: true,
    },
    {
      id: 21,
      level: 1,
      title: 'Form Controls',
      type: 'sub',devOnly: true,
      icon: 'Filter',
      active: false,
      children: [
        { path: '/form-controls/base-input', title: 'Base Input', type: 'link' },
        { path: '/form-controls/checkbox-radio', title: 'Checkbox Radio', type: 'link' },
        { path: '/form-controls/input-groups', title: 'Input Groups', type: 'link' },
        { path: '/form-controls/mega-options', title: 'Mega Options', type: 'link' },
        { path: '/form-controls/validation', title: 'Form Validation', type: 'link' },
      ],
    },
    {
      id: 22,
      level: 1,devOnly: true,
      title: 'Form Widgets',
      type: 'sub',
      icon: 'Scan',
      active: false,
      children: [
        { path: '/form-widgets/datepicker', title: 'Datepicker', type: 'link' },
        { path: '/form-widgets/touchspin', title: 'Touchspin', type: 'link' },
        { path: '/form-widgets/select2', title: 'Select2', type: 'link' },
        { path: '/form-widgets/switch', title: 'Switch', type: 'link' },
        { path: '/form-widgets/typeahead', title: 'Typeahead', type: 'link' },
        { path: '/form-widgets/clipboard', title: 'Clipboard', type: 'link' },
      ],
    },
    {
      id: 23,
      level: 1,devOnly: true,
      title: 'Tables',
      icon: 'Edit-line',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'Bootstrap Tables',
          type: 'sub',
          level: 2,devOnly: true,
          active: false,
          children: [
            { path: '/table/bootstrap-tables/basic-table', title: 'Basic Table', type: 'link' },
            {
              path: '/table/bootstrap-tables/table-components',
              title: 'Table Components',
              type: 'link',
            },
          ],
        },
        {
          title: 'Data Table',
          active: false,

          type: 'link',
          path: '/table/datatable',
        },
      ],
    },
    {
      headTitle1: 'Pages',
      line: true,devOnly: true,
    },
    {
      level: 1,
      id: 24,devOnly: true,
      path: '/sample-page',
      title: 'Sample Page',
      icon: 'Paper-plus',
      type: 'link',
    },
    {
      id: 25,
      level: 1,devOnly: true,
      title: 'Others',
      icon: 'Password',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'Error Pages',
          type: 'sub',
          level: 2,
          active: false,
          children: [
            {
              path: '/error-page/error-page1',
              title: 'Error Page 1',
              type: 'link',
            },
            {
              path: '/error-page/error-page2',
              title: 'Error Page 2',
              type: 'link',
            },
            {
              path: '/error-page/error-page3',
              title: 'Error Page 3',
              type: 'link',
            },
            {
              path: '/error-page/error-page4',
              title: 'Error Page 4',
              type: 'link',
            },
            {
              path: '/error-page/error-page5',
              title: 'Error Page 5',
              type: 'link',
            },
            {
              path: '/error-page/error-page6',
              title: 'Error Page 6',
              type: 'link',
            },
          ],
        },
        {
          title: 'Authentication',
          type: 'sub',
          level: 2,
          active: false,
          children: [
            {
              path: '/authentication/simple',
              title: 'Login Simple',
              type: 'link',
            },
            {
              path: '/authentication/image-one',
              title: 'Login with Bg Image',
              type: 'link',
            },
            {
              path: '/authentication/image-two',

              title: 'Login with Image two',
              type: 'link',
            },
            {
              path: '/authentication/validation',
              title: 'Login with Validation',
              type: 'link',
            },
            {
              path: '/authentication/tooltip',
              title: 'Login with Tooltip',
              type: 'link',
            },
            {
              path: '/authentication/sweetalert',
              title: 'Login with Sweetalert',
              type: 'link',
            },
            {
              path: '/authentication/register-simple',
              title: 'Register Simple',
              type: 'link',
            },
            {
              path: '/authentication/register-image-one',
              title: 'Register with Bg Image',
              type: 'link',
            },
            {
              path: '/authentication/register-image-two',
              title: 'Register with image two',
              type: 'link',
            },
            {
              path: '/authentication/unlock-user',
              title: 'Unlock User',
              type: 'link',
            },
            {
              path: '/authentication/forget-password',
              title: 'Forget Password',
              type: 'link',
            },
            {
              path: '/authentication/reset-password',
              title: 'Reset Password',
              type: 'link',
            },
            {
              path: '/authentication/maintenance',
              title: 'Maintenance',
              type: 'link',
            },
          ],
        },
        {
          title: 'Coming Soon',
          type: 'sub',
          level: 2,
          active: false,
          children: [
            {
              path: '/coming-soon/coming-soon-simple',
              title: 'Coming Simple',
              type: 'link',
            },
            {
              path: '/coming-soon/coming-soon-video',
              title: 'Coming With Bg Video',
              type: 'link',
            },
            {
              path: '/coming-soon/coming-soon-image',
              title: 'Coming With Bg Image',
              type: 'link',
            },
          ],
        },
        {
          title: 'Email templates',
          type: 'sub',
          active: false,
          level: 2,
          children: [
            {
              path: 'https://admin.pixelstrap.com/edmin/template/basic-template.html',
              title: 'Basic Email',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/edmin/template/email-header.html',
              title: 'Basic With Header',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/edmin/template/template-email.html',
              title: 'Ecomerce Template',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/edmin/template/template-email-2.html',
              title: 'Email Template 2',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/edmin/template/ecommerce-templates.html',
              title: 'Ecommerce Email',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/edmin/template/email-order-success.html',
              title: 'Order Success',
              type: 'extTabLink',
            },
          ],
        },
      ],
    },
    {
      headTitle1: 'Miscellaneous',
      line: true,devOnly: true,
    },
    {
      id: 26,
      level: 1,
      title: 'Gallery',
      icon: 'Gallery',
      type: 'sub',devOnly: true,
      active: false,
      children: [
        { path: '/gallary/gallary-grid', title: 'Gallery Grid', type: 'link' },
        { path: '/gallary/gallery-grid-desc', title: 'Gallery Grid Desc', type: 'link' },
        { path: '/gallary/masonry-gallery', title: 'Masonry Gallery', type: 'link' },
        { path: '/gallary/masonry-with-desc', title: 'Masonry With Desc', type: 'link' },
        { path: '/gallary/hover-effects', title: 'Hover Effects', type: 'link' },
      ],
    },
    {
      id: 27,
      level: 1,
      title: 'Blog',
      icon: 'Game',devOnly: true,
      type: 'sub',
      horizontalList: true,
      active: false,
      children: [
        { path: '/blog/blog-details', title: 'Blog Details', type: 'link' },
        { path: '/blog/blog-single', title: 'Blog Single', type: 'link' },
        { path: '/blog/add-post', title: 'Add Post', type: 'link' },
      ],
    },
    {
      level: 1,
      id: 28,
      path: '/faq',
      title: 'FAQ',
      icon: 'Danger',devOnly: true,
      type: 'link',
      active: false,
    },
    {
      id: 29,
      level: 1,
      title: 'Job Search',
      icon: 'Filter-2',devOnly: true,
      type: 'sub',
      active: false,
      children: [
        { path: '/job/cards-view', title: 'Cards View', type: 'link' },
        { path: '/job/list-view', title: 'List View', type: 'link' },
        { path: '/job/job-details', title: 'Job Details', type: 'link' },
        { path: '/job/apply', title: 'Apply', type: 'link' },
      ],
    },
    {
      id: 30,
      level: 1,
      title: 'Learning',devOnly: true,
      icon: 'Work',
      type: 'sub',
      active: false,
      children: [
        { path: '/learning/learning-list', title: 'Learning List', type: 'link' },
        { path: '/learning/detailed-course', title: 'Detailed Course', type: 'link' },
      ],
    },
    {
      id: 31,
      level: 1,
      title: 'Maps',devOnly: true,
      icon: 'Discovery',
      type: 'sub',
      active: false,
      children: [
        { path: '/maps/map-google', title: 'Google Map', type: 'link' },
        { path: '/maps/leaflet-map', title: 'Leaflet Map', type: 'link' },
      ],
    },
    {
      id: 32,
      level: 1,
      title: 'Editors',devOnly: true,
      icon: 'Shield',
      type: 'sub',
      active: false,
      children: [
        { path: '/editors/ngx-editors', title: 'NGX Editor', type: 'link' },
        { path: '/editors/mde-editors', title: 'MDE Editor', type: 'link' },
      ],
    },
    {
      level: 1,
      id: 33,devOnly: true,
      path: '/knowledgebase',
      title: 'Knowledgebase',
      icon: 'Setting',
      type: 'link',
    },
    {
      level: 1,
      id: 34,devOnly: true,
      path: '/support-ticket',
      title: 'Support Ticket',
      icon: 'Ticket',
      type: 'link',
    },
  ];

  item = new BehaviorSubject<Menu[]>(this.MENUITEMS.filter(item => {
    //console.log(item.title,item.devOnly,environment.production)
    // cacher si devOnly et qu'on est en prod
    if (item.devOnly && environment.production) {
      
      return false;
    }
    return true;
  }));
}
