import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/view/Main';
import About from '@/view/About';
import Contact from '@/view/Contact';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about-us',
      name: 'About',
      component: About
    },
    {
      path: '/contact-us',
      name: 'Contact',
      component: Contact
    }
  ]
});
