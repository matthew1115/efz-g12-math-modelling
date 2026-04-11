import { cn } from '@/libs/cn'
import type { ComponentProps, ParentComponent } from 'solid-js'
import { splitProps } from 'solid-js'

export const Card = (props: ComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cn(
        [
          'bg-card text-card-foreground group/card ring-border flex flex-col rounded-xl ring-1',
          'has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0',
          '*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
          'gap-6 py-6',
        ],
        local.class,
      )}
      {...rest}
      data-slot="card"
    />
  )
}

export const CardHeader = (props: ComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cn(
        [
          '@container/card-header grid auto-rows-min items-start gap-1 px-6 group-data-[size=sm]/card:px-4',
          'has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
        ],
        local.class,
      )}
      {...rest}
      data-slot="card-header"
    />
  )
}

export const CardTitle: ParentComponent<ComponentProps<'h1'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <h1
      class={cn(
        'font-heading text-xl leading-snug font-medium group-data-[size=sm]/card:text-base',
        local.class,
      )}
      {...rest}
      data-slot="card-title"
    />
  )
}

export const CardDescription: ParentComponent<ComponentProps<'h3'>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <h3
      class={cn(
        'text-muted-foreground text-base group-data-[size=sm]/card:text-sm',
        local.class,
      )}
      {...rest}
      data-slot="card-description"
    />
  )
}

export const CardContent = (props: ComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cn('px-6 group-data-[size=sm]/card:px-4', local.class)}
      {...rest}
      data-slot="card-content"
    />
  )
}

export const CardFooter = (props: ComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cn(
        'bg-muted/50 flex items-center rounded-b-xl border-t p-6 group-data-[size=sm]/card:p-4',
        local.class,
      )}
      {...rest}
      data-slot="card-footer"
    />
  )
}
