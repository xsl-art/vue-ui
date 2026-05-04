//渲染函数
import { defineComponent } from "vue";

const renderVNode = defineComponent({
  props: {
    VNode: {
      type: [String, Object, Number],
      required: true,
    },
  },
  setup(props) {
    return () => props.VNode;
  },
});

export default renderVNode;
