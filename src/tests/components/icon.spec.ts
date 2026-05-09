import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Icon from "../../components/Icon/Icon.vue";

describe("Icon", () => {
  it("renders fontawesome icon with type class and custom color", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "check",
        type: "success",
        color: "rgb(1, 2, 3)",
      },
    });

    const icon = wrapper.find(".vk-icon");
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain("vk-icon--success");
    expect(icon.attributes("style")).toContain("color: rgb(1, 2, 3)");
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("passes fontawesome props and attrs while omitting local props", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "spinner",
        spin: true,
        size: "2x",
        type: "primary",
        color: "red",
      },
      attrs: {
        id: "loading-icon",
        "aria-label": "loading",
      },
    });

    expect(wrapper.attributes("id")).toBe("loading-icon");
    expect(wrapper.attributes("aria-label")).toBe("loading");
    expect(wrapper.find("svg").classes().join(" ")).toContain("fa-spin");
    expect(wrapper.find("svg").attributes("data-icon")).toBe("spinner");
    expect(wrapper.find("svg").attributes("style") ?? "").not.toContain("color");
    expect(wrapper.find("svg").attributes("style") ?? "").not.toContain("type");
  });
});
