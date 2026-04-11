import { createUniqueId, onMount } from 'solid-js'
import ChartJS, { type ChartDataset } from 'chart.js/auto'

export const Chart = (props: { data: ChartDataset[] }) => {
  const id = createUniqueId()

  onMount(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    new ChartJS(canvas, {
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
  })

  return (
    <div>
      <canvas id={id}></canvas>
    </div>
  )
}
