import { computed, defineComponent, toRefs, PropType } from 'vue';
import {
  BrowseIcon as TdBrowseIcon,
  DeleteIcon as TdDeleteIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  TimeFilledIcon as TdTimeFilledIcon,
  CheckIcon as TdCheckIcon,
  FileIcon as TdFileIcon,
} from 'tdesign-icons-vue-next';
import { useGlobalIcon, useTNodeJSX } from '@tdesign/shared-hooks';
import ImageViewer from '../../image-viewer';
import { CommonDisplayFileProps } from '../types';
import Button from '../../button';
import { UploadFile } from '../type';
import useDrag, { UploadDragEvents } from '../hooks/useDrag';
import { abridgeName } from '@tdesign/common-js/upload/utils';
import Loading from '../../loading';
import Link from '../../link';

/**
 * S2FileFlowList 组件属性接口
 */
export interface S2FileFlowListProps extends CommonDisplayFileProps {
  /**
   * 触发上传的回调函数
   */
  triggerUpload?: (e: MouseEvent) => void;
  /**
   * 上传文件的回调函数
   */
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  /**
   * 拖拽事件对象
   */
  dragEvents: UploadDragEvents;
  /**
   * 接受的文件类型
   */
  accept?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否批量上传
   */
  isBatchUpload?: boolean;
  /**
   * 是否支持拖拽
   */
  draggable?: boolean;
  /**
   * 是否显示缩略图
   */
  showThumb?: boolean;
  /**
   * 外部按钮文本
   */
  outerBtnText?: string;
  /**
   * 内部按钮文本
   */
  innerBtnText?: string;
  /**
   * 按钮位置
   */
  position?: 'top' | 'bottom';
}

/**
 * S2 文件上传列表组件
 * 用于海外版 s2-file 主题的文件列表展示
 */
export default defineComponent({
  name: 'UploadS2FileFlowList',

  props: {
    files: Array as PropType<S2FileFlowListProps['files']>,
    toUploadFiles: Array as PropType<S2FileFlowListProps['toUploadFiles']>,
    displayFiles: Array as PropType<S2FileFlowListProps['displayFiles']>,
    theme: String as PropType<S2FileFlowListProps['theme']>,
    abridgeName: Array as PropType<S2FileFlowListProps['abridgeName']>,
    placeholder: String,
    classPrefix: String,
    tips: [String, Function] as PropType<S2FileFlowListProps['tips']>,
    status: String as PropType<S2FileFlowListProps['status']>,
    locale: Object as PropType<S2FileFlowListProps['locale']>,
    sizeOverLimitMessage: String,
    autoUpload: Boolean,
    disabled: Boolean,
    uploading: Boolean,
    tipsClasses: String,
    errorClasses: Array as PropType<string[]>,
    placeholderClass: String,
    showUploadProgress: Boolean,
    fileListDisplay: Function as PropType<S2FileFlowListProps['fileListDisplay']>,
    onRemove: Function as PropType<S2FileFlowListProps['onRemove']>,
    imageViewerProps: Object as PropType<S2FileFlowListProps['imageViewerProps']>,
    triggerUpload: Function as PropType<S2FileFlowListProps['triggerUpload']>,
    uploadFiles: Function as PropType<S2FileFlowListProps['uploadFiles']>,
    dragEvents: Object as PropType<S2FileFlowListProps['dragEvents']>,
    accept: String,
    isBatchUpload: Boolean,
    draggable: Boolean,
    showThumb: Boolean,
    outerBtnText: String,
    innerBtnText: String,
    draggingText: String,
    draggingConj: String,
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom',
    },
  },

  setup(props: S2FileFlowListProps, { slots }) {
    const { locale, uploading, classPrefix, accept } = toRefs(props);
    const uploadPrefix = computed(() => `${classPrefix?.value}-upload`);
    const renderTNodeJSX = useTNodeJSX();

    const icons = useGlobalIcon({
      CheckIcon: TdCheckIcon,
      BrowseIcon: TdBrowseIcon,
      DeleteIcon: TdDeleteIcon,
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
      TimeFilledIcon: TdTimeFilledIcon,
      FileIcon: TdFileIcon,
    });

    const drag = useDrag(props.dragEvents || {}, accept);

    const uploadText = computed(() => {
      if (uploading?.value) return `${locale?.value?.progress?.uploadingText || 'Uploading'}`;
      return locale?.value?.triggerUploadText?.normal || 'Upload';
    });

    const innerDragEvents = computed(() => {
      const draggable = props.draggable === undefined ? true : props.draggable;
      return draggable
        ? {
            drop: drag.handleDrop,
            dragenter: drag.handleDragenter,
            dragover: drag.handleDragover,
            dragleave: drag.handleDragleave,
          }
        : {};
    });

    /**
     * 获取状态图标和文本映射
     */
    const getStatusMap = () => {
      const { CheckCircleFilledIcon, ErrorCircleFilledIcon, TimeFilledIcon } = icons;
      const iconMap = {
        success: <CheckCircleFilledIcon />,
        fail: <ErrorCircleFilledIcon />,
        progress: <Loading />,
        waiting: <TimeFilledIcon />,
      };
      const progress = locale?.value?.progress || {};
      const textMap = {
        success: progress.successText || 'Success',
        fail: progress.failText || 'Failed',
        progress: progress.uploadingText || 'Uploading',
        waiting: progress.waitingText || 'Waiting',
      };
      return {
        iconMap,
        textMap,
      };
    };

    /**
     * 判断文件是否显示缩略图
     */
    const getShowThumb = (file: UploadFile) => {
      if (typeof file.showThumb !== 'undefined') {
        return file.showThumb;
      }
      return props.showThumb;
    };

    /**
     * 渲染空状态
     */
    const renderEmpty = () => {
      return (
        <div class={`${uploadPrefix.value}__s2-empty`}>
          <p>{props.draggingText || 'Drop files here'}</p>
          <i class={`${uploadPrefix.value}__s2-or`}>{props.draggingConj || 'or'}</i>
          {slots.outerBtnTextTrigger?.() || (
            <Button
              size="large"
              variant="outline"
              content={props.outerBtnText || 'Select files'}
              disabled={props.disabled}
              onClick={props.triggerUpload}
            />
          )}
        </div>
      );
    };

    /**
     * 渲染单个文件项
     */
    const renderImgItem = (file: UploadFile, index: number) => {
      const { iconMap, textMap } = getStatusMap();
      const { DeleteIcon, CheckIcon, FileIcon, BrowseIcon } = icons;
      const fileName = props.abridgeName && file.name ? abridgeName(file.name, ...props.abridgeName) : file.name;

      return (
        <li class={`${uploadPrefix.value}__s2-item`} key={`${file.name}-${index}-${file.percent}-${file.status}`}>
          <div class={`${uploadPrefix.value}__s2-content`}>
            {['fail', 'progress'].includes(file.status || '') && (
              <div class={`${uploadPrefix.value}__s2-status-wrap ${uploadPrefix.value}__${props.theme}-${file.status}`}>
                {iconMap[file.status as 'fail' | 'progress']}
                <p>
                  {textMap[file.status as 'fail' | 'progress']}
                  {file.status === 'progress' ? ` ${file.percent}%` : ''}
                </p>
              </div>
            )}
            {(['waiting', 'success'].includes(file.status || '') || (!file.status && file.url)) &&
              (getShowThumb(file) ? (
                <div class={`${uploadPrefix.value}__s2-mask`}>
                  <img
                    class={`${uploadPrefix.value}__s2-image`}
                    src={file.url || '//tdesign.gtimg.com/tdesign-default-img.png'}
                  />
                  {file.url && (
                    <span class={`${uploadPrefix.value}__s2-mask-img`}>
                      <ImageViewer
                        images={props.displayFiles?.map((t) => t.url || '') || []}
                        defaultIndex={index}
                        v-slots={{
                          trigger: ({ open }: any) => (
                            <BrowseIcon
                              onClick={() => {
                                open();
                              }}
                            />
                          ),
                        }}
                      />
                    </span>
                  )}
                </div>
              ) : (
                <span class={`${uploadPrefix.value}__s2-file-icon`}>
                  <FileIcon />
                </span>
              ))}
            <div class={`${uploadPrefix.value}__s2-name`}>
              <p class={`${uploadPrefix.value}__s2-filename`}>
                {file.url ? (
                  <Link
                    href={file.url}
                    target="_blank"
                    hover="color"
                    size="small"
                    class={`${uploadPrefix.value}__single-name`}
                  >
                    {fileName}
                  </Link>
                ) : (
                  <span class={`${uploadPrefix.value}__single-name`}>{fileName}</span>
                )}
              </p>
              {(file.status === 'success' || (!file.status && file.url)) && (
                <p class={!props.showThumb ? `${uploadPrefix.value}__s2-tip` : ''}>
                  <CheckIcon />
                  <span>{textMap.success}!</span>
                </p>
              )}
            </div>
            {!props.disabled && (
              <span
                class={`${uploadPrefix.value}__s2-mask-item ${uploadPrefix.value}__delete`}
                onClick={(e: MouseEvent) => props.onRemove?.({ e, index, file })}
              >
                <DeleteIcon />
              </span>
            )}
          </div>
        </li>
      );
    };

    /**
     * 渲染图片列表
     */
    const renderImageList = () => {
      const customList = renderTNodeJSX('fileListDisplay', {
        params: {
          files: props.displayFiles,
          dragEvents: innerDragEvents.value,
        },
      });

      return (
        <div>
          {props.position === 'top' &&
            (slots.default?.() || (
              <Button
                size="large"
                variant="outline"
                class={`${uploadPrefix.value}__s2-button`}
                content={props.innerBtnText || uploadText.value}
                disabled={props.disabled}
                onClick={props.triggerUpload}
              />
            ))}
          {customList || (
            <ul class={`${uploadPrefix.value}__s2-list clearfix`}>
              {props.displayFiles?.map((file, index) => renderImgItem(file, index))}
            </ul>
          )}
          {props.position === 'bottom' &&
            (slots.default?.() || (
              <Button
                size="large"
                variant="outline"
                class={`${uploadPrefix.value}__s2-button`}
                content={props.innerBtnText || uploadText.value}
                disabled={props.disabled}
                onClick={props.triggerUpload}
              />
            ))}
        </div>
      );
    };

    return () => (
      <div class={`${uploadPrefix.value}__s2`}>
        {props.displayFiles && props.displayFiles.length > 0 ? (
          renderImageList()
        ) : (
          <div
            onDrop={innerDragEvents.value.drop}
            onDragenter={innerDragEvents.value.dragenter}
            onDragover={innerDragEvents.value.dragover}
            onDragleave={innerDragEvents.value.dragleave}
          >
            {renderEmpty()}
          </div>
        )}
      </div>
    );
  },
});
