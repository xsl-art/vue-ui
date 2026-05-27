import { library } from "@fortawesome/fontawesome-svg-core";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleRight,
  faBan,
  faCheck,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faHeart,
  faSpinner,
  faTag,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const libraryIcons = [
  faXmark,
  faCircleXmark,
  faAngleDown,
  faSpinner,
  faCheck,
  faEye,
  faEyeSlash,
  faAngleRight,
  faTag,
  faCircleCheck,
  faCircleExclamation,
  faHeart,
  faCircleInfo,
  faBan,
] satisfies IconDefinition[];

export function registerLibraryIcons(additional: IconDefinition[] = []) {
  library.add(...libraryIcons, ...additional);
}

registerLibraryIcons();
