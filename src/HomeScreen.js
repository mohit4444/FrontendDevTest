import { Linking, Image, TouchableOpacity, ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import { useQuery } from "@apollo/client";
import { EVENT_QUERY } from "./gql/Query";
import { WebView } from 'react-native-webview';
import moment from 'moment';
import React, { useState } from 'react';
import Modal from 'react-native-modal';

export default function HomeScreen() {

    const { error, data, loading } = useQuery(EVENT_QUERY); //execute query

    const [isModalVisible, setModalVisible] = useState(false);

    const [webviewData, setwebviewData] = useState({});
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const url = 'https://www.google.com/'
    const INJECTED_JAVASCRIPT = `(function() {
        var div = document.createElement("div");
        div.innerHTML = '<br><br><br><br><br><center><button><a href=`+ webviewData.url + `><h1>More Details/Booking</h1></a></button><center><br><br><br><br>';
        document.body.appendChild(div);
    })();`;

    if (data) {
        return (
            <>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1, marginTop: 15 }}>
                        <Button color='red' title="X" onPress={() => toggleModal()} />
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: webviewData.descriptionHTML }}
                            injectedJavaScript={INJECTED_JAVASCRIPT}

                        />
                    </View>
                </Modal>
                <ScrollView>
                    {data.listEvents.items.map((event, index) => (
                        <TouchableOpacity onPress={() => { setwebviewData(event); toggleModal() }}>
                            <View style={styles.event}>
                                <Text style={styles.title}>{event.title}</Text>
                                <Image
                                    style={{ width: '100%', height: '50%', marginBottom: 5, marginTop: 5 }}
                                    source={{
                                        uri: `${event.logoUrl}`
                                    }}
                                />
                                <Text>Start Date: {moment(event.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                                <Text>End Date: {moment(event.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </>
        );
    }
    if (error) {
        console.log(error)
    }
}

const styles = StyleSheet.create({

    event: {
        marginTop: 24,
        paddingTop: 20,
        paddingLeft: 7,
        paddingRight: 7,
        backgroundColor: '#2baeba',
        color: 'white',
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 4
    }
});



