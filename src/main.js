import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// console.log(route)
import {
  Icon,
  Button,
  Form,
  Field,
  CellGroup,
  NavBar,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Dialog,
  Tabs,
  Tab,
  PullRefresh,
  Tag,
  RadioGroup,
  Radio,
  CountDown,
  List,
  SwipeCell,
  Cell,
  Popup,
  Picker,
  Image,
  Loading,
  Search,
  Skeleton,
  Col,
  Row,
  Lazyload,
  Overlay
} from "vant";
import "./base.css";
import "./tab.scss";
import "./rich.scss";
const app = createApp(App);
app.use(router);

app.use(Col);
app.use(Row);
app.use(Skeleton);
app.use(Search);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(Icon);
app.use(Dialog);
app.use(Tabs);
app.use(Tab);
app.use(PullRefresh);
app.use(Tag);
app.use(RadioGroup);
app.use(Radio);
app.use(CountDown);
app.use(List);
app.use(SwipeCell);
app.use(Cell);
app.use(Popup);
app.use(Picker);
app.use(Image);
app.use(Loading);
app.use(Lazyload);
app.use(Overlay);

app.use(Lazyload, {
  lazyComponent: true,
});
router.isReady().then(() => {
  app.mount("#app");


});

// // rem适配
// const setFontSize = () => {
//     const html = document.documentElement
//     const windowWidth = html.clientWidth
//     if (windowWidth <= 750) {
//       html.style.fontSize = windowWidth / 37.5 + 'px'
//     } else {
//       html.style.fontSize = '16px'
//     }
//   }
//   window.onresize = setFontSize
//   setFontSize()
