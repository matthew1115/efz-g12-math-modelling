interface Constants {
  initialBaseProductivity: number
  colonizationPenalty: number
  baseCapacity: number
  colonyCapacity: number
}

interface CurrentState {
  baseProductivity: number
  colonyProductivity: number
}

interface Decision {
  baseInvestment: number
  colonyInvestment: number
}

type Strategy = (state: CurrentState, constants: Constants) => Decision

const neverColonize: Strategy = (state, constants) => {
  return {
    baseInvestment: state.baseProductivity,
    colonyInvestment: 0,
  }
}

const porportionalColonize =
  (k: number): Strategy =>
  (state, constants) => {
    const colonyInvestment = state.baseProductivity * k
    const baseInvestment = state.baseProductivity - colonyInvestment
    return {
      baseInvestment,
      colonyInvestment,
    }
  }

const evaluate = (
  constants: Constants,
  strategy: Strategy,
  generation: number,
): number => {
  const state: CurrentState = {
    baseProductivity: constants.initialBaseProductivity,
    colonyProductivity: 0,
  }
  for (
    let currentGeneration = 0;
    currentGeneration < generation;
    currentGeneration++
  ) {
    const generationGrowth = 2 ** (1 / 12) - 1

    const decision = strategy(state, constants)
    // logistic growth
    state.baseProductivity +=
      generationGrowth *
      decision.baseInvestment *
      (1 - state.baseProductivity / constants.baseCapacity)
    state.colonyProductivity +=
      generationGrowth *
      (decision.colonyInvestment / constants.colonizationPenalty +
        state.colonyProductivity) *
      (1 - state.colonyProductivity / constants.colonyCapacity)
  }
  return state.baseProductivity + state.colonyProductivity
}

const result1 = evaluate(
  {
    initialBaseProductivity: 100,
    colonizationPenalty: 2,
    baseCapacity: 1000,
    colonyCapacity: 500,
  },
  neverColonize,
  120,
)

console.info(`Total productivity after 120 generations: ${result1}`)

const result2 = evaluate(
  {
    initialBaseProductivity: 100,
    colonizationPenalty: 2,
    baseCapacity: 1000,
    colonyCapacity: 500,
  },
  porportionalColonize(0.5),
  120,
)

console.info(`Total productivity after 120 generations: ${result2}`)
