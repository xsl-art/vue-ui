import { library } from "@fortawesome/fontawesome-svg-core";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faBox,
  faFilter,
  faHouse,
  faInfo,
  faLeaf,
  faMouse,
  faPaperPlane,
  faRotate,
  faStar,
  faTriangleExclamation,
  faUpload,
  faUser,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

const docIcons = [
  faHouse,
  faUser,
  faTriangleExclamation,
  faStar,
  faLeaf,
  faPaperPlane,
  faRotate,
  faBell,
  faUpload,
  faFilter,
  faInfo,
  faBox,
  faMouse,
  faBan,
] satisfies IconDefinition[];

library.add(...docIcons);
