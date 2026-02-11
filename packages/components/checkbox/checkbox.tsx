import { defineComponent, ref, toRefs, inject, watch, computed, ComputedRef } from 'vue';
import { isString } from 'lodash-es';
import props from './props';
import {
  useVModel,
  useRipple,
  useContent,
  useDisabled,
  useReadonly,
  usePrefixClass,
  useCommonClassName,
} from '@tdesign/shared-hooks';

import { CheckboxGroupInjectionKey } from './constants';
import useCheckboxLazyLoad from './hooks/useCheckboxLazyLoad';
import useKeyboardEvent from './hooks/useKeyboardEvent';
import { useFocusHandler } from './hooks/use-focus-handler';

export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...props,
    needRipple: Boolean,
    stopLabelTrigger: Boolean,
    index: Number,
    // 传递给 Checkbox 组件额外的数据
    data: Object,
  },
  setup(props) {
    const labelRef = ref<HTMLElement>();
    if (props.needRipple) {
      useRipple(labelRef);
    }
    const { STATUS } = useCommonClassName();

    const { checked, modelValue, lazyLoad } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const checkboxGroupData = inject(CheckboxGroupInjectionKey, undefined);

    /**
     * Warn: Do not use computed to set tName,
     * otherwise checkbox group will render all checkbox items on every checked or unchecked.
     */
    const tName = ref<string>();
    watch(
      () => [props.name, checkboxGroupData?.value.name].join('_'),
      () => {
        const name = props.name || checkboxGroupData?.value.name;
        if (name) {
          tName.value = name;
        }
      },
      { immediate: true },
    );

    // checked
    const tChecked = ref(false);
    const getChecked = () => {
      const { value, checkAll } = props;
      if (checkAll) return checkboxGroupData?.value.isCheckAll;
      return checkboxGroupData?.value ? checkboxGroupData.value.checkedValues.includes(value) : innerChecked.value;
    };
    watch(
      () => [
        innerChecked.value,
        checkboxGroupData?.value.isCheckAll,
        checkboxGroupData?.value.checkedValues?.join(','),
      ],
      () => {
        tChecked.value = getChecked();
      },
      { immediate: true },
    );

    //  Checkbox.disabled > CheckboxGroup.disabled > Form.disabled
    const beforeDisabled = computed(() => {
      if (!props.checkAll && !tChecked.value && checkboxGroupData?.value.maxExceeded) {
        return true;
      }
      return null;
    });
    const afterDisabled = computed(() => {
      return checkboxGroupData?.value.disabled;
    });
    const isDisabled = useDisabled({ beforeDisabled, afterDisabled }) as ComputedRef<boolean>;

    //  Checkbox.readonly > CheckboxGroup.readonly > Form.readonly
    const afterReadonly = computed(() => {
      return checkboxGroupData?.value.readonly;
    });
    const isReadonly = useReadonly({ afterReadonly });

    const tIndeterminate = ref(false);
    watch(
      () => [props.checkAll, props.indeterminate, checkboxGroupData?.value.indeterminate],
      () => {
        tIndeterminate.value = props.checkAll ? checkboxGroupData?.value.indeterminate : props.indeterminate;
      },
      { immediate: true },
    );

    /** update labelClasses, do not use computed to get labelClasses */
    const COMPONENT_NAME = usePrefixClass('checkbox');
    const labelClasses = ref({});
    watch(
      [tChecked, isDisabled, tIndeterminate],
      () => {
        labelClasses.value = [
          `${COMPONENT_NAME.value}`,
          {
            [STATUS.value.checked]: tChecked.value,
            [STATUS.value.disabled]: isDisabled.value,
            [STATUS.value.indeterminate]: tIndeterminate.value,
          },
        ];
      },
      { immediate: true },
    );

    const handleChange = (e: Event) => {
      if (isReadonly.value) return;
      const checked = !tChecked.value;
      setInnerChecked(checked, { e });
      if (checkboxGroupData?.value.handleCheckboxChange) {
        checkboxGroupData.value.onCheckedChange({ checked, checkAll: props.checkAll, e, option: props });
      }
    };

    const renderContent = useContent();

    const handleLabelClick = (e: MouseEvent) => {
      // 在 Tree、Cascader 等组件中使用  阻止 label触发 checked 与非叶子节点的 expand 冲突
      if (props.stopLabelTrigger) e.preventDefault();
    };

    const { showCheckbox } = useCheckboxLazyLoad(labelRef, lazyLoad);
    const { onCheckboxFocus, onCheckboxBlur } = useKeyboardEvent(handleChange);

    // 🌐 海外版本 Focus 视觉反馈 (复刻 Vue2 实现)
    const { inputRef: focusInputRef, handleFocus, handleBlur } = useFocusHandler();

    return () => {
      const titleAttr = isString(props.title) && props.title ? props.title : null;
      return (
        <label
          ref={(el) => {
            labelRef.value = el as HTMLElement;
            focusInputRef.value = el as HTMLLabelElement;
          }}
          class={labelClasses.value}
          tabindex={isDisabled.value ? undefined : '0'}
          onFocus={(e) => {
            onCheckboxFocus(e);
            handleFocus();
          }}
          onBlur={(e) => {
            onCheckboxBlur(e);
            handleBlur();
          }}
          onClick={handleLabelClick}
          title={titleAttr}
        >
          {!showCheckbox.value
            ? null
            : [
                <input
                  type="checkbox"
                  tabindex="-1"
                  class={`${COMPONENT_NAME.value}__former`}
                  disabled={isDisabled.value}
                  readonly={isReadonly.value}
                  indeterminate={tIndeterminate.value}
                  name={tName.value}
                  value={props.value ? props.value : undefined}
                  checked={tChecked.value}
                  onChange={handleChange}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                  key="input"
                ></input>,
                <span
                  class={`${COMPONENT_NAME.value}__input`}
                  key="input-span"
                  onClick={props.stopLabelTrigger && handleChange} // stopLabelTrigger 情况下，仍需保证真正的 input 触发 change
                >
                  <span class="focusBox"></span>
                </span>,
                <span class={`${COMPONENT_NAME.value}__label`} key="label">
                  {renderContent('default', 'label')}
                </span>,
              ]}
        </label>
      );
    };
  },
});
