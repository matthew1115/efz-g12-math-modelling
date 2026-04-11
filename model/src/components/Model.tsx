import { Chart } from './Chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './shadcn-solid/Card'
import { evaluate, neverColonize, porportionalColonize } from '@/model/main'
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from './solid-ui/Switch'
import { createMemo, createSignal } from 'solid-js'

export const Model = () => {
  const [baseLogisticGrowth, setBaseLogisticGrowth] = createSignal(true)
  const [colonyLogisticGrowth, setColonyLogisticGrowth] = createSignal(true)

  const neverColonizeResult = createMemo(() => {
    return evaluate(
      {
        colonizationPenalty: 5,
        baseCapacity: baseLogisticGrowth() ? 10 : undefined,
        colonyCapacity: colonyLogisticGrowth() ? 5 : undefined,
      },
      neverColonize,
      100,
    )
  })

  const proportionalColonizeResult = createMemo(() => {
    return evaluate(
      {
        colonizationPenalty: 5,
        baseCapacity: baseLogisticGrowth() ? 10 : undefined,
        colonyCapacity: colonyLogisticGrowth() ? 5 : undefined,
      },
      porportionalColonize(1 / 2),
      100,
    )
  })

  const data = createMemo(() => {
    return [
      {
        label: 'Never Colonize',
        data: neverColonizeResult().map((state, index) => ({
          x: index,
          y: state.baseProductivity + state.colonyProductivity,
        })),
        borderWidth: 1,
      },
      {
        label: 'Proportional Colonize',
        data: proportionalColonizeResult().map((state, index) => ({
          x: index,
          y: state.baseProductivity + state.colonyProductivity,
        })),
        borderWidth: 1,
      },
    ]
  })

  return (
    <Card class="w-2xl max-w-[90vw]" slot="preview">
      <CardHeader>
        <CardTitle>Model</CardTitle>
        <CardDescription>Generation = 1/12 of Doubling Period</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <Chart data={data()} />
      </CardContent>
      <CardFooter>
        <details>
          <summary class="font-semibold">Parameters</summary>
          <section class="m-2 mt-6 flex flex-col gap-4">
            <Switch
              class="flex items-center space-x-2"
              checked={baseLogisticGrowth()}
              onChange={setBaseLogisticGrowth}
            >
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchLabel>Logistic Base Growth</SwitchLabel>
            </Switch>
            <Switch
              class="flex items-center space-x-2"
              checked={colonyLogisticGrowth()}
              onChange={setColonyLogisticGrowth}
            >
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchLabel>Logistic Colony Growth</SwitchLabel>
            </Switch>
          </section>
        </details>
      </CardFooter>
    </Card>
  )
}
