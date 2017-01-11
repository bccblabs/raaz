'use strict'
import React, {Dimensions, StyleSheet, Platform} from 'react-native'
import F8Colors from '../common/F8Colors'
const window = Dimensions.get ('window')
export const btnColor = '#b8cdfb'
export const HEIGHT = window.height
export const WIDTH = window.width
export const General = StyleSheet.create ({
  headerStyle: {
    backgroundColor: 'white'
  },
  largeImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
    width: 240,
    resizeMode: 'contain',
  },
  topLevelScrollStyle: {
    height: window.height,
    width: window.width,
  },
  bottomButtonStyle: {
    backgroundColor: btnColor,
    alignSelf: 'center',
    flex: -1,
    width: window.width,
  },
  tabBarStyle: {
      backgroundColor: 'white',
      opacity        : 1
  },
  modalStyle: {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'white', 
    opacity: 0.9,
    flex: 1
  }
})

export const Header = StyleSheet.create ({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 12,
  },
  clear: {
    marginHorizontal: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 9,
    paddingVertical: 8,
    fontWeight: '500',
    color: 'black',
    letterSpacing: 0.3,
  }

})

export const Specs = StyleSheet.create ({
  container: {
    flex: -1,
    margin: 4
  },
  item: {
    flexDirection: 'column',
  },
  subtitle: {
    flex: -1,
    fontSize: 10,
    color: 'black',
    margin: 4
  },
  subtitle1: {
    flex: -1,
    fontSize: 10,
    color: 'black',
    fontWeight: '700',
    marginHorizontal: 4 ,
  },
  subtitle2: {
    flex: -1,
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginHorizontal: 4 ,
  },
  data: {
    flex: 1,
    flexDirection: 'row'
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 10,
  }
})

export const Titles = StyleSheet.create ({
  buildSectionTitle: {
    padding: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 1,
  },
  filterSectionTitle: {
    margin: 16,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 1,
  },
  buildTitle: {
    padding: 16,
    color: 'black',
    justifyContent: 'flex-start'
  },
})

export const ListingStyles = StyleSheet.create ({
  priceLargeTitle: {
    fontSize: 12,
    fontWeight: '900',
    padding: 8,
    color: 'black',
  },
  listingSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
})

export const PartStyles = StyleSheet.create ({
  partsScrollStyle: {
    height: 150,
    margin: 16,
  },
  partContainer: {
    height: 150,
    width: 150,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  partImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain'
  },
  partTitle: {
    padding: 8,
    flex: 1,
    color: 'black',
    fontSize: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontWeight: '700',
  },
  rating: {
    flex: -1,
    position: 'absolute',
    bottom: 8,
    left: 6,
    color: 'black',
    fontSize: 10,
    backgroundColor: 'white',
    opacity: 1,
    fontWeight: '800',
  },
  partSectionTitle: {
    margin: 10,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 1,
  }
})

export const Styles = StyleSheet.create ({
  loginButton: {
    backgroundColor: 'white',
  },
  mapStyle: {
    alignSelf: 'center',
    marginTop: 16,
    height: 350,
    width:  350,
  },
  largeImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
    width: 240,
    resizeMode: 'contain',
  }
})

export const ButtonStyles = StyleSheet.create ({
})

export const GraphColorsArray = [
  {backgroundColor: '#4D98E4'},
  {backgroundColor: '#59838B'},
  {backgroundColor: '#418E50'},
  {backgroundColor: '#7B7FEC'},
]

export const FilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8
  },
  optionsContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  multipleChoiceText: {
    padding: 14,
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 14,
    letterSpacing: 0.7,
  }
})
export const SliderStyles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: window.width,
    resizeMode: 'cover'
  }
})

export const FilterCardStyles = StyleSheet.create ({
  cardStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleTextStyle: {
    flex: 1,
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
})

export const NewPostStyles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeBlockInput: {
    flex: 1,
    fontSize: 20,
    marginTop:16,
    height: 100,
    // backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 2,
    padding: 8
  },
  singleLineBlockInput: {
    flex: -1,
    height: 30,
    marginHorizontal: 16,
    backgroundColor: '#f8f8f8',
    fontSize: 14,
  },
  commentInput: {
    flex: -1,
    paddingHorizontal: 8,
    width: window.width-80,
    height: window.height/20,
    fontSize: 12,
    fontWeight: '800',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  postCommentBtn: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#b8cdfb',
    alignSelf: 'center',
    flex: 0,
    height: 50,
    width: window.width,
  },
  headerStyle: {
    backgroundColor: 'black'
  },
  bottomBar: {
    backgroundColor: 'transparent',
    width: window.width,
  },
  divTitleStyle: {
    padding: 10,
    fontWeight: 'bold',
    color: 'gray',
    alignSelf: 'flex-start',
    fontSize: 12,
  },
  bottomButtonStyle: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 0,
    height: 50,
    width: window.width,
  },
  topButtonStyle: {
    alignSelf: 'center',
    flex: 1,
    height: 50,
  }
})

export const EmptyViewStyles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
    color: 'black',
  },

})

export const PostStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 8,
    borderBottomColor: 'black', 
  },
  imageContainer: {
    height: window.height/2,
    width: window.width,
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    flex: 1,
  },
  tags: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  tagsContainer: {
    backgroundColor: 'transparent', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 8
  },
  tag: {
    color: 'black',
    fontWeight: '300',
    fontSize: 12,
    paddingHorizontal: 4,
  },
  created: {
    fontSize: 10,
    paddingVertical: 8,
    color: 'black',
    letterSpacing: 0.3,
  },
  authorName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  userPhotoStyle: {
    height: 45,
    width: 45,
    resizeMode: 'cover'
  },
  manufacturerPhoto: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    resizeMode: 'cover' 
  },
  largeUserPhoto: {
    height: 76,
    width: 76,
    borderRadius: 38,
    resizeMode: 'cover',
  },

  primaryImage: {
    width: window.width,
    height: window.width,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  secondaryImage: {
    margin: 8,
    flex: 1,
    resizeMode: 'cover',
    height: window.height/2
  },
  manufacturerLogo: {
    flex: 1,
    height: 40,
    width: 80,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
  manufacturerContainer: {
    flex: 1,
    marginVertical: 4,
  },
  postsHorizontal: {
    width: window.width,
    height: window.height/3,
  },
  secondaryTitle: {
    flex: 1,
    position: 'absolute',
    bottom:4,
    left: 4,
    width: window.width/4,
    fontSize: 16,
    fontWeight: '700',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },

  scrollTitleContainer: {
    marginVertical: 8,
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  primaryTitle: {
    flex: -1,
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'white',
    padding: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  text: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 8,
    flex: -1,
    margin: 8, 
    padding: 16,
    fontWeight: 'bold'
  }

})
export const CarmeraStyles = StyleSheet.create ({
  text: {
    fontSize: 11,
    color: 'white',
    letterSpacing: 1,
    alignSelf: 'center',
    padding: 16
  },
  wrapper: {
    flex: -1,
    width: window.width,
    height: window.height/15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export const DetailStyles = StyleSheet.create ({
    infoContainer: {
      flex: -1,
      position: 'absolute',
      bottom: 50,
      left: 2,
      marginRight: 16,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    userPhotoStyle: {
      height: 60,
      width: 60, 
      resizeMode: 'cover',
      marginVertical: 8,
    },
    primaryTitle: {
      flex: -1,
      fontSize: 24,
      fontWeight: '700',
      padding: 8,
      backgroundColor: 'white',
      paddingHorizontal: 12,
    },
    bottomButton: {
      borderWidth: 2,
      borderColor: 'white',
    },
    VRImageHolder : {
      width: window.width,
      height: HEIGHT,
      resizeMode: 'cover'
    },
    userInfoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    userActionButton: {
      margin: 4, 
      borderRadius: 10, 
      height: 30,
    },
    userButtonContainer: {
      position: 'absolute',
      right: 8,
      bottom: 8,
      width: window.width/3
    },
    partTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 8,
    },
    lightTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      backgroundColor: 'transparent',
      padding: 4,
      borderRadius: 4
    },
    manufacturer: {
      position: 'absolute',
      bottom: 8,
      right: 8,
    },
    scrollImage: {
      width: 150,
      height: 150,
      resizeMode: 'cover',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      flex: -1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})
