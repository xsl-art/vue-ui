import { isRef, onBeforeUnmount, onMounted, watch, unref, type Ref } from "vue";
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  eventType: string,
  handler: (e: Event) => any,
) {
  if (isRef(target)) {
    watch(
      () => target,
      (newVal, oldVal) => {
        oldVal.value?.removeEventListener(eventType, handler);
        newVal.value?.addEventListener(eventType, handler);
      },
    );
  } else {
    //静态对象
    onMounted(() => target.addEventListener(eventType, handler));
  }

  //清除定时器
  onBeforeUnmount(() => unref(target)?.removeEventListener(eventType, handler));
}
