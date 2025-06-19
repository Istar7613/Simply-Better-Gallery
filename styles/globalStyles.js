import { StyleSheet, Dimensions } from 'react-native';

const IMAGE_SIZE = (Dimensions.get('window').width / 2 - 24) / 2;
const wwidth = Dimensions.get('window').width
const wheight = Dimensions.get('window').height

//Felt cute, might rewrite later :3
export default StyleSheet.create({
    simpleBackground: {
        backgroundColor: 'black',
        felx: 1,
        paddingBottom: 80,
        minWidth: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height,
    },
    pageTitle: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },
    titleCon:{
        height: wheight * 0.12,
        justifyContent: 'center',
        //alignItems: 'center',
    },
    mainImage: {
        width: wwidth / 3 - 6,
        height: wwidth / 3 - 6,
        margin: 3,
        borderRadius: 6,
        backgroundColor: '#eee',
    },

    ImageViewContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    ImageView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    albumTitle: {
        fontSize: 16,
        fontWeight: '600',
        padding: 8,
        textAlign: 'center',
        color: 'white',
        width: IMAGE_SIZE * 2,
    },
    imageThumb: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        backgroundColor: '#ccc',
    },
    albumContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 14,
        backgroundColor: 'grey',
        overflow: 'hidden',
        elevation: 2,
        alignItems: 'center',
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: IMAGE_SIZE * 2,
        height: IMAGE_SIZE * 2,
        backgroundColor: '#ddd',
    },

    buttonText: {
        fontSize: 45,
        color: 'white',
        position: 'absolute',
    },
    buttonContainer: {
        position: 'absolute',
        top: wheight * 0.06,
        left: 20,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 18,
        padding: 3,
        justifyContent: 'center',
    }
});
