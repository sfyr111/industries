export const Charts = resolve => {
  import('base/test/charts').then(module => {
    resolve(module)
  })
}

export const Exp = resolve => {
  import('base/test/exp').then(module => {
    resolve(module)
  })
}

export const Test = resolve => {
  import('base/test/test').then(module => {
    resolve(module)
  })
}

export const Home = resolve => {
  import('components/home/home').then(module => {
    resolve(module)
  })
}

export const Discovery = resolve => {
  import('components/discovery/discovery').then(module => {
    resolve(module)
  })
}

export const Analysis = resolve => {
  import('components/analysis/analysis').then(module => {
    resolve(module)
  })
}

export const Search = resolve => {
  import('components/search/search').then(module => {
    resolve(module)
  })
}

export const User = resolve => {
  import('components/user/user').then(module => {
    resolve(module)
  })
}

export const Dynamic = resolve => {
  import('components/dynamic/dynamic').then(module => {
    resolve(module)
  })
}

export const DynamicDetail = resolve => {
  import('components/dynamic-detail/dynamic-detail').then(module => {
    resolve(module)
  })
}

export const Favorites = resolve => {
  import('components/favorites/favorites').then(module => {
    resolve(module)
  })
}

export const Help = resolve => {
  import('components/help/help').then(module => {
    resolve(module)
  })
}

export const Personal = resolve => {
  import('components/personal/personal').then(module => {
    resolve(module)
  })
}

export const AnalysisOption = resolve => {
  import('components/analysis-option/analysis-option').then(module => {
    resolve(module)
  })
}

export const AnalysisDetail = resolve => {
  import('components/analysis-detail/analysis-detail').then(module => {
    resolve(module)
  })
}
