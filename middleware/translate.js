export default async function ({ isHMR, app, store}) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }
  // Get locale from params
  const locale = app.i18n.locale || defaultLocale
  await store.restored
  if (store.state.i18n.locale !== locale.code) {
    await app.i18n.setLocale(store.state.i18n.locale)
  }else{
    console.log('not redireected')
  }
}