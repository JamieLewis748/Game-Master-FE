import React from 'react';
import { View, Image } from 'react-native';

const getImageByType = (imageType) => {
    switch (imageType) {
        case '00000020f61bb4362eee2c03':
            return require('../../CollectionAssets/flame-boy.webp');
        case '00000020f61bb4362eee2c01':
            return require('../../CollectionAssets/Biteme.png');
        case '00000020f61bb4362eee2c02':
            return require('../../CollectionAssets/water.png');
        case '00000020f61bb4362eee2c04':
            return require('../../CollectionAssets/wind-lineart.webp');
        default:
            return null;
    }
};

const MonsterImageSelection = ({ collectionId }) => {

    const imageType = collectionId;

    return (
        <View>
            <Image source={getImageByType(imageType)} style={{ width: 50, height: 50 }} />
        </View>
    );
};

export default MonsterImageSelection;