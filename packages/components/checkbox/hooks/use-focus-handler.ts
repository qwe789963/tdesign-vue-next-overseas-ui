/**
 * Focus 状态管理 Hook (Checkbox 专用)
 *
 * @description
 * 管理 Checkbox 组件的 focus/blur 视觉反馈（Focus 外圈显示/隐藏）
 * 通过响应式数据 `isFocus` 控制 CSS 类名，进而控制 .focusBox 元素的显示
 *
 * @behavior 增强的 Vue2 版本行为
 * - 键盘导航（Tab 键）：显示 Focus 外圈 ✅
 * - 鼠标点击：不显示 Focus 外圈（用户已有视觉反馈）✅
 * - Blur 时：隐藏 Focus 外圈 ✅
 * - 外圈只在选中状态 (`.t-is-checked`) 下显示
 *
 * @author @v_genyin
 * @date 2026-02-11
 *
 * @example
 * ```typescript
 * import { useFocusHandler } from './hooks/use-focus-handler';
 *
 * const { isFocus, focusClasses, handleFocus, handleBlur, handleMouseDown } = useFocusHandler();
 *
 * <label onFocus={handleFocus} onBlur={handleBlur} onMousedown={handleMouseDown}>
 *   <input onFocus={handleFocus} onBlur={handleBlur} />
 *   <span class={focusClasses.value}>
 *     <span class="focusBox"></span>
 *   </span>
 * </label>
 * ```
 */

import { ref, computed, Ref, ComputedRef } from 'vue';

/**
 * useFocusHandler Hook 返回值
 */
export interface UseFocusHandlerReturn {
  /** Focus 状态（响应式数据） */
  isFocus: Ref<boolean>;
  /** Focus CSS 类名（计算属性） */
  focusClasses: ComputedRef<Record<string, boolean>>;
  /** Focus 事件处理器 */
  handleFocus: () => void;
  /** Blur 事件处理器 */
  handleBlur: () => void;
  /** MouseDown 事件处理器（用于阻止鼠标点击显示 focus 外圈） */
  handleMouseDown: () => void;
}

/**
 * Focus 状态管理 Hook
 *
 * @returns {UseFocusHandlerReturn} 包含状态、类名和事件处理器的对象
 *
 * @public
 */
export function useFocusHandler(): UseFocusHandlerReturn {
  /** Focus 状态（响应式数据，100% 复刻 Vue2 实现） */
  const isFocus = ref<boolean>(false);

  /** 是否由鼠标操作触发（用于区分键盘导航和鼠标点击） */
  const isMouseOperation = ref<boolean>(false);

  /**
   * Focus CSS 类名（计算属性，100% 复刻 Vue2 实现）
   *
   * @description
   * - `focusClass: true` → 显示 .focusBox（选中状态 + Focus + 非鼠标操作）
   * - `normalClass: true` → 隐藏 .focusBox（未 Focus 或鼠标操作）
   *
   * @remarks
   * Vue2 源码：packages/overseas/src/checkbox/checkbox.tsx
   * ```typescript
   * focusClasses(): ClassName {
   *   return [
   *     `${this.componentName}__input`,
   *     {
   *       focusClass: this.isFocus,
   *       normalClass: !this.isFocus,
   *     },
   *   ];
   * }
   * ```
   *
   * @enhancement
   * 增加鼠标操作判断：鼠标点击时不显示 focus 外圈，提升 UX
   */
  const focusClasses = computed<Record<string, boolean>>(() => ({
    focusClass: isFocus.value && !isMouseOperation.value, // 🔥 关键：鼠标操作时不显示
    normalClass: !isFocus.value || isMouseOperation.value, // 🔥 关键：鼠标操作时隐藏
  }));

  /**
   * Focus 事件处理器（增强版）
   *
   * @description
   * 设置 `isFocus = true`，触发计算属性更新
   * - 如果是键盘导航：显示 Focus 外圈 ✅
   * - 如果是鼠标点击：不显示 Focus 外圈（`isMouseOperation` 为 true）✅
   *
   * @remarks
   * Vue2 源码基础上增加了鼠标/键盘操作区分
   */
  const handleFocus = (): void => {
    isFocus.value = true;
    // 注意：不重置 isMouseOperation，让 mousedown 的标记生效
  };

  /**
   * Blur 事件处理器（100% 复刻 Vue2 实现）
   *
   * @description
   * 设置 `isFocus = false`，触发计算属性更新，隐藏 Focus 外圈
   * 同时重置鼠标操作标记
   *
   * @remarks
   * Vue2 源码：packages/overseas/src/checkbox/checkbox.tsx
   * ```typescript
   * cancelFocusClass() {
   *   this.isFocus = false
   * }
   * ```
   */
  const handleBlur = (): void => {
    isFocus.value = false;
    isMouseOperation.value = false; // 重置鼠标操作标记
  };

  /**
   * MouseDown 事件处理器（新增，用于 UX 优化）
   *
   * @description
   * 在鼠标按下时标记为鼠标操作，阻止显示 focus 外圈
   * 这样用户通过鼠标点击时不会看到外圈，只有 Tab 键导航时才显示
   *
   * @remarks
   * - 必须在 `onFocus` 之前触发（mousedown → focus）
   * - 在 `onBlur` 时重置标记
   *
   * @example
   * ```tsx
   * <label onMousedown={handleMouseDown} onFocus={handleFocus}>
   *   <input />
   * </label>
   * ```
   */
  const handleMouseDown = (): void => {
    isMouseOperation.value = true;
  };

  return {
    isFocus,
    focusClasses,
    handleFocus,
    handleBlur,
    handleMouseDown,
  };
}
