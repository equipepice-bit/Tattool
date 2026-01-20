import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../theme/colors';

export const artistProfileViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerGradient: {
    height: 250,
    width: '100%',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  backButtonContainer: {
    paddingTop: 50,
    paddingLeft: 20,
  },

  profileContent: {
    marginTop: -80,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 60,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#CBB8EE',
    overflow: 'hidden',
    backgroundColor: '#EEE',
    marginBottom: 15,
  },

  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: -40,
    marginBottom: 20,
  },

  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  artistName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D1010',
    fontFamily: 'serif',
  },

  handle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25,
  },

  stylesLabel: {
    color: '#8B0000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  stylesList: {
    color: '#333',
    fontSize: 14,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 15,
  },

  horizontalScroll: {
    marginBottom: 30,
    paddingLeft: 5,
  },

  /* AVALIAÇÕES */
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },

  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#D1C4E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  reviewContent: {
    flex: 1,
  },

  reviewerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },

  stars: {
    flexDirection: 'row',
  },

  reviewDate: {
    fontSize: 12,
    color: '#999',
  },

  reviewText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },

  floatingButtons: {
  position: 'absolute',
  bottom: 30,
  right: 20,
  alignItems: 'flex-end',
},
floatingButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  marginBottom: 15,
},
flashButton: {
  backgroundColor: '#8B0000',
},
postButton: {
  backgroundColor: '#5D1010',
},
});
