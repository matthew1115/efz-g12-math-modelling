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

export const Model = () => {
  const neverColonizeResult = evaluate(
    {
      initialBaseProductivity: 100,
      colonizationPenalty: 5,
      baseCapacity: 1000,
      colonyCapacity: 500,
    },
    neverColonize,
    100,
  )

  const proportionalColonizeResult = evaluate(
    {
      initialBaseProductivity: 100,
      colonizationPenalty: 5,
      baseCapacity: 1000,
      colonyCapacity: 500,
    },
    porportionalColonize(1 / 2),
    100,
  )

  return (
    <Card class="w-2xl max-w-[90vw]" slot="preview">
      <CardHeader>
        <CardTitle>Model</CardTitle>
        <CardDescription>TODO</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <Chart
          data={[
            {
              label: 'Never Colonize',
              data: neverColonizeResult.map((state, index) => ({
                x: index,
                y: state.baseProductivity + state.colonyProductivity,
              })),
              borderWidth: 1,
            },
            {
              label: 'Proportional Colonize',
              data: proportionalColonizeResult.map((state, index) => ({
                x: index,
                y: state.baseProductivity + state.colonyProductivity,
              })),
              borderWidth: 1,
            },
          ]}
        />
      </CardContent>
      <CardFooter>
        <details class="leading-loose">
          <summary class="font-semibold">Parameters</summary>
          <section>
            <p>TODO</p>
          </section>
        </details>
      </CardFooter>
    </Card>
  )
}
