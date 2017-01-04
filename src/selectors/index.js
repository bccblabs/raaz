'use strict'
import {createSelector} from 'reselect'
import keys from 'lodash/keys'

/* specs selectors */
export const specDetailsEntitiesSelector = (state) => (state.entities.specDetails || {})
export const specDetailsPaginationSelector = (state, props) => (state.pagination.specDetailsPagination && state.pagination.specDetailsPagination[props.specId] || {})
export const specDetailsSelector = createSelector (
  [specDetailsEntitiesSelector, specDetailsPaginationSelector],
  (specDetails, specsPagination) => {
      let ids = specsPagination.ids?specsPagination.ids:[]
      return ids.map (id=>specDetails[id]).filter (elem=>elem)
  }
)

/* post selectors */
  export const postEntitiesSelector = (state) => (state.entities.posts || {})

  export const homePostPaginationSelector = (state) => (state.pagination.postsPagination && state.pagination.postsPagination['home'] || {})
  export const homePostSelector = createSelector (
    [postEntitiesSelector, homePostPaginationSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )

  export const postPaginationByBuildIdSelector = (state, props) => (state.pagination.postPaginationByBuildId && state.pagination.postPaginationByBuildId[props.buildId] || {})
  export const postByBuildIdSelector = createSelector (
    [postEntitiesSelector, postPaginationByBuildIdSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )

  export const postPaginationByUserIdSelector = (state, props) => (state.pagination.postPaginationByUserId && state.pagination.postPaginationByUserId[props.userId] || {})
  export const postByUserIdSelector = createSelector (
    [postEntitiesSelector, postPaginationByUserIdSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )

  export const postPaginationByPartIdSelector = (state, props) => (state.pagination.postPaginationByPartId && state.pagination.postPaginationByPartId[props.partId] || {})
  export const postByPartIdSelector = createSelector (
    [postEntitiesSelector, postPaginationByPartIdSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )
  
  export const postPaginationBySpecIdSelector = (state, props) => (state.pagination.postPaginationBySpecId && state.pagination.postPaginationBySpecId[props.specId] || {})
  export const postBySpecIdSelector = createSelector (
    [postEntitiesSelector, postPaginationBySpecIdSelector],
    (postEntities, postPagination) => {
      let ids = postPagination.ids?postPagination.ids:[]
      return ids.map (id=>postEntities[id]).filter (elem=>elem)
    }
  )

/* car selector entities */

export const makesSelector = (state) => (keys (state.entities.makes).sort())

/* cars by specs selector */

export const linkedBuilds = (state) => (state.newpost.linkedBuilds.toIndexedSeq().toArray())
export const linkedParts = (state) => (state.newbuild.buildParts.toIndexedSeq().toArray())
export const buildSpecs = (state) => (state.newbuild.buildSpecs.toJSON())
export const selectedMediaSelector = (state) => (state.newpost.media.toArray())

/* user selectors */
  export const isLikedByUser = (state) => {return true}
  export const profileSelector = (state) => (state.user && state.user.profileData.toJSON() || {})
  export const userIdSelector = (state) => (state.user && state.user.profileData && state.user.profileData.user_id || null)
  export const accessTokenSelector = (state, props) => (state.history && state.history.access_token || props.access_token || null)
  export const idTokenSelector = (state, props) => (state.history && state.history.id_token || props.id_token || null)
  export const refreshTokenSelector = (state, props) => (state.history && state.history.refresh_token || props.refresh_token || null)



  export const myBuildsSelector = (state) => {
    let userId = (state.user.profileData && state.user.profileData.user_id)?(state.user.profileData.user_id):null
    if (userId) return state.pagination.buildPaginationByUserId && state.pagination.buildPaginationByUserId[userId] || {}
    return {}
  }
  export const onStartSelector = (state) => {
    return state.user.onStart
  }

/* tags selectors */
  export const selectedTagsSelector = (state, props) => {
    return state.tuning.partTags
  }
  export const tagEntitiesSelector = (state, props) => (state.entities && state.entities.tags || {})
  export const relatedTagPaginationSelector = (state, props) => (state.pagination.relatedTagPagination && state.pagination.relatedTagPagination[props.tag] || {})
  export const relatedTagsSelector = createSelector (
    [tagEntitiesSelector, relatedTagPaginationSelector],
    (tagEntities, tagPagination) => {
      let ids = tagPagination.ids?tagPagination.ids:[]
      return ids.map (id=>tagEntities[id]).filter (elem=>elem)
    }
  )

/* categories */
  export const categoriesEntitiesSelector = (state, props) => (state.entities.categories || {})
  export const categoriesPaginationSelector = (state, props) => (state.pagination.categoriesPagination && state.pagination.categoriesPagination[props.filterId] || {})

  /* build categories */
  export const buildCategoriesSelector = (state) => (state.entities.categories && keys (state.entities.categories['car']))

  export const getCategoriesSelector = createSelector (
    [categoriesEntitiesSelector, categoriesPaginationSelector],
    (categoryEntities, categoryPagination) => {
      let ids = categoryPagination.ids?categoryPagination.ids:[]
      return ids.map (id=>categoryEntities[id])
    }
  )

  export const categoryTagsSelector = (state, props) => {
    let tags = state.entities.categories ? state.entities.categories[props.categoryName] : []
    return tags.options.map ((opt)=>opt.name)
  }

/* builds */
  export const buildsEntitiesSelector = (state) => (state.entities.builds || {})
  export const buildsPaginationSelector = (state) => (state.pagination.buildsPagination && state.pagination.buildsPagination['home'] || {})

  export const buildsSelector = createSelector (
    [buildsEntitiesSelector, buildsPaginationSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByPartIdSelector = (state, props) => (state.pagination.buildPaginationByPartId && state.pagination.buildPaginationByPartId[props.partId] || {})
  export const buildByPartIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByPartIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationBySpecIdSelector = (state, props) => (state.pagination.buildPaginationBySpecId && state.pagination.buildPaginationBySpecId[props.specId] || {})
  export const buildBySpecIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationBySpecIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByTagSelector = (state, props) => (state.pagination.buildPaginationByTag && state.pagination.buildPaginationByTag[props.tag] || {})
  export const buildByTagSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByTagSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByUserIdSelector = (state, props) => (state.pagination.buildPaginationByUserId && state.pagination.buildPaginationByUserId[props.userId] || {})
  export const buildByUserIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByUserIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const buildPaginationByManufacturerIdSelector = (state, props) => (state.pagination.buildPaginationByManufacturerId && state.pagination.buildPaginationByManufacturerId[props.manufacturerId] || {})
  export const buildByManufacturerIdSelector = createSelector (
    [buildsEntitiesSelector, buildPaginationByManufacturerIdSelector],
    (buildsEntities, buildsPagination) => {
      let ids = buildsPagination.ids?buildsPagination.ids:[]
      return ids.map (id=>buildsEntities[id]).filter (elem=>elem)
    }
  )

  export const newBuildSelector = (state) => (state.newbuild.toJS())

/* history selector */
  export const savedSpecsSelector = (state) => (state.history.specs.toIndexedSeq().toArray())
  export const savedPartsSelector = (state) => (state.history.parts.toIndexedSeq().toArray())

  export const isPartSavedSelector = (state, props) => {
    let {part} = props
      , {partId} = part
    return state.history.parts.has (partId)
  }

/* parts selector */
  export const partsEntitiesSelector = (state, props) => (state.entities.parts || {})

  export const partsPaginationSelector = (state, props) => (state.pagination.partsPagination && state.pagination.partsPagination[props.specId] || {})
  export const partsBySpecIdSelector = createSelector (
    [partsEntitiesSelector, partsPaginationSelector],
    (partsEntities, partsPagination) => {
      let ids = partsPagination.ids?partsPagination.ids:[]
      return ids.map (id=>partsEntities[id]).filter (elem=>elem)
    }
  )

  export const partsByManufacturerPaginationSelector = (state, props) => (state.pagination.partsPaginationByManufacturer && state.pagination.partsPaginationByManufacturer[props.manufacturerId] || {})
  export const partsByManufacturerSelector = createSelector (
    [partsEntitiesSelector, partsByManufacturerPaginationSelector],
    (partsEntities, partsPagination) => {
      let ids = partsPagination.ids ? partsPagination.ids: []
      return ids.map (id=>partsEntities[id]).filter (elem=>elem)
    }
  )

  export const partsByBuildIdPaginationSelector = (state, props) => (state.pagination.partsPaginationByBuildId && state.pagination.partsPaginationByBuildId[props.buildId] || {})
  export const partsByBuildIdSelector = createSelector (
    [partsEntitiesSelector, partsByBuildIdPaginationSelector],
    (partsEntities, partsPagination) => {
      let ids = partsPagination.ids?partsPagination.ids:[]
      return ids.map (id=>partsEntities[id]).filter (elem=>elem)
    }
  )

  export const partsByTagPaginationSelector = (state, props) => (state.pagination.partsPaginationByTag && state.pagination.partsPaginationByTag[props.tag] || {})
  export const partsByTagSelector = createSelector (
    [partsEntitiesSelector, partsByTagPaginationSelector],
    (partsEntities, partsPagination) => {
      let ids = partsPagination.ids?partsPagination.ids:[]
      return ids.map (id=>partsEntities[id]).filter (elem=>elem)
    }
  )


  export const specsByManufacturerEntities = (state, props) => (state.entities.specOptions)
  export const specsPaginationByManufacturerIdSelector = (state, props) => (state.pagination.specsPaginationByManufacturerId && state.pagination.specsPaginationByManufacturerId[props.manufacturerId] || {})
  export const specsByManufacturerIdSelector = createSelector (
    [specsByManufacturerEntities, specsPaginationByManufacturerIdSelector],
    (specsEntities, specsPagination) => {
      let ids = specsPagination.ids?specsPagination.ids:[]
      return ids.map (id=>specsEntities[id]).filter (elem=>elem)
    }
  )


  export const isFollowing = (state, props) => {
    return false
  }

  export const tagsEntitiesSelector = (state, props) => (state, props) => (state.entities.tags || {})
  export const tagsPaginationBySpecIdSelector = (state, props) => (state.pagination.tagsPaginationBySpecId && state.pagination.tagsPaginationBySpecId[props.specId] || {})
  export const tagsBySpecIdSelector = createSelector (
      [tagsEntitiesSelector, tagsPaginationBySpecIdSelector],
      (tagsEntities, tagsPagination) => {
        return tagsPagination.ids?tagsPagination.ids:[]
      }
    )


  export const manufacturersEntitiesSelector = (state, props) => (state.entities.manufacturers || {})
  export const manufacturersPaginationBySpecIdSelector = (state, props) => (state.pagination.manufacturerPaginationBySpecId && state.pagination.manufacturerPaginationBySpecId[props.specId] || {})
  export const manufacturersBySpecIdSelector = createSelector (
    [manufacturersEntitiesSelector, manufacturersPaginationBySpecIdSelector],

    (manufacturersEntities, manufacturersPagination) => {

      let ids = manufacturersPagination.ids?manufacturersPagination.ids:[]

      console.log (ids, manufacturersEntities)

      return ids.map (id=>manufacturersEntities[id]).filter (elem=>elem)
    }
  )


  export const manufacturerPaginationSelector = (state, props) => (state.pagination.manufacturerPagination && state.pagination.manufacturerPagination['all'] || {})
  export const manufacturerSelector = createSelector (
    [manufacturersEntitiesSelector, manufacturerPaginationSelector],

    (manufacturersEntities, manufacturersPagination) => {

      let ids = manufacturersPagination.ids?manufacturersPagination.ids:[]

      console.log (ids, manufacturersEntities)

      return ids.map (id=>manufacturersEntities[id]).filter (elem=>elem)
    }
  )

  export const uploadProgressSelector = (state) => {
    return {
      isUploading: state.newpost.isUploading,
      uploadProgress: state.newpost.uploadProgress,
      hasError: state.newpost.hasError
    }
  }
