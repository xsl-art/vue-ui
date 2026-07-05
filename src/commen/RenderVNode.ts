//渲染函数
import { defineComponent } from "vue";

//接收一个 VNode（虚拟节点）作为 prop
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
