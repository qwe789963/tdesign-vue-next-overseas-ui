import { ref, toRefs, computed, CSSProperties } from 'vue';
import { isObject, isFunction, isArray, isBoolean } from 'lodash-es';

import { TdSelectInputProps } from '../type';
import { TdPopupProps, PopupVisibleChangeContext } from '../../popup';
import { useDisabled, useReadonly } from '@tdesign/shared-hooks';

export type overlayInnerStyleProps = Pick<
  TdSelectInputProps,
  'popupProps' | 'autoWidth' | 'readonly' | 'onPopupVisibleChange' | 'allowInput' | 'popupVisible'
> & {
  disabled?: boolean | Array<boolean>;
};

export function useOverlayInnerStyle(props: overlayInnerStyleProps) {
  const { popupProps, autoWidth } = toRefs(props);
  const innerPopupVisible = ref(false);
  const disable = useDisabled();
  const isReadonly = useReadonly();

  const matchWidthFunc = (triggerElement: HTMLElement, _popupElement: HTMLElement) => {
    // 使用 getBoundingClientRect 获取精确的小数宽度，避免 offsetWidth 取整导致下拉框与 trigger 宽度不一致
    const width = triggerElement.getBoundingClientRect().width;
    let otherOverlayInnerStyle: CSSProperties = {};
    if (
      popupProps.value &&
      typeof popupProps.value.overlayInnerStyle === 'object' &&
      !popupProps.value.overlayInnerStyle.width
    ) {
      otherOverlayInnerStyle = popupProps.value.overlayInnerStyle;
    }
    return {
      width: `${width}px`,
      ...otherOverlayInnerStyle,
    };
  };

  const onInnerPopupVisibleChange = (visible: boolean, ctx: PopupVisibleChangeContext) => {
    if ((isArray(disable.value) && disable.value.every(Boolean)) || (isBoolean(disable.value) && disable.value)) return;
    if (isReadonly.value) return;

    // 如果点击触发元素（输入框）且为可输入状态，则继续显示下拉框
    const newVisible = ctx.trigger === 'trigger-element-click' && props.allowInput ? true : visible;
    // 重复点击触发元素时，下拉框展示状态不变，不重复触发事件
    if (props.popupVisible !== newVisible) {
      innerPopupVisible.value = newVisible;

      props.onPopupVisibleChange?.(newVisible, ctx);
    }
  };

  const getAutoWidthPopupStyleWidth = (triggerElement: HTMLElement, popupElement: HTMLElement) => {
    // 使用 getBoundingClientRect 获取精确的小数宽度
    const triggerWidth = triggerElement.getBoundingClientRect().width;
    const popupWidth = popupElement.getBoundingClientRect().width;
    return {
      width: `${Math.max(triggerWidth, popupWidth)}px`,
      ...popupProps.value?.overlayInnerStyle,
    };
  };

  const tOverlayInnerStyle = computed(() => {
    let result: TdPopupProps['overlayInnerStyle'] = {};
    const overlayInnerStyle = popupProps.value?.overlayInnerStyle || {};
    if (isFunction(overlayInnerStyle) || (isObject(overlayInnerStyle) && overlayInnerStyle.width)) {
      result = overlayInnerStyle;
    } else {
      if (autoWidth.value) {
        result = getAutoWidthPopupStyleWidth;
      } else {
        result = matchWidthFunc;
      }
    }
    return result;
  });

  return {
    tOverlayInnerStyle,
    innerPopupVisible,
    onInnerPopupVisibleChange,
  };
}
