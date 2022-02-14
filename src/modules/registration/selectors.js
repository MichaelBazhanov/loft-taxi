// import { createSelector } from 'reselect'


// export const getSeries = createSelector(
//   [(state) => state.series, (state) => state.isLoading], //следим за state.series и state.isLoading если их значение меняется то селектор выполняется если не меняется то отдается старое значение
//   (series, isLoading) =>
//     series.map(({ id, name, image: { original } }) => ({
//       id,
//       name,
//       image: original,
//     })), //отфильтровываем только нужные данные
// )
// export const getIsLoading = (state) => state.isLoading
// export const getError = (state) => state.error