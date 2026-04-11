import { createEffect, createSignal, createUniqueId, onMount } from 'solid-js'
import ChartJS, { type ChartDataset } from 'chart.js/auto'

export const Chart = (props: { data: ChartDataset[] }) => {
  const id = createUniqueId()

  let [chart, setChart] = createSignal<ChartJS | null>(null)

  createEffect(() => {
    const c = chart()
    if( c) {
      c.data.datasets = props.data
      c.update()
    }
  })

  onMount(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    const c  = new ChartJS(canvas, {
      type: 'line',
      data: {
        datasets: props.data,
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hoverRadius: 4,
            hitRadius: 10,
          },
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Generation',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Net Productivity',
            },
          },
        },
      },
    })
    setChart(c)
  })

  return (
    <div>
      <canvas id={id}></canvas>
    </div>
  )
}
