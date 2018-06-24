import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AudioPlay from '@/components/AudioPlay'
import Layer from '@/components/Layer'
import BetterScroll from '@/components/BetterScroll'
import Upload from '@/components/Upload'
import Score from '@/components/Score'
import CssStyle from '@/components/CssStyle'
import Transition from '@/components/Transition'
import ImgVue from '@/components/ImgVue'
import PicturePreview from '@/components/PicturePreview'
import Preview from '@/components/Preview'
import MyVideo from '@/components/MyVideo'
import Aplayer from '@/components/Aplayer'
import WangEditor from '@/components/WangEditorFather'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
     {
      path: '/layer/:imgId/:imgUrl',
      name: 'Layer',
      component: Layer
    },
     {
      path: '/audioPlay',
      name: 'AudioPlay',
      component: AudioPlay
    },
    {
      path:'/betterScroll',
      name:'BetterScroll',
      component:BetterScroll
    },
    {
      path:'/upload',
      name:"Upload",
      component:Upload
    },
    {
      path:'/score',
      name:"Score",
      component:Score
    },
    {
      path:'/cssStyle',
      name:'CssStyle',
      component:CssStyle
    },
    {
      path:'/transition',
      name:'Transition',
      component:Transition
    },
    {
      path:'/imgVue',
      name:'ImgVue',
      component:ImgVue
    },
    {
      path:'/picturePreview',
      name:'PicturePreview',
      component:PicturePreview
    },
    {
      path:'/preview',
      name:'Preview',
      component:Preview
    },
    {
      path:'/myVideo',
      name:'MyVideo',
      component:MyVideo
    },
    {
      path:'/aplayer',
      name:'Aplayer',
      component:Aplayer
    },
    {
      path:'/wangEditor',
      name:'WangEditor',
      component:WangEditor
    }
  ]
})
