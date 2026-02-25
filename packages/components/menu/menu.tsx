import { defineComponent, ref, computed, provide, watchEffect, watch, onMounted, toRefs } from 'vue';
import { ViewListIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import props from './props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './types';
import { useVModel, useContent, useTNodeJSX, usePrefixClass, useDefaultValue, useConfig } from '@tdesign/shared-hooks';
import { VMenu } from './utils';
import log from '@tdesign/common-js/log/log';
import { Drawer } from '../drawer';

import { isArray, isNumber } from 'lodash-es';

export default defineComponent({
  name: 'TMenu',
  props: { ...props, onCollapsed: Function },
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { globalConfig } = useConfig('menu');
    const mode = ref(props.expandType);
    const theme = computed(() => props.theme);
    const isMutex = computed(() => props.expandMutex);
    const collapsed = computed(() => props.collapsed);

    // S2 规范：Drawer 可见性状态
    const s2MenuVisible = ref(false);

    // S2 规范：三级菜单展开方式
    const thirdMode = computed(() => {
      // 当 expandType 为 'popup' 时，三级菜单始终浮层展开
      if (props.expandType === 'popup') return 'popup';
      // 当 expandType 为 'normal' 时，根据 thirdExpandType 决定
      return props.thirdExpandType || 'popup';
    });

    // S2 规范：Drawer 相关样式类
    const s2MenuClass = computed(() => [`${classPrefix.value}-s2-menu`]);

    const menuClass = computed(() => [
      `${classPrefix.value}-default-menu`,
      `${classPrefix.value}-menu--${props.theme}`,
      {
        [`${classPrefix.value}-is-collapsed`]: props.collapsed,
      },
    ]);
    const innerClasses = computed(() => [`${classPrefix.value}-menu`, `${classPrefix.value}-menu--scroll`]);
    const expandWidth = computed(() => {
      const { width } = props;
      const format = (val: string | number) => (isNumber(val) ? `${val}px` : val);
      if (isArray(width)) return width.map((item) => format(item));

      return [format(width), '64px'];
    });

    const styles = computed(() => ({
      height: '100%',
      width: props.collapsed ? expandWidth.value[1] : expandWidth.value[0],
    }));

    const { value, modelValue, expanded } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [expandValues, setExpand] = useDefaultValue(expanded, props.defaultExpanded, props.onExpand, 'expanded');
    const activeValues = ref([]);

    watchEffect(() => {
      mode.value = props.collapsed ? 'popup' : props.expandType;
      props.onCollapsed?.({ collapsed: props.collapsed });
    });

    const vMenu = new VMenu({ isMutex, expandValues: expandValues.value ? [...expandValues.value] : [] });
    provide<TdMenuInterface>('TdMenu', {
      activeValue,
      activeValues,
      expandValues,
      mode,
      theme,
      isHead: false,
      vMenu,
      collapsed,
      // S2 规范：传递三级菜单展开方式和鼠标触发配置
      thirdMode,
      mouseOverTrigger: computed(() => props.mouseOverTrigger),
      s2MenuVisible,
      select: (value: MenuValue) => {
        if (value !== activeValue.value) {
          setActiveValue(value);
        }
        // S2 规范：选中菜单项后关闭 Drawer
        if (props.s2) {
          s2MenuVisible.value = false;
        }
      },
      open: (value: MenuValue, type: TdOpenType) => {
        if (mode.value === 'normal') {
          setExpand(vMenu.expand(value));
        } else if (type === 'add') {
          if (expandValues.value.indexOf(value) === -1) {
            // 可能初始expanded里包含了该value
            setExpand([...expandValues.value, value]);
          }
        } else if (type === 'remove') {
          const index = expandValues.value.indexOf(value);
          const tmp = [...expandValues.value];
          tmp.splice(index, 1);
          setExpand(tmp);
        }
      },
      hidden: () => {
        s2MenuVisible.value = false;
      },
    });

    watch(
      () => props.expanded,
      (value) => {
        vMenu.expandValues = new Set(value);
      },
    );

    watch(
      () => props.collapsed,
      (newValue, oldValue) => {
        if (!newValue && oldValue) {
          // 如果重新打开菜单，就将原本已经展开的子菜单重新展开
          setExpand([...vMenu.expandValues]);
        }
      },
    );

    watch(activeValue, (value: MenuValue) => {
      activeValues.value = vMenu.select(value);
    });

    watchEffect(() => {
      if (ctx.slots.options) {
        log.warnOnce('TMenu', '`options` slot is going to be deprecated, please use `operations` for slot instead.');
      }
    });

    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
    });

    // S2 规范：Drawer 触发和关闭事件
    const handleTriggerClick = () => {
      s2MenuVisible.value = true;
    };
    const handleCloseClick = () => {
      s2MenuVisible.value = false;
    };

    // S2 规范：渲染 Drawer 模式
    const renderS2Menu = () => {
      const trigger = renderTNodeJSX('trigger');
      const menuBtn = (
        <div
          class={`${classPrefix.value}-s2-menu__trigger`}
          onClick={handleTriggerClick}
          onMouseover={props.mouseOverTrigger ? handleTriggerClick : undefined}
        >
          {trigger || [<ViewListIcon size="19px" />, <span>{globalConfig.value.menuBtn}</span>]}
        </div>
      );

      const drawerContent = (
        <div class={menuClass.value} style={styles.value}>
          <ul class={innerClasses.value}>{renderContent('default', 'content')}</ul>
        </div>
      );

      return (
        <>
          <Drawer
            visible={s2MenuVisible.value}
            class={`${classPrefix.value}-s2-menu__drawer`}
            attach="body"
            placement="left"
            header={globalConfig.value.menuBtn}
            footer={false}
            size={props.collapsed ? expandWidth.value[1] : expandWidth.value[0]}
            showOverlay
            closeOnOverlayClick
            closeBtn={() => <CloseCircleIcon />}
            onClose={handleCloseClick}
          >
            {drawerContent}
          </Drawer>
          {menuBtn}
        </>
      );
    };

    // 常规模式渲染
    const renderNormalMenu = () => {
      const operations = renderContent('operations', 'options');
      const logo = renderTNodeJSX('logo');

      return (
        <div class={`${classPrefix.value}-default-menu__inner`}>
          {logo && <div class={`${classPrefix.value}-menu__logo`}>{logo}</div>}
          <ul class={innerClasses.value}>{renderContent('default', 'content')}</ul>
          {operations && <div class={`${classPrefix.value}-menu__operations`}>{operations}</div>}
        </div>
      );
    };

    return () => {
      return (
        <div class={props.s2 ? s2MenuClass.value : menuClass.value} style={props.s2 ? undefined : styles.value}>
          {props.s2 ? renderS2Menu() : renderNormalMenu()}
        </div>
      );
    };
  },
});
