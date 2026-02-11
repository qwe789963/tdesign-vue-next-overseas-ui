/**
 * Focus 状态管理 Hook (Checkbox 专用)
 *
 * @description
 * 管理 Checkbox 组件的 focus/blur 视觉反馈（Focus 外圈显示/隐藏）
 * 通过响应式数据 `isFocus` 控制 CSS 类名，进而控制 .focusBox 元素的显示
 *
 * @behavior Vue2 版本一致行为
 * - Focus 时：设置 `isFocus = true`，显示 Focus 外圈
 * - Blur 时：设置 `isFocus = false`，隐藏 Focus 外圈
 * - 外圈只在选中状态 (`.t-is-checked`) 下显示
 *
 * @author @v_genyin
 * @date 2026-02-11
 *
 * @example
 * ```typescript
 * import { useFocusHandler } from './hooks/use-focus-handler';
 *
 * const { isFocus, focusClasses, handleFocus, handleBlur } = useFocusHandler();
 *
 * <label onFocus={handleFocus} onBlur={handleBlur}>
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

  /**
   * Focus CSS 类名（计算属性，100% 复刻 Vue2 实现）
   *
   * @description
   * - `focusClass: true` → 显示 .focusBox（选中状态 + Focus）
   * - `normalClass: true` → 隐藏 .focusBox（未 Focus 或未选中）
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
   */
  const focusClasses = computed<Record<string, boolean>>(() => ({
    focusClass: isFocus.value,
    normalClass: !isFocus.value,
  }));

  /**
   * Focus 事件处理器（100% 复刻 Vue2 实现）
   *
   * @description
   * 设置 `isFocus = true`，触发计算属性更新，显示 Focus 外圈
   *
   * @remarks
   * Vue2 源码：packages/overseas/src/checkbox/checkbox.tsx
   * ```typescript
   * addFocusClass(event) {
   *   this.isFocus = true
   * }
   * ```
   */
  const handleFocus = (): void => {
    isFocus.value = true;
  };

  /**
   * Blur 事件处理器（100% 复刻 Vue2 实现）
   *
   * @description
   * 设置 `isFocus = false`，触发计算属性更新，隐藏 Focus 外圈
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
  };

  return {
    isFocus,
    focusClasses,
    handleFocus,
    handleBlur,
  };
}
