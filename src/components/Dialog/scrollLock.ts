let scrollLockCount = 0;
let scrollTop = 0;
let previousBodyPosition = "";
let previousBodyTop = "";
let previousBodyWidth = "";
let previousBodyOverflowY = "";

//锁定滚动
export function lockBodyScroll() {
  scrollLockCount++;
  if (scrollLockCount === 1) {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    previousBodyPosition = document.body.style.position;
    previousBodyTop = document.body.style.top;
    previousBodyWidth = document.body.style.width;
    previousBodyOverflowY = document.body.style.overflowY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll";
  }
}

//解除锁定
export function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.position = previousBodyPosition;
    document.body.style.top = previousBodyTop;
    document.body.style.width = previousBodyWidth;
    document.body.style.overflowY = previousBodyOverflowY;
    window.scrollTo(0, scrollTop);
  }
}
