import type { Chart, ChartOptions, DataItem } from 'billboard.js'
import { useThemeColors } from '/src/composable/useThemeColors'
import { donut } from 'billboard.js'

export function useDonutSimple() {
  const themeColors = useThemeColors()
  const options = ref<ChartOptions>({
    data: {
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      colors: {
        data1: themeColors.accent,
        data2: themeColors.primary,
        data3: themeColors.orange,
        data4: themeColors.purple,
        setosa: themeColors.orange,
        versicolor: themeColors.purple,
        virginica: themeColors.success,
      },
      type: donut(),
      onclick(this: Chart, d: DataItem, element: SVGAElement) {
        console.log('[donutSimple] onclick', d, element)
      },
      onover(this: Chart, d: DataItem, element?: SVGAElement) {
        console.log('[donutSimple] onover', d, element)
      },
      onout(this: Chart, d: DataItem, element?: SVGAElement) {
        console.log('[donutSimple] onout', d, element)
      },
    },
    donut: {
      title: 'Inner Title',
    },
    size: {
      height: 280,
    },
    padding: {
      bottom: 20,
    },
    title: {
      text: 'Donut Chart',
      position: 'left',
      padding: {
        bottom: 20,
        right: 20,
        top: 0,
        left: 20,
      },
    },
    legend: {
      position: 'inset',
    },
  })

  const onReady = (billboard: Chart) => {
    setTimeout(() => {
      billboard.load({
        columns: [
          [
            'setosa',
            0.2,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.3,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.1,
            0.1,
            0.2,
            0.4,
            0.4,
            0.3,
            0.3,
            0.3,
            0.2,
            0.4,
            0.2,
            0.5,
            0.2,
            0.2,
            0.4,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.1,
            0.2,
            0.2,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.3,
            0.3,
            0.2,
            0.6,
            0.4,
            0.3,
            0.2,
            0.2,
            0.2,
            0.2,
          ],
          [
            'versicolor',
            1.4,
            1.5,
            1.5,
            1.3,
            1.5,
            1.3,
            1.6,
            1.0,
            1.3,
            1.4,
            1.0,
            1.5,
            1.0,
            1.4,
            1.3,
            1.4,
            1.5,
            1.0,
            1.5,
            1.1,
            1.8,
            1.3,
            1.5,
            1.2,
            1.3,
            1.4,
            1.4,
            1.7,
            1.5,
            1.0,
            1.1,
            1.0,
            1.2,
            1.6,
            1.5,
            1.6,
            1.5,
            1.3,
            1.3,
            1.3,
            1.2,
            1.4,
            1.2,
            1.0,
            1.3,
            1.2,
            1.3,
            1.3,
            1.1,
            1.3,
          ],
          [
            'virginica',
            2.5,
            1.9,
            2.1,
            1.8,
            2.2,
            2.1,
            1.7,
            1.8,
            1.8,
            2.5,
            2.0,
            1.9,
            2.1,
            2.0,
            2.4,
            2.3,
            1.8,
            2.2,
            2.3,
            1.5,
            2.3,
            2.0,
            2.0,
            1.8,
            2.1,
            1.8,
            1.8,
            1.8,
            2.1,
            1.6,
            1.9,
            2.0,
            2.2,
            1.5,
            1.4,
            2.3,
            2.4,
            1.8,
            1.8,
            2.1,
            2.4,
            2.3,
            1.9,
            2.3,
            2.5,
            2.3,
            1.9,
            2.0,
            2.3,
            1.8,
          ],
        ],
      })
    }, 2000)

    setTimeout(() => {
      billboard.unload({ ids: 'data1' })
      billboard.unload({ ids: 'data2' })
    }, 6500)
  }

  return {
    options,
    onReady,
  }
}
