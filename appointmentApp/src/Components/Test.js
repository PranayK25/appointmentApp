import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

const Test = props => {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.screen}>
            <CheckBox />
            <View style={styles.checkbox}>
                <CheckBox
                    value={isChecked}
                    onValueChange={() => { setIsChecked(true) }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    checkbox:{
        borderColor: 'black',
        borderWidth: 1,
        padding: 20
    }
});

export default Test;