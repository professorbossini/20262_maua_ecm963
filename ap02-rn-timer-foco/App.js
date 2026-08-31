import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context'

export default function App() {
  const [segundos, setSegundos] = useState(25 * 60)
  const [rodando, setRodando] = useState(false)
  useEffect(() => {
    if(!rodando)return
    const id = setInterval(() => {
      setSegundos(s => s - 1)
    }, 1000)
    return () => clearInterval(id) //funcção de limpeza
  }, [rodando])
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.tempo}>
          {String(minutos).padStart(2, '0')}:{String(segs).padStart(2, '0')}
        </Text>
        <Pressable 
          style={styles.botao}
          onPress={() => setRodando(r => !r)}>
          <Text
            style={styles.textoBotao}>{rodando ? 'Pausar' : 'Iniciar'}</Text>
        </Pressable>
        <Pressable 
          style={styles.botaoSecundario}
          onPress={() => {setRodando(false); setSegundos(25 * 60)}}>
          <Text>Reiniciar</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempo: {
    fontSize: 72,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40
  },
  botao: {
    backgroundColor: '#087ea4',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    marginBottom: 14
  },
  botaoSecundario: {
    backgroundColor: '#334155',
    paddingVertical: 14, paddingHorizontal: 48,
    borderRadius: 10
  },
  textoBotao: {color: '#FFFFFF', fontSize: 18, fontWeight: '600'}
});
