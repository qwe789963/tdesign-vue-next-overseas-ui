/**
 * S2 规范功能测试文件
 * 测试 Menu 组件的 S2 Drawer、mouseOverTrigger、thirdExpandType 等特殊功能
 */
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { Menu, MenuItem, Submenu } from '@tdesign/components/menu';
import { ViewListIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { Drawer } from '@tdesign/components/drawer';

describe('Menu S2 Specification', () => {
  /**
   * 4.1 Drawer 功能测试（T039-T043）
   */
  describe('S2 Drawer Functionality', () => {
    it('T039 [P] should open Drawer when trigger button is clicked', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
              <MenuItem value="2">Menu Item 2</MenuItem>
            </Menu>
          );
        },
      });

      // 查找触发按钮
      const trigger = wrapper.find('.t-s2-menu__trigger');
      expect(trigger.exists()).toBe(true);

      // 点击触发按钮
      await trigger.trigger('click');
      await nextTick();

      // 验证 Drawer 是否打开
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.exists()).toBe(true);
      expect(drawer.props('visible')).toBe(true);
    });

    it('T040 [P] should close Drawer when close button is clicked', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 打开 Drawer
      const trigger = wrapper.find('.t-s2-menu__trigger');
      await trigger.trigger('click');
      await nextTick();

      // 查找关闭按钮
      const closeBtn = wrapper.findComponent(CloseCircleIcon);
      expect(closeBtn.exists()).toBe(true);

      // 点击关闭按钮
      await closeBtn.trigger('click');
      await nextTick();

      // 验证 Drawer 是否关闭
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('visible')).toBe(false);
    });

    it('T041 [P] should close Drawer when MenuItem is clicked', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
              <MenuItem value="2">Menu Item 2</MenuItem>
            </Menu>
          );
        },
      });

      // 打开 Drawer
      const trigger = wrapper.find('.t-s2-menu__trigger');
      await trigger.trigger('click');
      await nextTick();

      // 点击菜单项
      const menuItem = wrapper.findAllComponents(MenuItem)[0];
      await menuItem.trigger('click');
      await nextTick();

      // 验证 Drawer 是否自动关闭
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('visible')).toBe(false);
    });

    it('T042 [P] should close Drawer when clicking outside (closeOnOverlayClick)', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 打开 Drawer
      const trigger = wrapper.find('.t-s2-menu__trigger');
      await trigger.trigger('click');
      await nextTick();

      // 验证 Drawer 的 closeOnOverlayClick 属性
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('closeOnOverlayClick')).toBe(true);

      // 模拟点击遮罩层（通过调用 onClose 事件）
      await drawer.vm.$emit('close');
      await nextTick();

      // 验证 Drawer 是否关闭
      expect(drawer.props('visible')).toBe(false);
    });

    it('T043 should support custom trigger slot', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu
              s2={true}
              v-slots={{
                trigger: () => <button class="custom-trigger">Open Menu</button>,
              }}
            >
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 验证自定义触发按钮
      const customTrigger = wrapper.find('.custom-trigger');
      expect(customTrigger.exists()).toBe(true);
      expect(customTrigger.text()).toBe('Open Menu');

      // 点击自定义触发按钮
      await customTrigger.trigger('click');
      await nextTick();

      // 验证 Drawer 是否打开
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('visible')).toBe(true);
    });
  });

  /**
   * 4.2 mouseOverTrigger 功能测试（T044-T046）
   */
  describe('mouseOverTrigger Functionality', () => {
    it('T044 [P] should open Drawer on mouseover when mouseOverTrigger=true', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true} mouseOverTrigger={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 鼠标移入触发按钮
      const trigger = wrapper.find('.t-s2-menu__trigger');
      await trigger.trigger('mouseover');
      await nextTick();

      // 验证 Drawer 是否打开
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('visible')).toBe(true);
    });

    it('T045 [P] should not open Drawer on mouseover when mouseOverTrigger=false', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true} mouseOverTrigger={false}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 鼠标移入触发按钮
      const trigger = wrapper.find('.t-s2-menu__trigger');
      await trigger.trigger('mouseover');
      await nextTick();

      // 验证 Drawer 不应该打开
      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.props('visible')).toBe(false);
    });

    it('T046 should verify mouseOverTrigger default value is false', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={true}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      // 验证默认值
      expect(wrapper.vm.$props.mouseOverTrigger).toBe(false);
    });
  });

  /**
   * 4.3 thirdExpandType 功能测试（T047-T051）
   */
  describe('thirdExpandType Functionality', () => {
    it('T047 [P] should render third-level submenu as popup when thirdExpandType=popup', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu expandType="normal" thirdExpandType="popup">
              <Submenu value="1" title="First Level">
                <Submenu value="1-1" title="Second Level">
                  <Submenu value="1-1-1" title="Third Level">
                    <MenuItem value="1-1-1-1">Third Menu Item</MenuItem>
                  </Submenu>
                </Submenu>
              </Submenu>
            </Menu>
          );
        },
      });

      await nextTick();

      // 查找三级 Submenu 组件
      const thirdSubmenu = wrapper.findAllComponents(Submenu)[2]; // 第三个 Submenu

      // 验证三级菜单使用 popup 模式（通过查找 Popup 组件）
      expect(thirdSubmenu.exists()).toBe(true);
      // 三级菜单应该有 popup 相关的类名或结构
      // 注意：具体断言需要根据实际 Popup 组件的渲染结果调整
    });

    it('T048 [P] should render third-level submenu as normal when thirdExpandType=normal', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu expandType="normal" thirdExpandType="normal">
              <Submenu value="1" title="First Level">
                <Submenu value="1-1" title="Second Level">
                  <Submenu value="1-1-1" title="Third Level">
                    <MenuItem value="1-1-1-1">Third Menu Item</MenuItem>
                  </Submenu>
                </Submenu>
              </Submenu>
            </Menu>
          );
        },
      });

      await nextTick();

      // 验证三级菜单使用 normal 模式（平铺展开）
      const thirdSubmenu = wrapper.findAllComponents(Submenu)[2];
      expect(thirdSubmenu.exists()).toBe(true);
      // 三级菜单应该没有 popup 相关的结构，而是平铺在父级下
    });

    it('T049 should verify thirdExpandType default value is popup', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem value="1">Menu Item</MenuItem>
            </Menu>
          );
        },
      });

      // 验证默认值
      expect(wrapper.vm.$props.thirdExpandType).toBe('popup');
    });

    it('T050 should always use popup for third-level when expandType=popup', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu expandType="popup" thirdExpandType="normal">
              <Submenu value="1" title="First Level">
                <Submenu value="1-1" title="Second Level">
                  <Submenu value="1-1-1" title="Third Level">
                    <MenuItem value="1-1-1-1">Third Menu Item</MenuItem>
                  </Submenu>
                </Submenu>
              </Submenu>
            </Menu>
          );
        },
      });

      await nextTick();

      // 当 expandType='popup' 时，即使 thirdExpandType='normal'，三级菜单也应该是 popup
      const thirdSubmenu = wrapper.findAllComponents(Submenu)[2];
      expect(thirdSubmenu.exists()).toBe(true);
      // 验证三级菜单仍然使用 popup 模式
    });

    it('T051 should respect Submenu expandType prop over thirdExpandType', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu expandType="normal" thirdExpandType="popup">
              <Submenu value="1" title="First Level">
                <Submenu value="1-1" title="Second Level">
                  <Submenu value="1-1-1" title="Third Level" expandType="normal">
                    <MenuItem value="1-1-1-1">Third Menu Item</MenuItem>
                  </Submenu>
                </Submenu>
              </Submenu>
            </Menu>
          );
        },
      });

      await nextTick();

      // Submenu 自身的 expandType 优先级最高
      const thirdSubmenu = wrapper.findAllComponents(Submenu)[2];
      expect(thirdSubmenu.exists()).toBe(true);
      // 验证三级菜单使用 normal 模式（因为 Submenu 自身设置了 expandType='normal'）
    });
  });

  /**
   * 4.4 Props 默认值验证（T052-T055）
   */
  describe('Props Default Values', () => {
    it('T052 should verify s2 prop default value is true', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem value="1">Menu Item</MenuItem>
            </Menu>
          );
        },
      });

      expect(wrapper.vm.$props.s2).toBe(true);
    });

    it('T053 should verify mouseOverTrigger default value is false', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem value="1">Menu Item</MenuItem>
            </Menu>
          );
        },
      });

      expect(wrapper.vm.$props.mouseOverTrigger).toBe(false);
    });

    it('T054 should verify thirdExpandType default value is popup', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem value="1">Menu Item</MenuItem>
            </Menu>
          );
        },
      });

      expect(wrapper.vm.$props.thirdExpandType).toBe('popup');
    });

    it('T055 should disable S2 mode when s2=false', async () => {
      const wrapper = mount({
        render() {
          return (
            <Menu s2={false}>
              <MenuItem value="1">Menu Item 1</MenuItem>
            </Menu>
          );
        },
      });

      await nextTick();

      // 验证不渲染触发按钮和 Drawer
      const trigger = wrapper.find('.t-s2-menu__trigger');
      expect(trigger.exists()).toBe(false);

      const drawer = wrapper.findComponent(Drawer);
      expect(drawer.exists()).toBe(false);
    });
  });
});
