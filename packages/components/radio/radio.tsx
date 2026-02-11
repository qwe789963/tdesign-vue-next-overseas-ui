import { defineComponent, inject, toRefs, computed, ComputedRef, nextTick } from 'vue';
import {
  useVModel,
  useContent,
  useDisabled,
  useReadonly,
  usePrefixClass,
  useCommonClassName,
} from '@tdesign/shared-hooks';
import { omit, isString } from 'lodash-es';
import props from './props';
import { RadioGroupInjectionKey, RadioButtonInjectionKey } from './constants';

// hooks
import { useFocusHandler } from './hooks/use-focus-handler';

import { getValidAttrs } from '@tdesign/common-js/utils/helper';

export default defineComponent({
  name: 'TRadio',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    // 海外版本：Focus 状态管理
    const { inputRef: focusInputRef, handleFocus, handleBlur } = useFocusHandler();

    const radioChecked = computed(() => (radioGroup ? props.value === radioGroup.value : innerChecked.value));

    const radioGroup = inject(RadioGroupInjectionKey, undefined);

    const allowUncheck = computed(() => Boolean(props.allowUncheck || radioGroup?.allowUncheck));

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const onLabelClick = (e: MouseEvent) => {
      if (isDisabled.value || isReadonly.value) return;
      props.onClick?.({ e });

      if (radioChecked.value && !allowUncheck.value) return;

      if (radioGroup) {
        const value = radioChecked.value && allowUncheck.value ? undefined : props.value;
        radioGroup.setValue(value, { e, name: radioGroup.name });
      } else {
        const value = allowUncheck.value ? !radioChecked.value : true;
        setInnerChecked(value, { e });
      }

      // 【海外版本修复】点击后显示 Focus 外圈
      // 通过 data-value 属性精确定位被点击的 Radio，直接操作 DOM 添加 focusInput 类
      // 同时手动聚焦 label 元素，确保点击其他地方时触发 blur 事件
      nextTick(() => {
        const inputSelector = isString(props.value)
          ? `input.t-radio__former[data-value="'${props.value}'"]`
          : `input.t-radio__former[data-value="${props.value}"]`;

        const inputElement = document.querySelector(inputSelector) as HTMLElement;
        if (inputElement && inputElement.parentElement) {
          const labelElement = inputElement.parentElement;
          const radioInput = labelElement.children[1] as HTMLElement;
          if (radioInput && radioInput.classList.contains('t-radio__input')) {
            radioInput.classList.add('focusInput');
            radioInput.classList.remove('normalInput');

            // 【关键】手动聚焦 label 元素，触发原生 focus 事件
            // 这样点击其他地方时，浏览器会触发 blur 事件，调用 handleBlur 移除外圈
            labelElement.focus();
          }
        }
      });
    };

    const inputEvents = computed(() =>
      getValidAttrs({
        focus: (e: FocusEvent) => {
          handleFocus();
          (attrs.onFocus as ((e: FocusEvent) => void) | undefined)?.(e);
        },
        blur: (e: FocusEvent) => {
          handleBlur();
          (attrs.onBlur as ((e: FocusEvent) => void) | undefined)?.(e);
        },
        keydown: attrs.onKeydown,
        keyup: attrs.onKeyup,
        keypresss: attrs.onKeypresss,
      }),
    );
    const wrapperAttrs = computed(() => {
      const events = [...Object.keys(inputEvents.value), 'input', 'change'].map(
        (str) => `on${str[0].toUpperCase()}${str.slice(1)}`,
      );
      return omit(attrs, events);
    });
    /** Event END */

    // extend radioGroup disabled props
    const groupDisabled = computed(() => radioGroup?.disabled);
    const groupReadonly = computed(() => radioGroup?.readonly);
    const isDisabled = useDisabled({ afterDisabled: groupDisabled }) as ComputedRef<boolean>;
    const isReadonly = useReadonly({ afterReadonly: groupReadonly });

    // attribute
    const inputProps = computed(() => ({
      name: radioGroup ? radioGroup.name : props.name,
      checked: radioChecked.value,
      disabled: isDisabled.value,
      readonly: isReadonly.value,
      value: props.value,
    }));

    /** Style */
    const { STATUS } = useCommonClassName();
    const radioButton = inject(RadioButtonInjectionKey, undefined);
    const radioBtnName = usePrefixClass('radio-button');
    const COMPONENT_NAME = usePrefixClass('radio');
    const prefixCls = computed(() => (radioButton ? radioBtnName.value : COMPONENT_NAME.value));
    const inputClass = computed(() => [
      `${prefixCls.value}`,
      {
        [STATUS.value.checked]: inputProps.value.checked,
        [STATUS.value.disabled]: inputProps.value.disabled,
      },
    ]);
    /** Style END */

    const renderContent = useContent();

    return () => (
      <label
        ref={focusInputRef}
        class={inputClass.value}
        {...wrapperAttrs.value}
        tabindex={isDisabled.value ? undefined : '0'}
        onClick={onLabelClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          type="radio"
          class={`${prefixCls.value}__former`}
          {...inputEvents.value}
          {...inputProps.value}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabindex="-1"
          data-value={isString(props.value) ? `'${props.value}'` : props.value}
          data-allow-uncheck={allowUncheck.value || undefined}
        />
        <span class={`${prefixCls.value}__input`}>
          <span class="focusBox"></span>
        </span>
        <span class={`${prefixCls.value}__label`}>{renderContent('default', 'label')}</span>
      </label>
    );
  },
});
