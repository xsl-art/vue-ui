let scrollLockCount = 0;

//锁定滚动
export function lockBodyScroll() {
  scrollLockCount++;
  if (scrollLockCount === 1) {
    //禁止页面滚动
    document.body.style.overflow = "hidden";
  }
}

//解除锁定
export function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    //解除
    document.body.style.overflow = "";
  }
}
