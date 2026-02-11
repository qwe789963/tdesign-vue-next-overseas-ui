/**
 * Focus 状态管理 Hook (Checkbox 专用)
 *
 * @description
 * 管理 Checkbox 组件的 focus/blur 视觉反馈（Focus 外圈显示/隐藏）
 * 通过添加/移除 CSS 类名控制 .focusBox 元素的显示
 *
 * @behavior Vue2 版本一致行为
 * - 鼠标点击：显示 Focus 外圈（点击时 label 获得焦点）
 * - Tab 键聚焦：显示 Focus 外圈（键盘聚焦时 label 获得焦点）
 * - 失焦（Tab 切走/点击其他区域）：隐藏 Focus 外圈
 * - 鼠标移开（但未失焦）：Focus 外圈保持显示（与 Vue2 一致）
 *
 * @author @v_genyin
 * @date 2026-02-11
 *
 * @example
 * ```typescript
 * import { useFocusHandler } from './hooks/use-focus-handler';
 *
 * const { inputRef, handleFocus, handleBlur } = useFocusHandler();
 *
 * <label ref={inputRef} onFocus={handleFocus} onBlur={handleBlur}>
 *   <input onFocus={handleFocus} onBlur={handleBlur} />
 *   <span class="t-checkbox__input">
 *     <span class="focusBox"></span>
 *   </span>
 * </label>
 * ```
 */

import { ref, Ref } from 'vue';

/**
 * useFocusHandler Hook 返回值
 */
export interface UseFocusHandlerReturn {
  /** label 元素的 ref 引用（命名为 inputRef 与使用方一致） */
  inputRef: Ref<HTMLLabelElement | null>;
  /** Focus 事件处理器 */
  handleFocus: () => void;
  /** Blur 事件处理器 */
  handleBlur: () => void;
}

/**
 * Focus 状态管理 Hook
 *
 * @returns {UseFocusHandlerReturn} 包含 ref 和事件处理器的对象
 *
 * @public
 */
export function useFocusHandler(): UseFocusHandlerReturn {
  /** label 元素的 ref 引用 */
  const focusInputRef = ref<HTMLLabelElement | null>(null);

  /**
   * Focus 事件处理器（100% 复刻 Vue2 实现，包括"神秘"的循环）
   *
   * @description
   * - 为 .t-checkbox__input 元素添加 'focusClass' 类名
   * - 移除 'normalClass' 类名
   * - 触发 .focusBox 元素显示 (通过 CSS display: inline-block)
   *
   * @remarks
   * - **完全复刻 Vue2 源码**：packages/overseas/src/checkbox/checkbox.tsx
   * - 包括看似"无意义"的循环（实际上可能是为了处理某种竞态条件）
   * - Vue2 实现：this.$el.children[1].classList.add('focusClass')
   *
   * @example
   * ```tsx
   * <label onFocus={handleFocus} tabindex="0">
   *   <input onFocus={handleFocus} />
   * </label>
   * ```
   */
  const handleFocus = (): void => {
    if (!focusInputRef.value) {
      return;
    }

    // 🔥 复刻 Vue2 的"神秘"循环（虽然看起来无意义，但可能有副作用）
    const checkboxDom = document.getElementsByClassName('t-checkbox__former');

    for (let i = 0; i < checkboxDom.length; i++) {
      // Vue2 实现：每次循环都操作同一个元素 this.$el.children[1]
      const checkboxInput = focusInputRef.value.children[1] as HTMLElement;
      if (!checkboxInput) {
        continue;
      }

      checkboxInput.classList.add('focusClass');
      checkboxInput.classList.remove('normalClass');
    }
  };

  /**
   * Blur 事件处理器（100% 复刻 Vue2 实现，包括"神秘"的循环）
   *
   * @description
   * - 为 .t-checkbox__input 元素添加 'normalClass' 类名
   * - 移除 'focusClass' 类名
   * - 触发 .focusBox 元素隐藏 (通过 CSS display: none)
   *
   * @remarks
   * - **完全复刻 Vue2 源码**：packages/overseas/src/checkbox/checkbox.tsx
   * - 包括看似"无意义"的循环（实际上可能是为了处理某种竞态条件）
   * - Vue2 实现：this.$el.children[1].classList.add('normalClass')
   *
   * @example
   * ```tsx
   * <label onBlur={handleBlur}>
   *   <input onBlur={handleBlur} />
   * </label>
   * ```
   */
  const handleBlur = (): void => {
    if (!focusInputRef.value) {
      return;
    }

    // 🔥 复刻 Vue2 的"神秘"循环（虽然看起来无意义，但可能有副作用）
    const checkboxDom = document.getElementsByClassName('t-checkbox__former');

    for (let i = 0; i < checkboxDom.length; i++) {
      // Vue2 实现：每次循环都操作同一个元素 this.$el.children[1]
      const checkboxInput = focusInputRef.value.children[1] as HTMLElement;
      if (!checkboxInput) {
        continue;
      }

      checkboxInput.classList.add('normalClass');
      checkboxInput.classList.remove('focusClass');
    }
  };

  return {
    inputRef: focusInputRef,
    handleFocus,
    handleBlur,
  };
}
