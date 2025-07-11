'use client';

import classNames from 'classnames';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import * as React from 'react';
import { Theme } from '../../theme';
import { Text } from '../text';
import { tooltipPropDefs } from './tooltip.props';

import type { GetPropDefTypes } from '../../helpers';

type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs>;
interface TooltipProps
  extends React.ComponentProps<typeof TooltipPrimitive.Root>,
    Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, 'content'>,
    TooltipOwnProps {
  // TODO: See if we can automate making prop defs with `required: true` non nullable
  content: NonNullable<TooltipOwnProps['content']>;
  container?: React.ComponentProps<typeof TooltipPrimitive.Portal>['container'];
}

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    className,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
    content,
    container,
    forceMount,
    type = tooltipPropDefs.type.default,
    ...tooltipContentProps
  } = props;

  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [triggerElement, setTriggerElement] = React.useState<HTMLButtonElement | null>(null);

  React.useLayoutEffect(() => {
    if (type === 'overflow' && triggerElement) {
      const updateTriggerOverflow = () => {
        const isOverflowing =
          triggerElement.offsetWidth < triggerElement.scrollWidth ||
          triggerElement.offsetHeight < triggerElement.scrollHeight;

        setIsOverflowing(isOverflowing);
      };

      updateTriggerOverflow();

      const resizeObserver = new ResizeObserver(() => {
        updateTriggerOverflow();
      });
      resizeObserver.observe(triggerElement);

      const mutationObserver = new MutationObserver(() => {
        updateTriggerOverflow();
      });
      mutationObserver.observe(triggerElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    } else {
      setIsOverflowing(false);
    }
  }, [triggerElement, type]);

  const rootProps = {
    open: open !== undefined ? (type === 'overflow' ? open && isOverflowing : open) : open,
    defaultOpen:
      defaultOpen !== undefined ? (type === 'overflow' ? defaultOpen && isOverflowing : defaultOpen) : defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
  };

  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger
        asChild
        ref={(e) => {
          setTriggerElement(e as HTMLButtonElement);
        }}
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={container} forceMount={forceMount}>
        {(type === 'overflow' ? isOverflowing : true) ? (
          <Theme asChild>
            <TooltipPrimitive.Content
              sideOffset={4}
              collisionPadding={10}
              {...tooltipContentProps}
              className={classNames('fui-TooltipContent', className)}
            >
              <Text as="p" className="fui-TooltipText" size="1">
                {content}
              </Text>
              <TooltipPrimitive.Arrow className="fui-TooltipArrow" />
            </TooltipPrimitive.Content>
          </Theme>
        ) : null}
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
Tooltip.displayName = 'Tooltip';

export { Tooltip };
export type { TooltipProps };
