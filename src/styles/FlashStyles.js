import { StyleSheet } from 'react-native';

export const flashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B0000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  flashBanner: {
    backgroundColor: '#5D2510',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  idCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  idText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  flashTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageCardContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  imageWrapper: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#8B0000',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  flashImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  infoSection: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 15,
  },
  detailsRight: {
    alignItems: 'flex-end',
  },
  tag: {
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginBottom: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  tagText: {
    color: '#4A148C',
    fontSize: 14,
    fontWeight: '600',
  },
  priceBadge: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A148C',
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingBottom: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  agendarBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#0056b3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  agendarBtnText: {
    color: '#0056b3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});