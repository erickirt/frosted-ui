'use client';

import classNames from 'classnames';
import { ContextMenu as ContextMenuPrimitive, Slot } from 'radix-ui';
import * as React from 'react';
import { ThickCheckIcon, ThickChevronRightIcon } from '../../icons';
import { Theme, useThemeContext } from '../../theme';
import { ScrollArea } from '../scroll-area';
import {
  contextMenuCheckboxItemPropDefs,
  contextMenuContentPropDefs,
  contextMenuItemPropDefs,
} from './context-menu.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

interface ContextMenuRootProps extends React.ComponentProps<typeof ContextMenuPrimitive.Root> {}
const ContextMenuRoot: React.FC<ContextMenuRootProps> = (props) => <ContextMenuPrimitive.Root {...props} />;
ContextMenuRoot.displayName = 'ContextMenuRoot';

interface ContextMenuTriggerProps extends Omit<React.ComponentProps<typeof ContextMenuPrimitive.Trigger>, 'asChild'> {}
const ContextMenuTrigger = (props: ContextMenuTriggerProps) => <ContextMenuPrimitive.Trigger {...props} asChild />;
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

type ContextMenuContentOwnProps = GetPropDefTypes<typeof contextMenuContentPropDefs>;
type ContextMenuContentContextValue = ContextMenuContentOwnProps;
const ContextMenuContentContext = React.createContext<ContextMenuContentContextValue>({});
interface ContextMenuContentProps
  extends PropsWithoutColor<typeof ContextMenuPrimitive.Content>,
    ContextMenuContentContextValue {
  container?: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuContent = (props: ContextMenuContentProps) => {
  const themeContext = useThemeContext();
  const {
    className,
    children,
    size = contextMenuContentPropDefs.size.default,
    color = contextMenuContentPropDefs.color.default,
    variant = contextMenuContentPropDefs.variant.default,
    container,
    forceMount,
    ...contentProps
  } = props;
  const resolvedColor = color ?? themeContext.accentColor;
  return (
    <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <ContextMenuPrimitive.Content
          data-accent-color={resolvedColor}
          alignOffset={-Number(size) * 4}
          collisionPadding={10}
          {...contentProps}
          className={classNames(
            'fui-PopperContent',
            'fui-BaseMenuContent',
            'fui-ContextMenuContent',
            `fui-variant-${variant}`,
            className,
            `fui-r-size-${size}`,
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('fui-BaseMenuViewport', 'fui-ContextMenuViewport')}>
              <ContextMenuContentContext.Provider
                value={React.useMemo(() => ({ size, color: resolvedColor, variant }), [size, resolvedColor, variant])}
              >
                {children}
              </ContextMenuContentContext.Provider>
            </div>
          </ScrollArea>
        </ContextMenuPrimitive.Content>
      </Theme>
    </ContextMenuPrimitive.Portal>
  );
};
ContextMenuContent.displayName = 'ContextMenuContent';

interface ContextMenuLabelProps extends PropsWithoutColor<typeof ContextMenuPrimitive.Label> {}
const ContextMenuLabel = (props: ContextMenuLabelProps) => (
  <ContextMenuPrimitive.Label
    {...props}
    className={classNames('fui-BaseMenuLabel', 'fui-ContextMenuLabel', props.className)}
  />
);
ContextMenuLabel.displayName = 'ContextMenuLabel';

type ContextMenuItemOwnProps = GetPropDefTypes<typeof contextMenuItemPropDefs>;
interface ContextMenuItemProps extends PropsWithoutColor<typeof ContextMenuPrimitive.Item>, ContextMenuItemOwnProps {}
const ContextMenuItem = (props: ContextMenuItemProps) => {
  const { className, children, color = contextMenuItemPropDefs.color.default, shortcut, ...itemProps } = props;
  return (
    <ContextMenuPrimitive.Item
      data-accent-color={color}
      {...itemProps}
      className={classNames('fui-reset', 'fui-BaseMenuItem', 'fui-ContextMenuItem', className)}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {shortcut && <div className="fui-BaseMenuShortcut fui-ContextMenuShortcut">{shortcut}</div>}
    </ContextMenuPrimitive.Item>
  );
};
ContextMenuItem.displayName = 'ContextMenuItem';

interface ContextMenuGroupProps extends React.ComponentProps<typeof ContextMenuPrimitive.Group> {}
const ContextMenuGroup = (props: ContextMenuGroupProps) => (
  <ContextMenuPrimitive.Group
    {...props}
    className={classNames('fui-BaseMenuGroup', 'fui-ContextMenuGroup', props.className)}
  />
);
ContextMenuGroup.displayName = 'ContextMenuGroup';

interface ContextMenuRadioGroupProps extends React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup> {}
const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <ContextMenuPrimitive.RadioGroup
    {...props}
    className={classNames('fui-BaseMenuRadioGroup', 'fui-ContextMenuRadioGroup', props.className)}
  />
);
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

interface ContextMenuRadioItemProps extends React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> {}
const ContextMenuRadioItem = (props: ContextMenuRadioItemProps) => {
  const { children, className, ...itemProps } = props;
  return (
    <ContextMenuPrimitive.RadioItem
      {...itemProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuRadioItem',
        'fui-ContextMenuItem',
        'fui-ContextMenuRadioItem',
        className,
      )}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ContextMenuPrimitive.ItemIndicator className="fui-BaseMenuItemIndicator fui-ContextMenuItemIndicator">
        <ThickCheckIcon className="fui-BaseMenuItemIndicatorIcon fui-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  );
};
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

type ContextMenuCheckboxItemOwnProps = GetPropDefTypes<typeof contextMenuCheckboxItemPropDefs>;
interface ContextMenuCheckboxItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>,
    ContextMenuCheckboxItemOwnProps {}
const ContextMenuCheckboxItem = (props: ContextMenuCheckboxItemProps) => {
  const { children, className, shortcut, ...itemProps } = props;
  return (
    <ContextMenuPrimitive.CheckboxItem
      {...itemProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuCheckboxItem',
        'fui-ContextMenuItem',
        'fui-ContextMenuCheckboxItem',
        className,
      )}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ContextMenuPrimitive.ItemIndicator className="fui-BaseMenuItemIndicator fui-ContextMenuItemIndicator">
        <ThickCheckIcon className="fui-BaseMenuItemIndicatorIcon fui-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
      {shortcut && <div className="fui-BaseMenuShortcut fui-ContextMenuShortcut">{shortcut}</div>}
    </ContextMenuPrimitive.CheckboxItem>
  );
};
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

interface ContextMenuSubProps extends React.ComponentProps<typeof ContextMenuPrimitive.Sub> {}
const ContextMenuSub: React.FC<ContextMenuSubProps> = (props) => <ContextMenuPrimitive.Sub {...props} />;
ContextMenuSub.displayName = 'ContextMenuSub';

interface ContextMenuSubTriggerProps extends React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> {}
const ContextMenuSubTrigger = (props: ContextMenuSubTriggerProps) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <ContextMenuPrimitive.SubTrigger
      {...subTriggerProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuSubTrigger',
        'fui-ContextMenuItem',
        'fui-ContextMenuSubTrigger',
        className,
      )}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ThickChevronRightIcon className="fui-BaseMenuSubTriggerIcon fui-ContextMenuSubTriggerIcon" />
    </ContextMenuPrimitive.SubTrigger>
  );
};
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

interface ContextMenuSubContentProps extends React.ComponentProps<typeof ContextMenuPrimitive.SubContent> {
  container?: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuSubContent = (props: ContextMenuSubContentProps) => {
  const { className, children, container, forceMount, ...contentProps } = props;
  const { size, color, variant } = React.useContext(ContextMenuContentContext);
  return (
    <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <ContextMenuPrimitive.SubContent
          data-accent-color={color}
          alignOffset={-Number(size) * 4}
          collisionPadding={10}
          {...contentProps}
          className={classNames(
            'fui-PopperContent',
            'fui-BaseMenuContent',
            'fui-BaseMenuSubContent',
            'fui-ContextMenuContent',
            'fui-ContextMenuSubContent',
            `fui-variant-${variant}`,
            className,
            `fui-r-size-${size}`,
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('fui-BaseMenuViewport', 'fui-ContextMenuViewport')}>{children}</div>
          </ScrollArea>
        </ContextMenuPrimitive.SubContent>
      </Theme>
    </ContextMenuPrimitive.Portal>
  );
};
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

interface ContextMenuSeparatorProps extends React.ComponentProps<typeof ContextMenuPrimitive.Separator> {}
const ContextMenuSeparator = (props: ContextMenuSeparatorProps) => (
  <ContextMenuPrimitive.Separator
    {...props}
    className={classNames('fui-BaseMenuSeparator', 'fui-ContextMenuSeparator', props.className)}
  />
);
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export {
  ContextMenuCheckboxItem as CheckboxItem,
  ContextMenuContent as Content,
  ContextMenuGroup as Group,
  ContextMenuItem as Item,
  ContextMenuLabel as Label,
  ContextMenuRadioGroup as RadioGroup,
  ContextMenuRadioItem as RadioItem,
  ContextMenuRoot as Root,
  ContextMenuSeparator as Separator,
  ContextMenuSub as Sub,
  ContextMenuSubContent as SubContent,
  ContextMenuSubTrigger as SubTrigger,
  ContextMenuTrigger as Trigger,
};

export type {
  ContextMenuCheckboxItemProps as CheckboxItemProps,
  ContextMenuContentProps as ContentProps,
  ContextMenuGroupProps as GroupProps,
  ContextMenuItemProps as ItemProps,
  ContextMenuLabelProps as LabelProps,
  ContextMenuRadioGroupProps as RadioGroupProps,
  ContextMenuRadioItemProps as RadioItemProps,
  ContextMenuRootProps as RootProps,
  ContextMenuSeparatorProps as SeparatorProps,
  ContextMenuSubContentProps as SubContentProps,
  ContextMenuSubProps as SubProps,
  ContextMenuSubTriggerProps as SubTriggerProps,
  ContextMenuTriggerProps as TriggerProps,
};
