import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Pressable, Modal,Text, TextInput, View,TouchableOpacity,Alert, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import { useState } from 'react';
import styles from './style';

export default function App() {
  const [valorproduto, setValorProduto] = useState("")
  const [taxa, setTaxa] = useState("")
  const [tempo, setTempo] = useState("")
  const [valorprodutofuturo, setValorProdutoFuturo] = useState("")
  const [taxafuturo, setTaxaFuturo] = useState("")
  const [parcelas, setParcelas] = useState("")
  const [PrimeiraParcela, setPrimeiraParcela] = useState("")
  const [textofinal,setResultado] = useState('')
  const [desconto,setdesconto] = useState('')
  const [modalActive,setmodalActive] = useState(false)
  const handerCalcularFuturo = () =>{

    let resultado = 0
    const primeira = parseInt(PrimeiraParcela)
    const parcela = parseInt(parcelas)

    for (let index =primeira; index <= parcela-1; index++) {
      resultado = resultado + (parseFloat(valorprodutofuturo)/parcela) / (1 + (parseFloat(taxafuturo)/100))**index 
    }
      resultado = parcela * resultado
      setResultado(`O valor e ${resultado.toFixed(2)}`)
      setmodalActive(true)
  };


  const handerCalcular = () => {
    let resultado = 0
    const VPD = parseFloat(valorproduto) -  (parseFloat(valorproduto) * (parseFloat(desconto)/100))
    const prestacao = parseFloat(valorproduto) / parseFloat(parcelas)
    const primeira = parseInt(PrimeiraParcela)

    for (let index = 1; index <= parseInt(parcelas); index++) {
      resultado = resultado + (prestacao/(1 + (parseFloat(taxa)/100))**parseInt(primeira))
      primeira = parseInt(primeira) + index 
    }

    if (VPD < resultado) {
      setResultado(`Compre o produto a vista: ${VPD.toFixed(2)}`)
      setmodalActive(true)
    }else {
      setResultado(`Compre o produto parcelado: ${resultado.toFixed(2)}`)
      setmodalActive(true)
    }
    
  };
  return (
    <ScrollView>
    <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}>

    <View style={styles.container}>
      <Modal
      animationType='slide'
      transparent = {true}
      visible = {modalActive}
      onRequestClose = {() => setmodalActive=(false)}>
        <View style = {styles.outerView}>
          <View style = {styles.modalView}>
            <Text style = {styles.textoresposta}>{textofinal}</Text>
            <Pressable onPress={() => setmodalActive(false)}>
              <Text style = {styles.fechar}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View ><Text style = {styles.subtitle}>Deslocando para o futuro</Text></View>
      
      <View ><Text style = {styles.texto}>Valor do produto - R$</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setValorProduto(text.replace(/\D/g,""))}></TextInput>

      <View ><Text style = {styles.texto}>Desconto a vista</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setdesconto(text.replace(/\D/g,""))}></TextInput>
      <Text style = {styles.texto}>Taxa -(am%)</Text>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setTaxa(text.replace(/\D/g,""))}></TextInput>
      <View><Text style = {styles.texto}>Número de prestações(m)</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
    
      onChangeText={(text) =>setTempo(text.replace(/\D/g,""))}></TextInput>

<View><Text style = {styles.texto}>Primeira pagamento</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
    
      onChangeText={(text) =>setPrimeiraParcela(text.replace(/\D/g,""))}></TextInput>

      <View style = {styles.divbotao}><TouchableOpacity 
      onPress = {handerCalcular}
     
      style = {styles.botao}>
        <Text style = {styles.textocomum}>Calcular</Text>
      </TouchableOpacity></View>
      <Text style = {styles.subtitle}>Deslocando para o presente</Text>
      <View><Text style = {styles.texto}>Valor do Produto</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setValorProdutoFuturo(text.replace(/\D/g,""))}></TextInput>
      <View><Text style = {styles.texto}>Taxa</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setTaxaFuturo(text.replace(/\D/g,""))}></TextInput>
      <View><Text style = {styles.texto}>Primeira Parcela</Text></View>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setPrimeiraParcela(text.replace(/\D/g,""))}></TextInput>
      <Text style = {styles.texto} >Parcelas</Text>
      <TextInput
      keyboardType='number-pad'
      style = {styles.inputdados}
      onChangeText={(text) =>setParcelas(text.replace(/\D/g,""))}></TextInput>
      <View style = {styles.divbotao}><TouchableOpacity
        onPress = {handerCalcularFuturo}
        style = {styles.botao2}
        >

        <View ><Text style = {styles.textocomum}>Calcular</Text></View>
      </TouchableOpacity></View>
      <StatusBar style="auto" />
    </View></TouchableWithoutFeedback>
    </ScrollView>
  );
}


