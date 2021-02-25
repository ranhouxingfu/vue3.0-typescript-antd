import NProgress from 'nprogress'

export default (name: string) => {
  return new Promise((resolve: (mod: object) => any) => {
    NProgress.start()
    import(/* webpackChunkName: "[request]" */ `../views/${name}.vue`).then((mod: object) => {
      resolve(mod)
    }).finally(() => {
      NProgress.done()
    })
  })
}
