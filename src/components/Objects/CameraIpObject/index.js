import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Platform, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

import dgram from 'react-native-udp';
import TcpSocket from 'react-native-tcp-socket';
import {Buffer} from 'buffer';


const socket = dgram.createSocket('udp4');
const CHUNK_LENGTH_UDP = 1460;

const arr = ['https://tse4.mm.bing.net/th?id=OIP.zSZ8qBtNNVXrZYDRrB5JkgHaD4&pid=Api&P=0', 'https://tse4.mm.bing.net/th?id=OIP.4spPptC2Dg-1nvTElCpp2QHaLT&pid=Api&P=0'];
const options = {
    port: 9090,
    host: '192.168.1.20',
    //localAddress: '192.168.1.100',
    //reuseAddress: true,
    //localPort: 1234,
    //interface: "wifi",
};




const CameraIpObject = () => {
    const imageNativeProp = Platform.OS === 'ios' ? 'source' : 'src';
    const imgRef = useRef();
    const imageBuffer = useRef(Buffer.alloc(0));
    const bool = useRef(false);

    const i = useRef(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // socket.bind(12345);
    
        // socket.once('listening', function() {
        //     socket.send('laduchai---2', undefined, undefined, 12345, "192.168.1.15", function(err) {
        //       if (err) throw err;
          
        //     //   console.log('Message sent!');
        //     })
            
        // })

        // socket.on('message', async (msg, rinfo) => {    
        //     const data = msg.toJSON().data;
        //     if ((msg.length===CHUNK_LENGTH_UDP) && (data[0]===255) && (data[1]===216)) {
        //         imageBuffer.current = Buffer.alloc(0);
        //         bool.current = true;
        //     } 

        //     const totalLength = imageBuffer.current.length + msg.length;
        //     imageBuffer.current = Buffer.concat([imageBuffer.current, msg], totalLength);
        //     let imageBase64 = `data:image/jpeg;base64,${imageBuffer.current.toString('base64')}`;

        //     if ((msg.length!==CHUNK_LENGTH_UDP) && (data[msg.length-2]===255) && (data[msg.length-1]===217)) { 
        //         if(bool.current) {
                    
        //         }
        //         realtimeImage(imageBase64);
        //     }             
        // });    

        // const server = TcpSocket.createServer(function(socket) {
        //     console.log('start server')

        //     socket.on('data', (data) => {
        //       socket.write('Echo server ' + data);
        //     });
        //     socket.on('error', (error) => {
        //       console.log('An error ocurred with client socket', error);
        //     });
        // }).listen({ port: 1234, host: '192.168.1.100', reuseAddress: true }, () => {
        //     console.log('tcp-puncing success');
        //     console.log('serverAddress: ', server.address());
        // });
        // server.on('error', (error) => {
        //     console.log('An error ocurred with the server', error);
        // });

        // return() => {
        //     socket.close();
        // };
    }, [])

    const handle_tcp = () => {
        const client = TcpSocket.createConnection(options, () => {
            // Write on the socket
            console.log('tcp client send data', client.address())
            client.write('Hello server! .................');
        });
        client.on('data', function(data) {
            console.log('message was received: ', data.toString());
        });
        client.on('error', function(error) {
            console.log('tcp failed:', error);
        });
    };

    const realtimeImage = (imageBase64) => {
        // console.log(imageBuffer.current)
        // console.log(imageBase64)
        if (imageBuffer.current.length > 0) {
            imgRef.current.setNativeProps({
                [imageNativeProp] : [{uri: imageBase64}]
            });
        }
        

        if(i.current < 2) {
            i.current = i.current + 1;
        } else {
            i.current = 0;
        }
        
        bool.current = false;
    };

    return (
        <View style={styles.page}>
            <Text>CameraIpObject</Text>
            <Image ref={imgRef} style={styles.image} fadeDuration={0}/>
            <Text>{counter}</Text>
            <TouchableOpacity onPress={() => setCounter(x => x + 1)}><Text>BUTTON</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handle_tcp()}><Text>BUTTON</Text></TouchableOpacity>
        </View>
    );
};

export default CameraIpObject;